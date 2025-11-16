package migrations

import (
	"context"
	"fmt"
	"go-project/internal/application/usecases"
	"go-project/internal/domain/entities"
	"log"

	repositoryInterfaces "go-project/internal/domain/repositories"
)

func InitTestDataViaUseCases(teamUseCase *usecases.TeamUseCase, userRepo repositoryInterfaces.UserRepository) {
	ctx := context.Background()

	users := map[string]*entities.User{
		"u1":  {UserID: "u1", Username: "alice", IsActive: true},
		"u2":  {UserID: "u2", Username: "bob", IsActive: true},
		"u3":  {UserID: "u3", Username: "charlie", IsActive: true},
		"u4":  {UserID: "u4", Username: "sam", IsActive: true},
		"u5":  {UserID: "u5", Username: "mike", IsActive: true},
		"u6":  {UserID: "u6", Username: "diana", IsActive: true},
		"u7":  {UserID: "u7", Username: "eve", IsActive: true},
		"u8":  {UserID: "u8", Username: "frank", IsActive: false},
		"u9":  {UserID: "u9", Username: "jane", IsActive: true},
		"u10": {UserID: "u10", Username: "john", IsActive: false},
		"u11": {UserID: "u11", Username: "grace", IsActive: true},
		"u12": {UserID: "u12", Username: "henry", IsActive: true},
	}

	for _, user := range users {
		existing, _ := userRepo.GetByID(ctx, user.UserID)
		if existing == nil {
			userRepo.Create(ctx, user)
		} else {
			userRepo.Update(ctx, user)
		}
	}

	teams := []*entities.Team{
		{
			Name: "backend",
			Members: []*entities.User{
				users["u1"],
				users["u2"],
				users["u3"],
				users["u4"],
				users["u5"],
			},
		},
		{
			Name: "frontend",
			Members: []*entities.User{
				users["u6"],
				users["u7"],
				users["u8"],
				users["u9"],
				users["u10"],
			},
		},
		{
			Name: "devops",
			Members: []*entities.User{
				users["u11"],
				users["u12"],
			},
		},
	}

	for _, team := range teams {
		if err := teamUseCase.CreateTeam(ctx, team); err != nil {
			log.Printf("Error creating team %s: %v", team.Name, err)
		}
	}

	for i := 13; i <= 99; i++ {
		userID := fmt.Sprintf("u%d", i)
		username := fmt.Sprintf("user%d", i)
		users[userID] = &entities.User{
			UserID:   userID,
			Username: username,
			IsActive: true,
		}
	}

	for _, user := range users {
		existing, _ := userRepo.GetByID(ctx, user.UserID)
		if existing == nil {
			userRepo.Create(ctx, user)
		} else {
			userRepo.Update(ctx, user)
		}
	}

	log.Println("Test data initialized with shared user objects")
	log.Printf("User u1 object in team: %p", users["u1"]) // для отладки
}
