package users

import (
	"encoding/json"
	"go-project/internal/application/usecases"
	"go-project/internal/interfaces/httpapi/common"
	"net/http"
)

type UserHandler struct {
	userUseCase *usecases.UserUseCase
	prUseCase   *usecases.PullRequestUseCase
}

func NewUserHandler(userUseCase *usecases.UserUseCase, prUseCase *usecases.PullRequestUseCase) *UserHandler {
	return &UserHandler{
		userUseCase: userUseCase,
		prUseCase:   prUseCase,
	}
}

func (h *UserHandler) GetUsersGetReview(w http.ResponseWriter, r *http.Request) {
	userID := r.URL.Query().Get("user_id")
	if userID == "" {
		common.WriteError(w, http.StatusBadRequest, "INVALID_REQUEST", "user_id is required")
		return
	}

	prs, err := h.prUseCase.GetPRsForReview(r.Context(), userID)
	if err != nil {
		common.HandleDomainError(w, err)
		return
	}

	response := h.toUserPullRequestsResponse(userID, prs)
	common.WriteJSON(w, http.StatusOK, response)
}

func (h *UserHandler) PostUsersSetIsActive(w http.ResponseWriter, r *http.Request) {
	var req SetUserActiveRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		common.WriteError(w, http.StatusBadRequest, "INVALID_REQUEST", err.Error())
		return
	}

	user, teamName, err := h.userUseCase.SetUserActive(r.Context(), req.UserId, req.IsActive)
	if err != nil {
		common.HandleDomainError(w, err)
		return
	}

	response := h.toUserResponse(user, teamName)
	common.WriteJSON(w, http.StatusOK, response)
}
