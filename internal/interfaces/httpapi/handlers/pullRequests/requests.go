package pullRequests

// CreatePRRequest запрос на создание PR
type CreatePRRequest struct {
	AuthorId        string `json:"author_id" example:"u1"`
	PullRequestId   string `json:"pull_request_id" example:"pr-1001"`
	PullRequestName string `json:"pull_request_name" example:"Add search"`
}

// MergePRRequest запрос на мерж PR
type MergePRRequest struct {
	PullRequestId string `json:"pull_request_id" example:"pr-1001"`
}

// ReassignPRRequest запрос на переназначение ревьювера
type ReassignPRRequest struct {
	OldUserId     string `json:"old_reviewer_id" example:"u2"`
	PullRequestId string `json:"pull_request_id" example:"pr-1001"`
}
