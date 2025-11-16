package repositories

import (
	"context"
	"database/sql"
	"fmt"

	"go-project/internal/domain/entities"
	"go-project/internal/domain/repositories"

	postgres "go-project/internal/infrastructure/postgres_database"
)

type TeamRepository struct {
	db *postgres.DB
}

func NewTeamRepository(db *postgres.DB) repositories.TeamRepository {
	return &TeamRepository{db: db}
}

func (r *TeamRepository) Create(ctx context.Context, team *entities.Team) error {
	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback()

	// Создаем команду
	_, err = tx.ExecContext(ctx, "INSERT INTO teams (name) VALUES ($1)", team.Name)
	if err != nil {
		return fmt.Errorf("failed to create team: %w", err)
	}

	// Добавляем членов команды (автоматически удаляя из старых команд)
	for _, user := range team.Members {
		// Удаляем пользователя из всех предыдущих команд
		_, err = tx.ExecContext(ctx,
			"DELETE FROM team_members WHERE user_id = $1",
			user.UserID)
		if err != nil {
			return fmt.Errorf("failed to remove user from previous teams: %w", err)
		}

		// Добавляем в новую команду
		_, err = tx.ExecContext(ctx,
			"INSERT INTO team_members (team_name, user_id) VALUES ($1, $2)",
			team.Name, user.UserID)
		if err != nil {
			return fmt.Errorf("failed to add team member: %w", err)
		}
	}

	return tx.Commit()
}

func (r *TeamRepository) GetByName(ctx context.Context, name string) (*entities.Team, error) {
	// Проверяем существование команды
	teamQuery := `SELECT name FROM teams WHERE name = $1`
	row := r.db.QueryRowContext(ctx, teamQuery, name)

	var team entities.Team
	err := row.Scan(&team.Name)
	if err == sql.ErrNoRows {
		return nil, repositories.ErrTeamNotFound
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get team: %w", err)
	}

	// Получаем членов команды
	membersQuery := `
        SELECT u.user_id, u.username, u.is_active 
        FROM team_members tm
        JOIN users u ON tm.user_id = u.user_id
        WHERE tm.team_name = $1`

	rows, err := r.db.QueryContext(ctx, membersQuery, name)
	if err != nil {
		return nil, fmt.Errorf("failed to get team members: %w", err)
	}
	defer rows.Close()

	var members []*entities.User
	for rows.Next() {
		var user entities.User
		if err := rows.Scan(&user.UserID, &user.Username, &user.IsActive); err != nil {
			return nil, fmt.Errorf("failed to scan team member: %w", err)
		}
		members = append(members, &user)
	}

	team.Members = members
	return &team, nil
}

func (r *TeamRepository) GetByUserID(ctx context.Context, userID string) (*entities.Team, error) {
	query := `
        SELECT t.name 
        FROM teams t
        JOIN team_members tm ON t.name = tm.team_name
        WHERE tm.user_id = $1
        LIMIT 1`

	row := r.db.QueryRowContext(ctx, query, userID)

	var team entities.Team
	err := row.Scan(&team.Name)
	if err == sql.ErrNoRows {
		return nil, repositories.ErrTeamNotFound
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get team by user ID: %w", err)
	}

	// Получаем всех членов команды
	membersQuery := `
        SELECT u.user_id, u.username, u.is_active 
        FROM team_members tm
        JOIN users u ON tm.user_id = u.user_id
        WHERE tm.team_name = $1`

	rows, err := r.db.QueryContext(ctx, membersQuery, team.Name)
	if err != nil {
		return nil, fmt.Errorf("failed to get team members: %w", err)
	}
	defer rows.Close()

	var members []*entities.User
	for rows.Next() {
		var user entities.User
		if err := rows.Scan(&user.UserID, &user.Username, &user.IsActive); err != nil {
			return nil, fmt.Errorf("failed to scan team member: %w", err)
		}
		members = append(members, &user)
	}

	team.Members = members
	return &team, nil
}

func (r *TeamRepository) Update(ctx context.Context, team *entities.Team) error {
	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback()

	// Проверяем существование команды
	var exists bool
	err = tx.QueryRowContext(ctx, "SELECT EXISTS(SELECT 1 FROM teams WHERE name = $1)", team.Name).Scan(&exists)
	if err != nil {
		return fmt.Errorf("failed to check team existence: %w", err)
	}
	if !exists {
		return repositories.ErrTeamNotFound
	}

	// Обновляем состав команды
	// Сначала удаляем всех текущих членов
	_, err = tx.ExecContext(ctx, "DELETE FROM team_members WHERE team_name = $1", team.Name)
	if err != nil {
		return fmt.Errorf("failed to clear team members: %w", err)
	}

	// Затем добавляем новых членов (с удалением из старых команд)
	for _, user := range team.Members {
		// Удаляем пользователя из всех других команд
		_, err = tx.ExecContext(ctx,
			"DELETE FROM team_members WHERE user_id = $1",
			user.UserID)
		if err != nil {
			return fmt.Errorf("failed to remove user from previous teams: %w", err)
		}

		// Добавляем в текущую команду
		_, err = tx.ExecContext(ctx,
			"INSERT INTO team_members (team_name, user_id) VALUES ($1, $2)",
			team.Name, user.UserID)
		if err != nil {
			return fmt.Errorf("failed to add team member: %w", err)
		}
	}

	return tx.Commit()
}

func (r *TeamRepository) Delete(ctx context.Context, teamName string) error {
	query := `DELETE FROM teams WHERE name = $1`
	result, err := r.db.ExecContext(ctx, query, teamName)
	if err != nil {
		return fmt.Errorf("failed to delete team: %w", err)
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to get rows affected: %w", err)
	}
	if rows == 0 {
		return repositories.ErrTeamNotFound
	}

	return nil
}

func (r *TeamRepository) AddMember(ctx context.Context, teamName, userID string, isActive bool) error {
	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback()

	// Удаляем пользователя из всех предыдущих команд
	_, err = tx.ExecContext(ctx,
		"DELETE FROM team_members WHERE user_id = $1",
		userID)
	if err != nil {
		return fmt.Errorf("failed to remove user from previous teams: %w", err)
	}

	// Добавляем в новую команду
	_, err = tx.ExecContext(ctx,
		"INSERT INTO team_members (team_name, user_id) VALUES ($1, $2)",
		teamName, userID)
	if err != nil {
		return fmt.Errorf("failed to add team member: %w", err)
	}

	return tx.Commit()
}

func (r *TeamRepository) RemoveMember(ctx context.Context, teamName, userID string) error {
	query := `DELETE FROM team_members WHERE team_name = $1 AND user_id = $2`
	result, err := r.db.ExecContext(ctx, query, teamName, userID)
	if err != nil {
		return fmt.Errorf("failed to remove team member: %w", err)
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to get rows affected: %w", err)
	}
	if rows == 0 {
		return repositories.ErrTeamMemberNotFound
	}

	return nil
}

// Новый метод для получения всех команд (если нужно)
func (r *TeamRepository) GetAll(ctx context.Context) ([]*entities.Team, error) {
	query := `SELECT name FROM teams`
	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("failed to get teams: %w", err)
	}
	defer rows.Close()

	var teams []*entities.Team
	for rows.Next() {
		var team entities.Team
		if err := rows.Scan(&team.Name); err != nil {
			return nil, fmt.Errorf("failed to scan team: %w", err)
		}
		teams = append(teams, &team)
	}

	return teams, nil
}
