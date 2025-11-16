package teams

import "go-project/internal/domain/entities"

// TeamResponse ответ с информацией о команде
type TeamResponse struct {
	Team entities.Team `json:"team"`
}

func (h *TeamHandler) toTeamResponse(team *entities.Team) TeamResponse {
	return TeamResponse{Team: *team}
}
