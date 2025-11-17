# Makefile
.PHONY: test-integration test-unit test-all up-test-env down-test-env

# Запуск тестовой среды
up-test-env:
	docker-compose -f docker-compose.test.yml up -d
	@echo "Waiting for test database to be ready..."
	sleep 5

# Остановка тестовой среды  
down-test-env:
	docker-compose -f docker-compose.test.yml down

# Запуск интеграционных тестов
test-integration: up-test-env
	@echo "Running integration tests..."
	go test -v -tags=integration ./tests/integration/... -timeout 5m
	$(MAKE) down-test-env

# Запуск конкретного теста
test-integration-team:
	$(MAKE) up-test-env
	go test -v -tags=integration -run TestTeamUseCaseIntegration ./tests/integration/
	$(MAKE) down-test-env

test-integration-pr:
	$(MAKE) up-test-env
	go test -v -tags=integration -run TestPullRequestUseCaseIntegration ./tests/integration/
	$(MAKE) down-test-env