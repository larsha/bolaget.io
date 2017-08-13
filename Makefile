.PHONY: run loadtest

date=$(shell date +%s)
registry=eu.gcr.io/brynn-145714/brynnse

run_job:
	kubectl -n bolagetio delete job/worker
	kubectl -n bolagetio create -f devops/k8s/job.yml

# make loadtest url=https://bolaget.io
loadtest:
	docker run -it --rm -p 8089:8089 -v `pwd`/devops/locust:/locust fredriklack/docker-locust \
  	/bin/ash -c "locust -H $(url)"

deploy_nginx:
	docker build \
	-t $(registry)/nginx:latest -t $(registry)/nginx:$(date) \
	-f Dockerfile.nginx .

	gcloud docker -- push $(registry)/nginx:$(date)
	gcloud docker -- push $(registry)/nginx:latest

	kubectl -n bolagetio set image deployment/nginx nginx=$(registry)/nginx:$(date)

deploy_elasticsearch:
	docker build \
	-t $(registry)/elasticsearch:latest -t $(registry)/elasticsearch:$(date) \
	-f Dockerfile.elasticsearch .

	gcloud docker -- push $(registry)/elasticsearch:$(date)
	gcloud docker -- push $(registry)/elasticsearch:latest

	kubectl -n bolagetio set image deployment/elasticsearch elasticsearch=$(registry)/elasticsearch:$(date)
