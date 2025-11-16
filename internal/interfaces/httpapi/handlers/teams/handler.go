package teams

import (
	"encoding/json"
	"go-project/internal/application/usecases"
	"go-project/internal/domain/entities"
	"go-project/internal/interfaces/httpapi/common"
	"net/http"
)

type TeamHandler struct {
	teamUseCase *usecases.TeamUseCase
}

func NewTeamHandler(teamUseCase *usecases.TeamUseCase) *TeamHandler {
	return &TeamHandler{
		teamUseCase: teamUseCase,
	}
}

func (h *TeamHandler) PostTeamAdd(w http.ResponseWriter, r *http.Request) {
	var team entities.Team
	if err := json.NewDecoder(r.Body).Decode(&team); err != nil {
		common.WriteError(w, http.StatusBadRequest, "INVALID_REQUEST", err.Error())
		return
	}

	if err := h.teamUseCase.CreateTeam(r.Context(), &team); err != nil {
		common.HandleDomainError(w, err)
		return
	}

	common.WriteJSON(w, http.StatusCreated, h.toTeamResponse(&team))
}

func (h *TeamHandler) GetTeamGet(w http.ResponseWriter, r *http.Request) {
	teamName := r.URL.Query().Get("team_name")
	if teamName == "" {
		common.WriteError(w, http.StatusBadRequest, "INVALID_REQUEST", "team_name is required")
		return
	}

	team, err := h.teamUseCase.GetTeam(r.Context(), teamName)
	if err != nil {
		common.HandleDomainError(w, err)
		return
	}

	common.WriteJSON(w, http.StatusOK, h.toTeamResponse(team))
}
