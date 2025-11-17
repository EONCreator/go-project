package pullrequests

import (
	"encoding/json"
	"go-project/internal/application/usecases"
	"go-project/internal/interfaces/httpapi/common"
	"net/http"
)

type PullRequestHandler struct {
	prUseCase *usecases.PullRequestUseCase
}

func NewPullRequestHandler(prUseCase *usecases.PullRequestUseCase) *PullRequestHandler {
	return &PullRequestHandler{
		prUseCase: prUseCase,
	}
}

func (h *PullRequestHandler) PostPullRequestCreate(w http.ResponseWriter, r *http.Request) {
	var req CreatePRRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		common.WriteError(w, http.StatusBadRequest, "INVALID_REQUEST", err.Error())
		return
	}

	pr, err := h.prUseCase.CreatePR(r.Context(), req.AuthorId, req.PullRequestId, req.PullRequestName)
	if err != nil {
		common.HandleDomainError(w, err)
		return
	}

	common.WriteJSON(w, http.StatusCreated, h.toPullRequestResponse(pr))
}

func (h *PullRequestHandler) PostPullRequestMerge(w http.ResponseWriter, r *http.Request) {
	var req MergePRRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		common.WriteError(w, http.StatusBadRequest, "INVALID_REQUEST", err.Error())
		return
	}

	pr, err := h.prUseCase.MergePR(r.Context(), req.PullRequestId)
	if err != nil {
		common.HandleDomainError(w, err)
		return
	}

	response := h.toPullRequestMergedResponse(pr)
	common.WriteJSON(w, http.StatusOK, response)
}

func (h *PullRequestHandler) PostPullRequestReassign(w http.ResponseWriter, r *http.Request) {
	var req ReassignPRRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		common.WriteError(w, http.StatusBadRequest, "INVALID_REQUEST", err.Error())
		return
	}

	pr, newReviewer, err := h.prUseCase.ReassignReviewer(r.Context(), req.PullRequestId, req.OldUserId)
	if err != nil {
		common.HandleDomainError(w, err)
		return
	}

	response := ReassignReviewerResponse{
		PR:         h.toPullRequestResponse(pr),
		ReplacedBy: newReviewer,
	}

	common.WriteJSON(w, http.StatusOK, response)
}

// Возвращает статистику по PR для пользователя
func (h *PullRequestHandler) GetUserPRStats(w http.ResponseWriter, r *http.Request) {
	userID := r.URL.Query().Get("userId")
	if userID == "" {
		common.WriteError(w, http.StatusBadRequest, "MISSING_PARAMETER", "userId parameter is required")
		return
	}

	stats, err := h.prUseCase.GetUserPRStats(r.Context(), userID)
	if err != nil {
		common.HandleDomainError(w, err)
		return
	}

	response := UserPRStatsResponse{
		UserID:                 stats.UserID,
		Username:               stats.Username,
		TotalAuthored:          stats.TotalAuthored,
		TotalAssignedForReview: stats.TotalAssignedForReview,
		AuthoredStats: PRStatusStatsResponse{
			Open:   stats.AuthoredStats.Open,
			Merged: stats.AuthoredStats.Merged,
		},
		ReviewerStats: PRStatusStatsResponse{
			Open:   stats.ReviewerStats.Open,
			Merged: stats.ReviewerStats.Merged,
		},
	}

	common.WriteJSON(w, http.StatusOK, response)
}
