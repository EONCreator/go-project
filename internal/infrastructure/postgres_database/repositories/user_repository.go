package repositories

import (
	"context"
	"database/sql"
	"fmt"

	"go-project/internal/domain/entities"
	"go-project/internal/domain/repositories"

	postgres "go-project/internal/infrastructure/postgres_database"
)

type UserRepository struct {
	db *postgres.DB
}

func NewUserRepository(db *postgres.DB) repositories.UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) Create(ctx context.Context, user *entities.User) error {
	query := `INSERT INTO users (user_id, username, is_active) VALUES ($1, $2, $3)`
	_, err := r.db.ExecContext(ctx, query, user.UserID, user.Username, user.IsActive)
	if err != nil {
		return fmt.Errorf("failed to create user: %w", err)
	}
	return nil
}

func (r *UserRepository) GetByID(ctx context.Context, id string) (*entities.User, error) {
	query := `SELECT user_id, username, is_active FROM users WHERE user_id = $1`
	row := r.db.QueryRowContext(ctx, query, id)

	var user entities.User
	err := row.Scan(&user.UserID, &user.Username, &user.IsActive)
	if err == sql.ErrNoRows {
		return nil, repositories.ErrUserNotFound
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get user by ID: %w", err)
	}

	return &user, nil
}

func (r *UserRepository) Update(ctx context.Context, user *entities.User) error {
	query := `UPDATE users SET username = $1, is_active = $2, updated_at = CURRENT_TIMESTAMP WHERE user_id = $3`
	result, err := r.db.ExecContext(ctx, query, user.Username, user.IsActive, user.UserID)
	if err != nil {
		return fmt.Errorf("failed to update user: %w", err)
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to get rows affected: %w", err)
	}
	if rows == 0 {
		return repositories.ErrUserNotFound
	}

	return nil
}

func (r *UserRepository) SetActive(ctx context.Context, userID string, isActive bool) error {
	query := `UPDATE users SET is_active = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2`
	result, err := r.db.ExecContext(ctx, query, isActive, userID)
	if err != nil {
		return fmt.Errorf("failed to set user active status: %w", err)
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to get rows affected: %w", err)
	}
	if rows == 0 {
		return repositories.ErrUserNotFound
	}

	return nil
}

func (r *UserRepository) Delete(ctx context.Context, userID string) error {
	query := `DELETE FROM users WHERE user_id = $1`
	result, err := r.db.ExecContext(ctx, query, userID)
	if err != nil {
		return fmt.Errorf("failed to delete user: %w", err)
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to get rows affected: %w", err)
	}
	if rows == 0 {
		return repositories.ErrUserNotFound
	}

	return nil
}
