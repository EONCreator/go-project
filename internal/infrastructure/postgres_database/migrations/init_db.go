package migrations

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"path/filepath"

	_ "github.com/golang-migrate/migrate/v4/source/file"
)

func RunMigrations(db *sql.DB) error {
	migrationsPath := "./migrations"

	if _, err := os.Stat(migrationsPath); os.IsNotExist(err) {
		return fmt.Errorf("migrations directory not found: %s", migrationsPath)
	}

	migrationFiles := []string{
		"001_create_users_table.sql",
		"002_create_teams_table.sql",
		"003_create_team_members_table.sql",
		"004_create_pull_requests_table.sql",
	}

	for _, filename := range migrationFiles {
		filePath := filepath.Join(migrationsPath, filename)

		log.Printf("Running migration: %s", filename)

		content, err := os.ReadFile(filePath)
		if err != nil {
			return fmt.Errorf("failed to read migration %s: %w", filename, err)
		}

		_, err = db.Exec(string(content))
		if err != nil {
			return fmt.Errorf("failed to execute migration %s: %w", filename, err)
		}

		log.Printf("Migration completed: %s", filename)
	}

	return nil
}
