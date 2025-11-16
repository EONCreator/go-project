package usecases

import (
	"context"
	"fmt"
	"go-project/internal/domain/entities"
	"go-project/internal/domain/errors"
	"go-project/internal/domain/repositories"
)

type TeamUseCase struct {
	teamRepo repositories.TeamRepository
	userRepo repositories.UserRepository
}

func NewTeamUseCase(teamRepo repositories.TeamRepository, userRepo repositories.UserRepository) *TeamUseCase {
	return &TeamUseCase{
		teamRepo: teamRepo,
		userRepo: userRepo,
	}
}

func (uc *TeamUseCase) CreateTeam(ctx context.Context, team *entities.Team) error {
	// Проверяем существование команды
	existing, _ := uc.teamRepo.GetByName(ctx, team.Name)
	if existing != nil {
		return errors.NewDomainError(errors.ErrTeamExists, "team_name already exists")
	}

	// Проверяем что пользователи не состоят в других командах
	for _, member := range team.Members {
		existingTeam, _ := uc.teamRepo.GetByUserID(ctx, member.UserID)
		if existingTeam != nil {
			return errors.NewDomainError(errors.ErrUserInAnotherTeam,
				fmt.Sprintf("user %s already in team %s", member.UserID, existingTeam.Name))
		}
	}

	// 1. Сначала создаем/обновляем всех пользователей
	var createdUsers []string // Запоминаем созданных пользователей для отката
	for _, member := range team.Members {
		existingUser, _ := uc.userRepo.GetByID(ctx, member.UserID)
		if existingUser == nil {
			user := &entities.User{
				UserID:   member.UserID,
				Username: member.Username,
				IsActive: member.IsActive,
			}
			if err := uc.userRepo.Create(ctx, user); err != nil {
				// Откатываем созданных пользователей
				for _, userID := range createdUsers {
					_ = uc.userRepo.Delete(ctx, userID)
				}
				return err
			}
			createdUsers = append(createdUsers, member.UserID)
		} else {
			// Обновляем пользователя если нужно
			existingUser.Username = member.Username
			existingUser.IsActive = member.IsActive
			if err := uc.userRepo.Update(ctx, existingUser); err != nil {
				// Откатываем созданных пользователей
				for _, userID := range createdUsers {
					_ = uc.userRepo.Delete(ctx, userID)
				}
				return err
			}
		}
	}

	// 2. Теперь создаем команду и добавляем участников
	if err := uc.teamRepo.Create(ctx, team); err != nil {
		// Откатываем созданных пользователей
		for _, userID := range createdUsers {
			_ = uc.userRepo.Delete(ctx, userID)
		}
		return err
	}

	return nil
}

func (uc *TeamUseCase) GetTeam(ctx context.Context, teamName string) (*entities.Team, error) {
	team, err := uc.teamRepo.GetByName(ctx, teamName)

	if team == nil {
		return nil, errors.NewDomainError(errors.ErrNotFound, "resource not found")
	} else if err != nil {
		return nil, err
	}

	return team, nil
}
