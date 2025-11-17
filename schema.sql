-- =============================================
-- Database Schema for Go Project
-- =============================================

-- =============================================
-- ENUM Types
-- =============================================

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'pull_request_status') THEN
        CREATE TYPE pull_request_status AS ENUM ('OPEN', 'MERGED');
    END IF;
END $$;

-- =============================================
-- Core Tables
-- =============================================

-- Users table - stores all system users
CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE users IS 'Stores all system users with their basic information and activity status';
COMMENT ON COLUMN users.user_id IS 'Unique identifier for the user';
COMMENT ON COLUMN users.username IS 'Display name of the user, must be unique';
COMMENT ON COLUMN users.is_active IS 'Indicates if the user is currently active in the system';

-- Teams table - stores team definitions
CREATE TABLE IF NOT EXISTS teams (
    name VARCHAR(100) PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE teams IS 'Stores team definitions';
COMMENT ON COLUMN teams.name IS 'Unique name identifier for the team';

-- Pull Requests table - stores PR information
CREATE TABLE IF NOT EXISTS pull_requests (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    author_id VARCHAR(50) NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    status pull_request_status NOT NULL DEFAULT 'OPEN',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    merged_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE pull_requests IS 'Stores pull request information and status';
COMMENT ON COLUMN pull_requests.id IS 'Unique identifier for the pull request';
COMMENT ON COLUMN pull_requests.name IS 'Descriptive name of the pull request';
COMMENT ON COLUMN pull_requests.author_id IS 'Reference to the user who created the PR';
COMMENT ON COLUMN pull_requests.status IS 'Current status of the pull request';
COMMENT ON COLUMN pull_requests.merged_at IS 'Timestamp when the PR was merged, NULL if not merged';

-- =============================================
-- Relationship Tables (Many-to-Many)
-- =============================================

-- Team Members - links users to teams
CREATE TABLE IF NOT EXISTS team_members (
    team_name VARCHAR(100) REFERENCES teams(name) ON DELETE CASCADE,
    user_id VARCHAR(50) REFERENCES users(user_id) ON DELETE CASCADE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (team_name, user_id)
);

COMMENT ON TABLE team_members IS 'Many-to-many relationship between users and teams';
COMMENT ON COLUMN team_members.team_name IS 'Reference to the team';
COMMENT ON COLUMN team_members.user_id IS 'Reference to the team member';

-- Pull Request Reviewers - links users to PRs as reviewers
CREATE TABLE IF NOT EXISTS pull_request_reviewers (
    pull_request_id VARCHAR(50) REFERENCES pull_requests(id) ON DELETE CASCADE,
    user_id VARCHAR(50) REFERENCES users(user_id) ON DELETE CASCADE,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (pull_request_id, user_id)
);

COMMENT ON TABLE pull_request_reviewers IS 'Many-to-many relationship between pull requests and reviewers';
COMMENT ON COLUMN pull_request_reviewers.pull_request_id IS 'Reference to the pull request';
COMMENT ON COLUMN pull_request_reviewers.user_id IS 'Reference to the user assigned as reviewer';

-- =============================================
-- Database Schema Summary
-- =============================================

-- Relationships:
-- 1. USERS (1) ←→ (N) TEAM_MEMBERS (N) ←→ (1) TEAMS
-- 2. USERS (1) ←→ (N) PULL_REQUESTS (as author)
-- 3. USERS (N) ←→ (M) PULL_REQUESTS (as reviewers) via PULL_REQUEST_REVIEWERS

-- Constraints:
-- - All foreign keys have ON DELETE CASCADE
-- - Primary keys enforce uniqueness
-- - username must be unique in users table
-- - ENUM type ensures valid PR status values