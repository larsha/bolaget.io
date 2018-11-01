.PHONY: build
build:
	docker build \
		--build-arg CONF=development.conf \
		-t eu.gcr.io/brynn-145714/bolagetio/nginx-deployment:local \
		-f services/nginx/Dockerfile services/nginx

	docker build \
		-t eu.gcr.io/brynn-145714/bolagetio/web-deployment:local \
		-f services/web/Dockerfile services/web
