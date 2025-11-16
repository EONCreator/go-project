package users

import "go-project/internal/domain/entities"

// Ответ в виде информации о пользователе
type UserResponse struct {
	User struct {
		UserID   string `json:"user_id" example:"u2"`
		Username string `json:"username" example:"Bob"`
		TeamName string `json:"team_name,omitempty" example:"backend"` // опционально, если есть связь с командой
		IsActive bool   `json:"is_active" example:"false"`
	} `json:"user"`
}

// Информация о PR для ревью
type PullRequestReviewResponse struct {
	PullRequestID   string `json:"pull_request_id" example:"pr-1001"`
	PullRequestName string `json:"pull_request_name" example:"Add search"`
	AuthorID        string `json:"author_id" example:"u1"`
	Status          string `json:"status" example:"OPEN"`
}

// Ответ со списком PR для ревью пользователя
type UserPullRequestsResponse struct {
	UserID       string                      `json:"user_id" example:"u2"`
	PullRequests []PullRequestReviewResponse `json:"pull_requests"`
}

func (h *UserHandler) toUserResponse(user *entities.User, teamName string) UserResponse {
	var response UserResponse
	response.User.UserID = user.UserID
	response.User.Username = user.Username
	response.User.IsActive = user.IsActive
	response.User.TeamName = teamName
	return response
}

func (h *UserHandler) toUserPullRequestsResponse(userID string, prs []entities.PullRequestShort) UserPullRequestsResponse {
	response := UserPullRequestsResponse{
		UserID:       userID,
		PullRequests: make([]PullRequestReviewResponse, len(prs)),
	}

	for i, pr := range prs {
		response.PullRequests[i] = PullRequestReviewResponse{
			PullRequestID:   pr.ID,
			PullRequestName: pr.Name,
			AuthorID:        pr.AuthorID,
			Status:          string(pr.Status),
		}
	}

	return response
}
