<h3>Инструкция по запуску</h3>

Для запуска нужно перейти в корень проекта. Команды для запуска:<br>
<br>
* Запуск приложения<br>
```bash
docker-compose up
```
* Запуск тестов<br>
```bash
docker-compose -f docker-compose.test.yml up
```
(Можно также запустить контейнеры через Visual Studio Code)<br>
Помимо этого в Makefile добавлены дополнительные команды<br>
Для тестирования API нужно перейти по ссылке: http://localhost:8080/swagger<br>

___

<h3>Архитектура</h3>

Данное решение реализует **Clean architecture**.

<img width="500" height="576" alt="image" src="https://github.com/user-attachments/assets/45e34ed1-0a30-4cf4-b2f2-debe30cbaa8d" />

- **domain** - слой, в котором определены сущности. Это, можно сказать, "ядро" приложения.<br>
- **application/usecases** - здесь находятся сервисы, которые работают с бизнес-логикой.<br>
- **infrastructure** - здесь находятся низкоуровневые сервисы. В данном случае реализации репозиториев.<br>
- **interfaces** - здесь находится контроллер http-запросов (обработчики, которые привязаны к маршрутам).<br>

___


<h3>База данных</h3>

В качестве БД используется **PostgreSQL**<br>
Определены следующие таблицы:<br>

- **USERS** - таблица пользователей<br>
- **TEAMS** - таблица команд<br>
- **TEAM_MEMBERS** - таблица с членами команд<br>
- **PULL_REQUESTS** - таблица с пулл-реквестами<br>
- **PULL_REQUEST_VIEWERS** - ревьюверы, привязанные к пулл-реквесту<br>

<br>

_ER-диаграмма:_

<img width="680" height="439" alt="image" src="https://github.com/user-attachments/assets/0c24f040-3c2a-43ea-bee2-38ef252fe364" />

<br>

_Миграции_:<br>

При запуске приложения после запуска контейнера с БД, проходят миграции. После чего инициализируются тестовые данные:<br>

- 3 команды: _backend_, _frontend_, _devops_<br>
- 100 пользователей, 13 из которых уже состоят в командах. Остальные свободны (можно привязать к новой команде).<br>
ID'ы всех пользователей задаются их порядковым номером: u1...u100 (uN).

___


<h2>Дополнительные задания</h2>

<h3>1. Нагрузочное тестирование</h3>
Для нагрузочного тестирования использовался <b>Apache JMeter</b>. Тесты проходили на эндпоинте /team/get.<br>
Было использовано 3 сценария: 100 пользователей, 1000 пользователей, 10000 пользователей. Ниже приведены результаты тестирования:<br>

* _100 пользователей:_ <br>
<img width="523" height="241" alt="image" src="https://github.com/user-attachments/assets/b5a6692f-1a85-4dfe-a9fd-fca27adb07b7" />

При нагрузке в 100 пользователей сервис справляется хорошо. APDEX близок к 1.

Подробные результаты (только при 100 пользователей):<br>
<img width="1005" height="167" alt="image" src="https://github.com/user-attachments/assets/01365f38-aa7a-465e-bd79-d1e01c40b837" />

RPS = 140.65<br>

* _1000 пользователей:_ <br>
<img width="522" height="240" alt="image" src="https://github.com/user-attachments/assets/d25e2f01-f262-445c-b02d-474aae55ac5b" />

При нагрузке в 1000 пользователей получаются средние показатели. APDEX близок к 0.6.<br>

* _10000 пользователей_ <br>
<img width="529" height="249" alt="image" src="https://github.com/user-attachments/assets/d571ed94-d9d1-4156-8bb8-5a6b2d4d5ddb" />

При нагрузке в 10000 пользователей сервис справляется слабо. Возможно, нужна оптимизация, но скорее всего масштабирование.<br>
Также были случаи, связанные с БД. Например, ошибки в логах:<br>
_FATAL:  sorry, too many clients already._ <br>
Изменил _max_connections=100_. Но это максимум по умолчанию.<br>
Также не хватает индексов (но их не стал добавлять в начале, т.к. пока данных не слишком много). <br>

