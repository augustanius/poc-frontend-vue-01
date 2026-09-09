.PHONY: dev build preview lint typecheck clean install

install:
	npm install

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

lint:
	npm run lint

typecheck:
	npx vue-tsc --noEmit

clean:
	rm -rf node_modules .nuxt .output
