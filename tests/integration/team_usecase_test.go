package integration

import (
	"testing"

	"go-project/internal/domain/entities"

	"github.com/stretchr/testify/suite"
)

func TestTeamUseCaseIntegration(t *testing.T) {
	if testing.Short() {
		t.Skip("Skipping integration test in short mode")
	}

	suite.Run(t, new(TeamUseCaseTestSuite))
}

type TeamUseCaseTestSuite struct {
	IntegrationTestSuite
}

func (s *TeamUseCaseTestSuite) TestCreateTeam_Success() {
	team := &entities.Team{
		Name: "Development Team",
		Members: []*entities.User{
			{UserID: "user1", Username: "john_doe", IsActive: true},
			{UserID: "user2", Username: "jane_smith", IsActive: true},
		},
	}

	err := s.teamUC.CreateTeam(s.ctx, team)

	s.NoError(err)

	createdTeam, err := s.teamRepo.GetByName(s.ctx, "Development Team")
	s.NoError(err)
	s.NotNil(createdTeam)
	s.Equal("Development Team", createdTeam.Name)
	s.Len(createdTeam.Members, 2)
}

func (s *TeamUseCaseTestSuite) TestCreateTeam_DuplicateName() {
	team1 := &entities.Team{
		Name: "Backend Team",
		Members: []*entities.User{
			{UserID: "user1", Username: "user1", IsActive: true},
		},
	}

	team2 := &entities.Team{
		Name: "Backend Team",
		Members: []*entities.User{
			{UserID: "user2", Username: "user2", IsActive: true},
		},
	}

	err1 := s.teamUC.CreateTeam(s.ctx, team1)
	err2 := s.teamUC.CreateTeam(s.ctx, team2)

	s.NoError(err1)
	s.Error(err2)
	s.Contains(err2.Error(), "team_name already exists")
}

func (s *TeamUseCaseTestSuite) TestGetTeam_Success() {
	team := &entities.Team{
		Name: "Frontend Team",
		Members: []*entities.User{
			{UserID: "user3", Username: "alice", IsActive: true},
		},
	}
	s.teamUC.CreateTeam(s.ctx, team)

	foundTeam, err := s.teamUC.GetTeam(s.ctx, "Frontend Team")

	s.NoError(err)
	s.NotNil(foundTeam)
	s.Equal("Frontend Team", foundTeam.Name)
	s.Len(foundTeam.Members, 1)
	s.Equal("user3", foundTeam.Members[0].UserID)
}

func (s *TeamUseCaseTestSuite) TestGetTeam_NotFound() {
	team, err := s.teamUC.GetTeam(s.ctx, "NonExistentTeam")

	s.Error(err)
	s.Nil(team)
	s.Contains(err.Error(), "resource not found")
}
