package common

import (
	"encoding/json"
	"go-project/internal/domain/errors"
	"net/http"
)

func WriteError(w http.ResponseWriter, status int, code, message string) {
	errorResp := struct {
		Error struct {
			Code    string `json:"code"`
			Message string `json:"message"`
		} `json:"error"`
	}{}
	errorResp.Error.Code = code
	errorResp.Error.Message = message

	WriteJSON(w, status, errorResp)
}

func HandleDomainError(w http.ResponseWriter, err error) {
	if domainErr, ok := err.(errors.DomainError); ok {
		WriteError(w, GetHTTPStatus(domainErr.Code), string(domainErr.Code), domainErr.Message)
		return
	}
	WriteError(w, http.StatusInternalServerError, "INTERNAL_ERROR", err.Error())
}

func GetHTTPStatus(code errors.ErrorCode) int {
	switch code {
	case errors.ErrTeamExists, errors.ErrUserInAnotherTeam:
		return http.StatusBadRequest
	case errors.ErrNotFound:
		return http.StatusNotFound
	case errors.ErrPRExists, errors.ErrPRMerged, errors.ErrNotAssigned, errors.ErrNoCandidate:
		return http.StatusConflict
	default:
		return http.StatusInternalServerError
	}
}

func WriteJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}
