package postgres

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"go-project/config"

	_ "github.com/lib/pq"
)

type DB struct {
	*sql.DB
}

func NewConnection(cfg *config.Config) (*DB, error) {
	db, err := sql.Open("postgres", cfg.GetDBConnectionString())
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := db.PingContext(ctx); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	db.SetMaxOpenConns(100)
	db.SetMaxIdleConns(50)
	db.SetConnMaxLifetime(5 * time.Minute)

	return &DB{db}, nil
}

func (db *DB) Close() error {
	return db.DB.Close()
}
