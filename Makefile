# Запуск приложения
up:
	docker-compose up -d

# Остановка приложения
down:
	docker-compose down

# Перезапуск
restart:
	docker-compose restart

# Просмотр логов
logs:
	docker-compose logs -f app

# Запуск тестов
test:
	docker-compose -f docker-compose.test.yml up test --abort-on-container-exit

# Интеграционные тесты
test-integration:
	docker-compose -f docker-compose.test.yml up integration-tests --abort-on-container-exit

# Полный перезапуск
fresh-start: down up

# Просмотр Swagger документации
swagger:
	open http://localhost:8080