.PHONY: loadtest

date=$(shell date +%s)
registry=eu.gcr.io/brynn-145714/bolagetio

# make loadtest url=https://bolaget.io
loadtest:
	docker run -it --rm -p 8089:8089 -v `pwd`/devops/locust:/locust fredriklack/docker-locust \
  	/bin/ash -c "locust -H $(url)"
