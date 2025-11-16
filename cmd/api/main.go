package main

import (
	"fmt"
	"log"
	"net/http"

	"go-project/config"
	"go-project/internal/application/usecases"
	"go-project/internal/infrastructure/postgres_database/migrations"
	"go-project/internal/interfaces/httpapi"

	postgres "go-project/internal/infrastructure/postgres_database"
	repositories "go-project/internal/infrastructure/postgres_database/repositories"
)

func main() {
	cfg := config.Load()

	// Соединение с БД
	db, err := postgres.NewConnection(cfg)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer db.Close()

	// Запуск миграций
	migrations.RunMigrations(db.DB)

	// Инициализация репозиториев
	userRepo := repositories.NewUserRepository(db)
	teamRepo := repositories.NewTeamRepository(db)
	prRepo := repositories.NewPullRequestRepository(db)

	// Инициализация use cases
	prUseCase := usecases.NewPullRequestUseCase(prRepo, teamRepo, userRepo)
	teamUseCase := usecases.NewTeamUseCase(teamRepo, userRepo)
	userUseCase := usecases.NewUserUseCase(userRepo, teamRepo)

	// Инициализация тестовых данных
	migrations.InitTestDataViaUseCases(teamUseCase, userRepo)

	// Запуск сервера
	server := httpapi.NewServer(prUseCase, teamUseCase, userUseCase)

	addr := fmt.Sprintf(":%s", cfg.AppPort)
	log.Printf("Server starting on %s", addr)
	if err := http.ListenAndServe(addr, server); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}
