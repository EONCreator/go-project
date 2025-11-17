package integration

import (
	"context"
	"fmt"
	"log"

	"go-project/config"
	"go-project/internal/application/usecases"
	"go-project/internal/domain/repositories"
	"go-project/internal/infrastructure/postgres_database/migrations"

	_ "github.com/lib/pq"
	"github.com/stretchr/testify/suite"

	postgres "go-project/internal/infrastructure/postgres_database"
	postgresRepos "go-project/internal/infrastructure/postgres_database/repositories"
)

type IntegrationTestSuite struct {
	suite.Suite
	db  *postgres.DB
	ctx context.Context

	teamRepo repositories.TeamRepository
	userRepo repositories.UserRepository
	prRepo   repositories.PullRequestRepository

	teamUC *usecases.TeamUseCase
	userUC *usecases.UserUseCase
	prUC   *usecases.PullRequestUseCase
}

func (s *IntegrationTestSuite) SetupSuite() {
	s.ctx = context.Background()

	cfg := s.createTestConfig()

	var err error
	s.db, err = postgres.NewConnection(cfg)
	if err != nil {
		log.Fatalf("Failed to connect to test database: %v", err)
	}

	err = migrations.RunMigrations(s.db.DB)
	if err != nil {
		log.Fatalf("Failed to run migrations: %v", err)
	}

	s.initializeRepositories()
	s.initializeUseCases()
}

func (s *IntegrationTestSuite) createTestConfig() *config.Config {
	testCfg := config.LoadTestConfig()

	return &config.Config{
		DBHost:     testCfg.DBHost,
		DBPort:     testCfg.DBPort,
		DBUser:     testCfg.DBUser,
		DBPassword: testCfg.DBPassword,
		DBName:     testCfg.DBName,
	}
}

func (s *IntegrationTestSuite) initializeRepositories() {
	s.teamRepo = postgresRepos.NewTeamRepository(s.db)
	s.userRepo = postgresRepos.NewUserRepository(s.db)
	s.prRepo = postgresRepos.NewPullRequestRepository(s.db)
}

func (s *IntegrationTestSuite) initializeUseCases() {
	s.teamUC = usecases.NewTeamUseCase(s.teamRepo, s.userRepo)
	s.userUC = usecases.NewUserUseCase(s.userRepo, s.teamRepo)
	s.prUC = usecases.NewPullRequestUseCase(s.prRepo, s.teamRepo, s.userRepo)
}

func (s *IntegrationTestSuite) TearDownSuite() {
	if s.db != nil {
		s.db.Close()
	}
}

func (s *IntegrationTestSuite) SetupTest() {
	tables := []string{"pull_request_reviewers", "pull_requests", "team_members", "teams", "users"}
	for _, table := range tables {
		_, err := s.db.Exec(fmt.Sprintf("TRUNCATE TABLE %s CASCADE", table))
		if err != nil {
			s.T().Fatalf("Failed to truncate table %s: %v", table, err)
		}
	}
}
