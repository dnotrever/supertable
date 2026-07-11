COMPOSE = docker compose -f development/docker/docker-compose.yml
TYPE ?= patch

.PHONY: build restart down logs version publish

build:
	$(COMPOSE) up -d --build

restart:
	$(COMPOSE) restart

version:
	npm version $(TYPE) --no-git-tag-version

publish:
	npm whoami
	npm version $(TYPE) --no-git-tag-version
	npm run build
	npm publish --access public
