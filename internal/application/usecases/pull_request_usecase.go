package usecases

import (
	"context"
	"go-project/internal/domain/entities"
	"go-project/internal/domain/errors"
	"go-project/internal/domain/repositories"
	"time"
)

type PullRequestUseCase struct {
	prRepo   repositories.PullRequestRepository
	teamRepo repositories.TeamRepository
	userRepo repositories.UserRepository
}

func NewPullRequestUseCase(
	prRepo repositories.PullRequestRepository,
	teamRepo repositories.TeamRepository,
	userRepo repositories.UserRepository,
) *PullRequestUseCase {
	return &PullRequestUseCase{
		prRepo:   prRepo,
		teamRepo: teamRepo,
		userRepo: userRepo,
	}
}

func (uc *PullRequestUseCase) CreatePR(ctx context.Context, authorID, prID, prName string) (*entities.PullRequest, error) {
	// Проверяем существование PR
	existing, _ := uc.prRepo.GetByID(ctx, prID)
	if existing != nil {
		return nil, errors.NewDomainError(errors.ErrPRExists, "pull request already exists")
	}

	// Получаем команду автора
	team, err := uc.teamRepo.GetByUserID(ctx, authorID)
	if err != nil {
		return nil, errors.NewDomainError(errors.ErrNotFound, err.Error())
	}

	// Проверяем что команда найдена
	if team == nil {
		return nil, errors.NewDomainError(errors.ErrNotFound, "resource not found")
	}

	// Собираем активных ревьюверов (исключая автора)
	var reviewers []string
	for _, member := range team.Members {
		// Пропускаем автора
		if member.UserID == authorID {
			continue
		}

		// Собираем активных ревьюверов
		if member.IsActive {
			reviewers = append(reviewers, member.UserID)
			if len(reviewers) >= 2 {
				break // набрали достаточно ревьюверов
			}
		}
	}

	pr := &entities.PullRequest{
		ID:                prID,
		Name:              prName,
		AuthorID:          authorID,
		AssignedReviewers: reviewers,
		Status:            entities.StatusOpen,
		CreatedAt:         nowPtr(),
	}

	if err := uc.prRepo.Create(ctx, pr); err != nil {
		return nil, err
	}

	for _, reviewer := range reviewers {
		uc.userRepo.SetActive(ctx, reviewer, false)
	}

	return pr, nil
}

func (uc *PullRequestUseCase) MergePR(ctx context.Context, prID string) (*entities.PullRequest, error) {
	pr, err := uc.prRepo.GetByID(ctx, prID)
	if err != nil {
		return nil, errors.NewDomainError(errors.ErrNotFound, err.Error())
	}

	if pr == nil {
		return nil, errors.NewDomainError(errors.ErrNotFound, "resource not found")
	}

	if pr.Status == entities.StatusMerged {
		return nil, errors.NewDomainError(errors.ErrPRMerged, "pull request already merged")
	}

	pr.Status = entities.StatusMerged
	pr.MergedAt = nowPtr()

	if err := uc.prRepo.Update(ctx, pr); err != nil {
		return nil, err
	}

	// Активируем ревьюверов после мержа PR (чтобы была возможность поставить их на новый PR)
	for _, reviewerID := range pr.AssignedReviewers {
		uc.userRepo.SetActive(ctx, reviewerID, true)
	}

	return pr, nil
}

func (uc *PullRequestUseCase) ReassignReviewer(ctx context.Context, prID, oldUserID string) (*entities.PullRequest, string, error) {
	pr, err := uc.prRepo.GetByID(ctx, prID)
	if err != nil {
		return nil, "", errors.NewDomainError(errors.ErrNotFound, err.Error())
	}

	if pr == nil {
		return nil, "", errors.NewDomainError(errors.ErrNotFound, "resource not found")
	}

	if pr.Status == entities.StatusMerged {
		return nil, "", errors.NewDomainError(errors.ErrPRMerged, "cannot reassign on merged PR")
	}

	// Находим старого ревьювера в списке
	found := false
	oldReviewerIndex := -1
	for i, reviewer := range pr.AssignedReviewers {
		if reviewer == oldUserID {
			found = true
			oldReviewerIndex = i
			break
		}
	}

	if !found {
		return nil, "", errors.NewDomainError(errors.ErrNotAssigned, "user is not assigned as reviewer")
	}

	// Получаем команду для поиска замены
	team, err := uc.teamRepo.GetByUserID(ctx, oldUserID)
	if err != nil {
		return nil, "", errors.NewDomainError(errors.ErrNotFound, err.Error())
	}

	if team == nil {
		return nil, "", errors.NewDomainError(errors.ErrNotFound, "resource not found")
	}

	// Ищем активного ревьювера (исключая уже назначенных и автора)
	var newReviewer string
	for _, member := range team.Members {
		if member.IsActive &&
			member.UserID != pr.AuthorID &&
			member.UserID != oldUserID && // исключаем старого ревьювера
			!contains(pr.AssignedReviewers, member.UserID) {
			newReviewer = member.UserID
			break
		}
	}

	if newReviewer == "" {
		return nil, "", errors.NewDomainError(errors.ErrNoCandidate, "no active reviewers available")
	}

	pr.AssignedReviewers[oldReviewerIndex] = newReviewer

	if err := uc.prRepo.Update(ctx, pr); err != nil {
		return nil, "", err
	}

	return pr, newReviewer, nil
}

func (uc *PullRequestUseCase) GetPRsForReview(ctx context.Context, userID string) ([]entities.PullRequestShort, error) {
	return uc.prRepo.GetByReviewerID(ctx, userID)
}

// Метод 1 (дополнительное задание) - статистика
func (uc *PullRequestUseCase) GetUserPRStats(ctx context.Context, userID string) (*entities.UserPRStats, error) {
	// Проверяем существование пользователя
	user, err := uc.userRepo.GetByID(ctx, userID)
	if err != nil {
		return nil, errors.NewDomainError(errors.ErrNotFound, err.Error())
	}

	if user == nil {
		return nil, errors.NewDomainError(errors.ErrNotFound, "user not found")
	}

	// Получаем все PR где пользователь был автором
	authoredPRs, err := uc.prRepo.GetByAuthorID(ctx, userID)
	if err != nil {
		return nil, err
	}

	// Получаем все PR где пользователь был ревьювером
	reviewerPRs, err := uc.prRepo.GetByReviewerID(ctx, userID)
	if err != nil {
		return nil, err
	}

	// Считаем статистику по статусам для authored PRs
	var authoredStats entities.PRStatusStats
	for _, pr := range authoredPRs {
		switch pr.Status {
		case entities.StatusOpen:
			authoredStats.Open++
		case entities.StatusMerged:
			authoredStats.Merged++
		}
	}

	// Считаем статистику по статусам для reviewer PRs
	var reviewerStats entities.PRStatusStats
	for _, pr := range reviewerPRs {
		switch pr.Status {
		case entities.StatusOpen:
			reviewerStats.Open++
		case entities.StatusMerged:
			reviewerStats.Merged++
		}
	}

	stats := &entities.UserPRStats{
		UserID:                 userID,
		Username:               user.Username,
		TotalAuthored:          len(authoredPRs),
		TotalAssignedForReview: len(reviewerPRs),
		AuthoredStats:          authoredStats,
		ReviewerStats:          reviewerStats,
	}

	return stats, nil
}

func nowPtr() *time.Time {
	t := time.Now()
	return &t
}

func contains(slice []string, item string) bool {
	for _, s := range slice {
		if s == item {
			return true
		}
	}
	return false
}
