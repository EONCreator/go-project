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
