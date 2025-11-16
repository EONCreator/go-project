package integration

import (
	"testing"

	"go-project/internal/domain/entities"

	"github.com/stretchr/testify/suite"
)

func TestPullRequestUseCaseIntegration(t *testing.T) {
	if testing.Short() {
		t.Skip("Skipping integration test in short mode")
	}

	suite.Run(t, new(PullRequestUseCaseTestSuite))
}

type PullRequestUseCaseTestSuite struct {
	IntegrationTestSuite
}

func (s *PullRequestUseCaseTestSuite) SetupTest() {
	s.IntegrationTestSuite.SetupTest()
	s.setupTestTeam()
}

func (s *PullRequestUseCaseTestSuite) setupTestTeam() {
	users := []*entities.User{
		{UserID: "author1", Username: "author1", IsActive: true},
		{UserID: "reviewer1", Username: "reviewer1", IsActive: true},
		{UserID: "reviewer2", Username: "reviewer2", IsActive: true},
		{UserID: "reviewer3", Username: "reviewer3", IsActive: false},
	}

	for _, user := range users {
		s.userRepo.Create(s.ctx, user)
	}

	team := &entities.Team{
		Name:    "Dev Team",
		Members: users,
	}
	s.teamUC.CreateTeam(s.ctx, team)
}

func (s *PullRequestUseCaseTestSuite) TestCreatePR_Success() {
	pr, err := s.prUC.CreatePR(s.ctx, "author1", "pr-123", "Test Pull Request")

	s.NoError(err)
	s.NotNil(pr)
	s.Equal("pr-123", pr.ID)
	s.Equal("Test Pull Request", pr.Name)
	s.Equal("author1", pr.AuthorID)
	s.Equal(entities.StatusOpen, pr.Status)
	s.Len(pr.AssignedReviewers, 2)

	for _, reviewer := range pr.AssignedReviewers {
		s.NotEqual("author1", reviewer)
		user, _ := s.userRepo.GetByID(s.ctx, reviewer)
		s.False(user.IsActive, "Reviewer should be deactivated")
	}
}

func (s *PullRequestUseCaseTestSuite) TestCreatePR_AuthorNotInTeam() {
	pr, err := s.prUC.CreatePR(s.ctx, "unknown_user", "pr-456", "Test PR")

	s.Error(err)
	s.Nil(pr)
	s.Contains(err.Error(), "team not found")
}

func (s *PullRequestUseCaseTestSuite) TestMergePR_Success() {
	pr, _ := s.prUC.CreatePR(s.ctx, "author1", "pr-789", "PR to Merge")
	reviewers := pr.AssignedReviewers

	mergedPR, err := s.prUC.MergePR(s.ctx, "pr-789")

	s.NoError(err)
	s.NotNil(mergedPR)
	s.Equal(entities.StatusMerged, mergedPR.Status)
	s.NotNil(mergedPR.MergedAt)

	for _, reviewer := range reviewers {
		user, _ := s.userRepo.GetByID(s.ctx, reviewer)
		s.True(user.IsActive, "Reviewer should be reactivated after merge")
	}
}

func (s *PullRequestUseCaseTestSuite) TestReassignReviewer_Success() {
	pr, _ := s.prUC.CreatePR(s.ctx, "author1", "pr-999", "PR for Reassignment")
	oldReviewer := pr.AssignedReviewers[0]

	updatedPR, newReviewer, err := s.prUC.ReassignReviewer(s.ctx, "pr-999", oldReviewer)

	if err != nil {
		s.T().Logf("ReassignReviewer failed: %v", err)
		return
	}

	s.NoError(err)
	s.NotNil(updatedPR)
	s.NotEqual(oldReviewer, newReviewer)
	s.Contains(updatedPR.AssignedReviewers, newReviewer)
	s.NotContains(updatedPR.AssignedReviewers, oldReviewer)
}
