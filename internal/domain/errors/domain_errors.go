package errors

type ErrorCode string

const (
	ErrNoCandidate ErrorCode = "NO_CANDIDATE"
	ErrNotAssigned ErrorCode = "NOT_ASSIGNED"
	ErrNotFound    ErrorCode = "NOT_FOUND"
	ErrPRExists    ErrorCode = "PR_EXISTS"
	ErrPRMerged    ErrorCode = "PR_MERGED"
	ErrTeamExists  ErrorCode = "TEAM_EXISTS"

	ErrUserInAnotherTeam ErrorCode = "USER_IN_ANOTHER_TEAM" // Если пытаемся привязать
	// к новой команде пользователя, который находится в другой команде
)

type DomainError struct {
	Code    ErrorCode `json:"code"`
	Message string    `json:"message"`
}

func (e DomainError) Error() string {
	return string(e.Code) + ": " + e.Message
}

func NewDomainError(code ErrorCode, message string) DomainError {
	return DomainError{Code: code, Message: message}
}
