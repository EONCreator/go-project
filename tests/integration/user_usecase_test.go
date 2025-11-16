package integration

import (
	"go-project/internal/domain/entities"
	"testing"

	"github.com/stretchr/testify/suite"
)

func TestUserUseCaseIntegration(t *testing.T) {
	if testing.Short() {
		t.Skip("Skipping integration test in short mode")
	}

	suite.Run(t, new(UserUseCaseTestSuite))
}

type UserUseCaseTestSuite struct {
	IntegrationTestSuite
}

func (s *UserUseCaseTestSuite) SetupTest() {
	s.IntegrationTestSuite.SetupTest()
	s.setupTestData()
}

func (s *UserUseCaseTestSuite) setupTestData() {
	user := &entities.User{
		UserID:   "test_user",
		Username: "test_user",
		IsActive: true,
	}
	s.userRepo.Create(s.ctx, user)

	team := &entities.Team{
		Name:    "Test Team",
		Members: []*entities.User{user},
	}
	s.teamUC.CreateTeam(s.ctx, team)
}

func (s *UserUseCaseTestSuite) TestSetUserActive_Success() {
	user, teamName, err := s.userUC.SetUserActive(s.ctx, "test_user", false)

	s.NoError(err)
	s.NotNil(user)
	s.Equal("Test Team", teamName)
	s.False(user.IsActive)

	updatedUser, _ := s.userRepo.GetByID(s.ctx, "test_user")
	s.False(updatedUser.IsActive)
}

func (s *UserUseCaseTestSuite) TestSetUserActive_UserNotFound() {
	user, teamName, err := s.userUC.SetUserActive(s.ctx, "non_existent_user", true)

	s.Error(err)
	s.Nil(user)
	s.Empty(teamName)
	s.Contains(err.Error(), "user not found")
}
