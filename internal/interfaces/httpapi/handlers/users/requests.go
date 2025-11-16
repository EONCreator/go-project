package users

// SetUserActiveRequest запрос на установку активности пользователя
type SetUserActiveRequest struct {
	IsActive bool   `json:"is_active" example:"true"`
	UserId   string `json:"user_id" example:"u1"`
}
