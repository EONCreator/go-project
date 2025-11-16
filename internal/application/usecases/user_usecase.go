package usecases

import (
	"context"
	"go-project/internal/domain/entities"
	"go-project/internal/domain/errors"
	"go-project/internal/domain/repositories"
)

type UserUseCase struct {
	userRepo repositories.UserRepository
	teamRepo repositories.TeamRepository
}

func NewUserUseCase(userRepo repositories.UserRepository, teamRepo repositories.TeamRepository) *UserUseCase {
	return &UserUseCase{
		userRepo: userRepo,
		teamRepo: teamRepo,
	}
}

func (uc *UserUseCase) SetUserActive(ctx context.Context, userID string, isActive bool) (*entities.User, string, error) {
	// Проверяем существование пользователя
	user, err := uc.userRepo.GetByID(ctx, userID)
	if err != nil {
		return nil, "", err
	}

	if user == nil {
		return nil, "", errors.NewDomainError(errors.ErrNotFound, "user not found")
	}

	user.IsActive = isActive

	if err := uc.userRepo.Update(ctx, user); err != nil {
		return nil, "", err
	}

	// Получаем команду пользователя
	var teamName string
	if team, err := uc.teamRepo.GetByUserID(ctx, userID); err == nil && team != nil {
		teamName = team.Name
	}

	return user, teamName, nil
}
