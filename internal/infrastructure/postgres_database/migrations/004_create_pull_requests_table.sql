-- Создание типа enum для статусов pull request
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'pull_request_status') THEN
        CREATE TYPE pull_request_status AS ENUM ('OPEN', 'MERGED');
    END IF;
END $$;

-- Создание таблицы pullrequests
CREATE TABLE IF NOT EXISTS pull_requests (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    author_id VARCHAR(50) NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    status pull_request_status NOT NULL DEFAULT 'OPEN',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    merged_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы для assigned reviewers (many-to-many)
CREATE TABLE IF NOT EXISTS pull_request_reviewers (
    pull_request_id VARCHAR(50) REFERENCES pull_requests(id) ON DELETE CASCADE,
    user_id VARCHAR(50) REFERENCES users(user_id) ON DELETE CASCADE,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (pull_request_id, user_id)
);

ALTER TABLE pull_requests ADD CONSTRAINT unique_pr_id UNIQUE (id);