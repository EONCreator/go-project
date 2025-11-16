package config

func LoadTestConfig() *Config {
	return &Config{
		DBHost:     getEnv("TEST_DB_HOST", "test-postgres"),
		DBPort:     getEnv("TEST_DB_PORT", "5432"),
		DBUser:     getEnv("TEST_DB_USER", "test_user"),
		DBPassword: getEnv("TEST_DB_PASSWORD", "test_password"),
		DBName:     getEnv("TEST_DB_NAME", "test_db"),
		IsTest:     true,
	}
}
