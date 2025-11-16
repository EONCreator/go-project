package repositories

import (
	"context"
	"database/sql"
	"fmt"

	"go-project/internal/domain/entities"
	"go-project/internal/domain/repositories"

	postgres "go-project/internal/infrastructure/postgres_database"
)

type PullRequestRepository struct {
	db *postgres.DB
}

func NewPullRequestRepository(db *postgres.DB) repositories.PullRequestRepository {
	return &PullRequestRepository{db: db}
}

func (r *PullRequestRepository) Create(ctx context.Context, pr *entities.PullRequest) error {
	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback()

	query := `
        INSERT INTO pull_requests (id, name, author_id, status, created_at, merged_at) 
        VALUES ($1, $2, $3, $4, $5, $6)`

	_, err = tx.ExecContext(ctx, query,
		pr.ID, pr.Name, pr.AuthorID, pr.Status, pr.CreatedAt, pr.MergedAt)
	if err != nil {
		return fmt.Errorf("failed to create pull request: %w", err)
	}

	// Добавляем reviewers
	for _, reviewerID := range pr.AssignedReviewers {
		_, err = tx.ExecContext(ctx,
			"INSERT INTO pull_request_reviewers (pull_request_id, user_id) VALUES ($1, $2)",
			pr.ID, reviewerID)
		if err != nil {
			return fmt.Errorf("failed to add reviewer: %w", err)
		}
	}

	return tx.Commit()
}

func (r *PullRequestRepository) GetByID(ctx context.Context, id string) (*entities.PullRequest, error) {
	prQuery := `
        SELECT id, name, author_id, status, created_at, merged_at 
        FROM pull_requests WHERE id = $1`

	row := r.db.QueryRowContext(ctx, prQuery, id)

	var pr entities.PullRequest
	var createdAt, mergedAt sql.NullTime

	err := row.Scan(&pr.ID, &pr.Name, &pr.AuthorID, &pr.Status, &createdAt, &mergedAt)
	if err == sql.ErrNoRows {
		return nil, repositories.ErrPullRequestNotFound
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get pull request: %w", err)
	}

	if createdAt.Valid {
		pr.CreatedAt = &createdAt.Time
	}
	if mergedAt.Valid {
		pr.MergedAt = &mergedAt.Time
	}

	// Получаем reviewers
	reviewers, err := r.getReviewersForPR(ctx, pr.ID)
	if err != nil {
		return nil, err
	}
	pr.AssignedReviewers = reviewers

	return &pr, nil
}

func (r *PullRequestRepository) GetByAuthorID(ctx context.Context, authorID string) ([]entities.PullRequestShort, error) {
	query := `
        SELECT id, name, author_id, status
        FROM pull_requests 
        WHERE author_id = $1 
        ORDER BY created_at DESC`

	rows, err := r.db.QueryContext(ctx, query, authorID)
	if err != nil {
		return nil, fmt.Errorf("failed to list pull requests by author: %w", err)
	}
	defer rows.Close()

	var prs []entities.PullRequestShort
	for rows.Next() {
		var pr entities.PullRequestShort
		if err := rows.Scan(&pr.ID, &pr.Name, &pr.AuthorID, &pr.Status); err != nil {
			return nil, fmt.Errorf("failed to scan pull request: %w", err)
		}
		prs = append(prs, pr)
	}

	return prs, nil
}

func (r *PullRequestRepository) GetByReviewerID(ctx context.Context, reviewerID string) ([]entities.PullRequestShort, error) {
	query := `
        SELECT pr.id, pr.name, pr.author_id, pr.status
        FROM pull_requests pr
        JOIN pull_request_reviewers prr ON pr.id = prr.pull_request_id
        WHERE prr.user_id = $1 
        ORDER BY pr.created_at DESC`

	rows, err := r.db.QueryContext(ctx, query, reviewerID)
	if err != nil {
		return nil, fmt.Errorf("failed to list pull requests by reviewer: %w", err)
	}
	defer rows.Close()

	var prs []entities.PullRequestShort
	for rows.Next() {
		var pr entities.PullRequestShort
		if err := rows.Scan(&pr.ID, &pr.Name, &pr.AuthorID, &pr.Status); err != nil {
			return nil, fmt.Errorf("failed to scan pull request: %w", err)
		}
		prs = append(prs, pr)
	}

	return prs, nil
}

func (r *PullRequestRepository) Update(ctx context.Context, pr *entities.PullRequest) error {
	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback()

	// Обновляем основную информацию PR
	query := `
        UPDATE pull_requests 
        SET name = $1, status = $2, merged_at = $3, updated_at = CURRENT_TIMESTAMP 
        WHERE id = $4`

	result, err := tx.ExecContext(ctx, query, pr.Name, pr.Status, pr.MergedAt, pr.ID)
	if err != nil {
		return fmt.Errorf("failed to update pull request: %w", err)
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to get rows affected: %w", err)
	}
	if rows == 0 {
		return repositories.ErrPullRequestNotFound
	}

	// Удаляем старых reviewers и добавляем новых
	_, err = tx.ExecContext(ctx, "DELETE FROM pull_request_reviewers WHERE pull_request_id = $1", pr.ID)
	if err != nil {
		return fmt.Errorf("failed to delete old reviewers: %w", err)
	}

	for _, reviewerID := range pr.AssignedReviewers {
		_, err = tx.ExecContext(ctx,
			"INSERT INTO pull_request_reviewers (pull_request_id, user_id) VALUES ($1, $2)",
			pr.ID, reviewerID)
		if err != nil {
			return fmt.Errorf("failed to add reviewer: %w", err)
		}
	}

	return tx.Commit()
}

func (r *PullRequestRepository) Delete(ctx context.Context, id string) error {
	query := `DELETE FROM pull_requests WHERE id = $1`
	result, err := r.db.ExecContext(ctx, query, id)
	if err != nil {
		return fmt.Errorf("failed to delete pull request: %w", err)
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to get rows affected: %w", err)
	}
	if rows == 0 {
		return repositories.ErrPullRequestNotFound
	}

	return nil
}

func (r *PullRequestRepository) getReviewersForPR(ctx context.Context, prID string) ([]string, error) {
	query := `SELECT user_id FROM pull_request_reviewers WHERE pull_request_id = $1`
	rows, err := r.db.QueryContext(ctx, query, prID)
	if err != nil {
		return nil, fmt.Errorf("failed to get reviewers: %w", err)
	}
	defer rows.Close()

	var reviewers []string
	for rows.Next() {
		var reviewerID string
		if err := rows.Scan(&reviewerID); err != nil {
			return nil, fmt.Errorf("failed to scan reviewer: %w", err)
		}
		reviewers = append(reviewers, reviewerID)
	}

	return reviewers, nil
}
