# usage: make gce_deploy service=web|nginx|elasticsearch version=1.0.0
gce_deploy:
	docker build -t eu.gcr.io/brynn-145714/bolagetio/$(service):latest -t eu.gcr.io/brynn-145714/bolagetio/$(service):$(version) -f Dockerfile.$(service) .
	gcloud docker -- push eu.gcr.io/brynn-145714/bolagetio/$(service):latest
	gcloud docker -- push eu.gcr.io/brynn-145714/bolagetio/$(service):$(version)
	docker rmi eu.gcr.io/brynn-145714/bolagetio/$(service):latest
	docker rmi eu.gcr.io/brynn-145714/bolagetio/$(service):$(version)
	kubectl -n bolagetio set image deployment/$(service) $(service)=eu.gcr.io/brynn-145714/bolagetio/$(service):$(version)
