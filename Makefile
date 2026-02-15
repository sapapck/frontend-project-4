build:
	rm -rf frontend/dist
	npm run build

start:
	npx start-server -s ./frontend/dist

install:
	npm ci

start-frontend:
	make -C frontend dev