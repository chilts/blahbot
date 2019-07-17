PATH := node_modules/.bin:$(PATH)

smee:
	smee --url $$WEBHOOK_PROXY_URL --port $$PORT

dev:
	npm run dev

.PHONY: smee
