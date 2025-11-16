-- Создание таблицы связи команд и пользователей (many-to-many)
CREATE TABLE IF NOT EXISTS team_members (
    team_name VARCHAR(100) REFERENCES teams(name) ON DELETE CASCADE,
    user_id VARCHAR(50) REFERENCES users(user_id) ON DELETE CASCADE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (team_name, user_id)
);