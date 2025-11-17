package entities

import "time"

type PullRequestStatus string

const (
	StatusOpen   PullRequestStatus = "OPEN"
	StatusMerged PullRequestStatus = "MERGED"
)

type PullRequest struct {
	ID                string            `json:"pull_request_id"`
	Name              string            `json:"pull_request_name"`
	AuthorID          string            `json:"author_id"`
	AssignedReviewers []string          `json:"assigned_reviewers"`
	Status            PullRequestStatus `json:"status"`
	CreatedAt         *time.Time        `json:"createdAt"`
	MergedAt          *time.Time        `json:"mergedAt"`
}

type PullRequestShort struct {
	ID       string            `json:"pull_request_id"`
	Name     string            `json:"pull_request_name"`
	AuthorID string            `json:"author_id"`
	Status   PullRequestStatus `json:"status"`
}

// Для статистики

// PRStatusStats содержит статистику по статусам PR
type PRStatusStats struct {
	Open   int `json:"open"`
	Merged int `json:"merged"`
}

// UserPRStats содержит статистику по PR для пользователя
type UserPRStats struct {
	UserID                 string        `json:"user_id"`
	Username               string        `json:"username"`
	TotalAuthored          int           `json:"total_authored"`
	TotalAssignedForReview int           `json:"total_assigned_for_review"`
	AuthoredStats          PRStatusStats `json:"authored_stats"`
	ReviewerStats          PRStatusStats `json:"reviewer_stats"`
}
