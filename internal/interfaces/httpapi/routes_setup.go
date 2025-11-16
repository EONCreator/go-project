package httpapi

import (
	"net/http"

	"go-project/internal/application/usecases"
	"go-project/internal/interfaces/httpapi/handlers/pullrequests"
	"go-project/internal/interfaces/httpapi/handlers/teams"
	"go-project/internal/interfaces/httpapi/handlers/users"
)

type Server struct {
	prHandler   *pullrequests.PullRequestHandler
	teamHandler *teams.TeamHandler
	userHandler *users.UserHandler
	mux         *http.ServeMux
}

func NewServer(
	prUseCase *usecases.PullRequestUseCase,
	teamUseCase *usecases.TeamUseCase,
	userUseCase *usecases.UserUseCase,
) *Server {
	prHandler := pullrequests.NewPullRequestHandler(prUseCase)
	teamHandler := teams.NewTeamHandler(teamUseCase)
	userHandler := users.NewUserHandler(userUseCase, prUseCase)
	s := &Server{
		prHandler:   prHandler,
		teamHandler: teamHandler,
		userHandler: userHandler,
		mux:         http.NewServeMux(),
	}

	s.setupRoutes()
	return s
}

// Здесь мы определяем маршруты и связываем их с обработчиками
func (s *Server) setupRoutes() {
	// Машррут для Swagger'а
	s.mux.HandleFunc("GET /swagger/", s.serveSwaggerUI)
	s.mux.HandleFunc("GET /openapi.yml", s.serveSwaggerYAML)

	// Пулл-реквесты - делегируем хендлерам
	s.mux.HandleFunc("POST /pullRequest/create", s.prHandler.PostPullRequestCreate)
	s.mux.HandleFunc("POST /pullRequest/merge", s.prHandler.PostPullRequestMerge)
	s.mux.HandleFunc("POST /pullRequest/reassign", s.prHandler.PostPullRequestReassign)

	// Команды - делегируем хендлерам
	s.mux.HandleFunc("POST /team/add", s.teamHandler.PostTeamAdd)
	s.mux.HandleFunc("GET /team/get", s.teamHandler.GetTeamGet)

	// Пользователи - делегируем хендлерам
	s.mux.HandleFunc("GET /users/getReview", s.userHandler.GetUsersGetReview)
	s.mux.HandleFunc("POST /users/setIsActive", s.userHandler.PostUsersSetIsActive)
}

func (s *Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	s.mux.ServeHTTP(w, r)
}
