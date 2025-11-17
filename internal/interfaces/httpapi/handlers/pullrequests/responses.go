package pullrequests

import (
	"go-project/internal/domain/entities"
	"time"
)

// Ответ в виде пулл-реквеста
type PullRequestResponse struct {
	PR struct {
		PullRequestID     string   `json:"pull_request_id" example:"pr-1001"`
		PullRequestName   string   `json:"pull_request_name" example:"Add search"`
		AuthorID          string   `json:"author_id" example:"u1"`
		Status            string   `json:"status" example:"OPEN"`
		AssignedReviewers []string `json:"assigned_reviewers" example:"u2,u3"`
	} `json:"pr"`
}

// Пулл-реквест, который слили
type PullRequestMergedResponse struct {
	PR struct {
		PullRequestID     string     `json:"pull_request_id" example:"pr-1001"`
		PullRequestName   string     `json:"pull_request_name" example:"Add search"`
		AuthorID          string     `json:"author_id" example:"u1"`
		Status            string     `json:"status" example:"OPEN"`
		AssignedReviewers []string   `json:"assigned_reviewers" example:"u2,u3"`
		MergedAt          *time.Time `json:"mergedAt"`
	} `json:"pr"`
}

// Ответ со списком PR
type PullRequestListResponse struct {
	PullRequests []entities.PullRequestShort `json:"pull_requests"`
}

// Ответ переназначения ревьювера
type ReassignReviewerResponse struct {
	PR         PullRequestResponse `json:"pr"`
	ReplacedBy string              `json:"replaced_by" example:"u5"`
}

// UserPRStatsResponse - ответ со статистикой по PR пользователя
type UserPRStatsResponse struct {
	UserID                 string                `json:"user_id"`
	Username               string                `json:"username"`
	TotalAuthored          int                   `json:"total_authored"`
	TotalAssignedForReview int                   `json:"total_assigned_for_review"`
	AuthoredStats          PRStatusStatsResponse `json:"authored_stats"`
	ReviewerStats          PRStatusStatsResponse `json:"reviewer_stats"`
}

// PRStatusStatsResponse - статистика по статусам PR
type PRStatusStatsResponse struct {
	Open   int `json:"open"`
	Merged int `json:"merged"`
}

// Методы преобразования
func (h *PullRequestHandler) toPullRequestResponse(pr *entities.PullRequest) PullRequestResponse {
	var response PullRequestResponse
	response.PR.PullRequestID = pr.ID
	response.PR.PullRequestName = pr.Name
	response.PR.AuthorID = pr.AuthorID
	response.PR.Status = string(pr.Status)
	response.PR.AssignedReviewers = pr.AssignedReviewers
	return response
}

func (h *PullRequestHandler) toPullRequestMergedResponse(pr *entities.PullRequest) PullRequestMergedResponse {
	var response PullRequestMergedResponse
	response.PR.PullRequestID = pr.ID
	response.PR.PullRequestName = pr.Name
	response.PR.AuthorID = pr.AuthorID
	response.PR.Status = string(pr.Status)
	response.PR.AssignedReviewers = pr.AssignedReviewers
	response.PR.MergedAt = pr.MergedAt
	return response
}
