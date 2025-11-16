// internal/domain/repositories/interfaces.go
package repositories

import (
	"context"
	"errors"
	"go-project/internal/domain/entities"
)

var (
	ErrUserNotFound             = errors.New("user not found")
	ErrTeamNotFound             = errors.New("team not found")
	ErrTeamMemberNotFound       = errors.New("team member not found")
	ErrPullRequestNotFound      = errors.New("pull request not found")
	ErrUserAlreadyExists        = errors.New("user already exists")
	ErrTeamAlreadyExists        = errors.New("team already exists")
	ErrPullRequestAlreadyExists = errors.New("pull request already exists")
	ErrInvalidData              = errors.New("invalid data")
	ErrDatabaseOperation        = errors.New("database operation failed")
	ErrConstraintViolation      = errors.New("constraint violation")
)

type PullRequestRepository interface {
	Create(ctx context.Context, pr *entities.PullRequest) error
	GetByID(ctx context.Context, id string) (*entities.PullRequest, error)
	GetByAuthorID(ctx context.Context, authorID string) ([]entities.PullRequestShort, error)
	GetByReviewerID(ctx context.Context, reviewerID string) ([]entities.PullRequestShort, error)
	Update(ctx context.Context, pr *entities.PullRequest) error
	Delete(ctx context.Context, id string) error
}

type TeamRepository interface {
	Create(ctx context.Context, team *entities.Team) error
	GetByName(ctx context.Context, name string) (*entities.Team, error)
	GetByUserID(ctx context.Context, userID string) (*entities.Team, error)
	Update(ctx context.Context, team *entities.Team) error
	Delete(ctx context.Context, teamName string) error
	AddMember(ctx context.Context, teamName, userID string, isActive bool) error
	RemoveMember(ctx context.Context, teamName, userID string) error
}

type UserRepository interface {
	Create(ctx context.Context, user *entities.User) error
	GetByID(ctx context.Context, id string) (*entities.User, error)
	Update(ctx context.Context, user *entities.User) error
	SetActive(ctx context.Context, userID string, isActive bool) error
	Delete(ctx context.Context, userID string) error
}
