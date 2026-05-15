COMPOSE = docker compose -f development/docker/docker-compose.yml
TYPE ?= patch

.PHONY: build restart down logs publish

build:
	$(COMPOSE) up -d --build

restart:
	$(COMPOSE) restart

down:
	$(COMPOSE) down

logs:
	$(COMPOSE) logs -f

publish:
	npm version $(type)
	npm run build
	npm publish --access public

