.PHONY: build
build:
	docker build \
		-t eu.gcr.io/brynn-145714/bolagetio/web-deployment:local \
		-f services/web/Dockerfile services/web

# make loadtest url=https://bolaget.io
loadtest:
	docker run -it --rm -p 8089:8089 -v `pwd`/locust:/locust fredriklack/docker-locust \
	/bin/ash -c "locust -H $(url)"