Но во всех 3 случаях не было ошибок в ответах:<br>
<img width="525" height="286" alt="image" src="https://github.com/user-attachments/assets/b3bda999-62cd-44e2-8eb2-0cbf84df52e5" />

Более подробную информацию можно посмотреть в каталоге _tests/load_.

<h3>2. Интеграционное тестирование</h3>

Тесты были применены к use cases, которые обрабатывают бизнес-логику пользователей, команд и пулл-реквестов.<br>
Все тесты (вместе с БД) запускаются в отдельных контейнерах (с отдельным docker-compose-test.yml)<br>

_Все тесты проходят успешно:_ <br>
```bash
--- PASS: TestPullRequestUseCaseIntegration (0.68s)
    --- PASS: TestPullRequestUseCaseIntegration/TestCreatePR_AuthorNotInTeam (0.17s)
    --- PASS: TestPullRequestUseCaseIntegration/TestCreatePR_Success (0.15s)
    --- PASS: TestPullRequestUseCaseIntegration/TestMergePR_Success (0.16s)
    --- PASS: TestPullRequestUseCaseIntegration/TestReassignReviewer_Success (0.16s)

--- PASS: TestTeamUseCaseIntegration (0.46s)
    --- PASS: TestTeamUseCaseIntegration/TestCreateTeam_DuplicateName (0.12s)
    --- PASS: TestTeamUseCaseIntegration/TestCreateTeam_Success (0.11s)
    --- PASS: TestTeamUseCaseIntegration/TestGetTeam_NotFound (0.09s)
    --- PASS: TestTeamUseCaseIntegration/TestGetTeam_Success (0.10s)

--- PASS: TestUserUseCaseIntegration (0.30s)
    --- PASS: TestUserUseCaseIntegration/TestSetUserActive_Success (0.15s)
    --- PASS: TestUserUseCaseIntegration/TestSetUserActive_UserNotFound (0.13s)
```

___

<h3>3. Эндпоинт для статистики пользователя</h3>

Был добавлен эндпоинт, который по пользователю получает кол-во пулл-реквестов, где пользователь был автором/ревьювером, и информацию о пулл-реквестах, где пользователь является (являлся) автором/ревьювером.<br>

```bash
/pullRequest/userStats?userId=u1
```

```bash
{
  "user_id": "u1",
  "username": "alice",
  "total_authored": 1,
  "total_assigned_for_review": 0,
  "authored_stats": {
    "open": 0,
    "merged": 1
  },
  "reviewer_stats": {
    "open": 0,
    "merged": 0
  }
}
```
___

<h3>Примечания</h3>

<h4>1. Файл .env</h4>
Знаю, что коммитить его не следует, но пароли там дефолтные и точно не будут меняться, поэтому так будет проще.<br>

<h4>2. Бизнес-логика</h4>
Проблема, с которой столкнулся при написании сервиса:<br>

Если мы создаем новую команду и пытаемся прикрепить пользователя, который уже состоит в другой команде. <br>
В openapi.yml не было такого кода ошибки, поэтому добавил <i>USER_IN_ANOTHER_TEAM</i>.

<h4>3. Handler'ы в контроллере</h4>
На каждый use case я сделал отдельный обработчик запросов со своими request/response. Но при этом названия скриптов одинаковые (только разные папки).<br>
<img width="147" height="179" alt="image" src="https://github.com/user-attachments/assets/6e68d557-e771-4621-8424-c253dd186cce" />

Возможно с точки зрения Go это не совсем правильно, но не придумал чего-то получше (т.к. раньше писал на C# и там была примерно такая структура).<br>
Потому-что если использовать один скрипт, например, team_handler.go, то получится много типов и код будет менее читабельным.

