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
	docker-compose -f docker-compose.test.yml up

# Просмотр Swagger документации
swagger:
	open http://localhost:8080