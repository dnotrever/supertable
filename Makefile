COMPOSE = docker compose -f development/docker/docker-compose.yml
TYPE ?= patch
OTP ?=

.PHONY: build version publish

build:
	$(COMPOSE) up -d --build

version:
	npm version $(TYPE) --no-git-tag-version

publish:
	npm whoami
	npm ci
	npm run build
	@otp="$(OTP)"; \
	if [ -z "$$otp" ]; then \
		printf "NPM OTP (Enter vazio somente se usar token com bypass 2FA): "; \
		read otp; \
	fi; \
	npm version $(TYPE) --no-git-tag-version; \
	if [ -n "$$otp" ]; then \
		npm publish --access public --otp "$$otp"; \
	else \
		npm publish --access public; \
	fi
