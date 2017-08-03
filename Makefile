.PHONY: run loadtest

run_job:
	kubectl -n bolagetio delete job/worker
	kubectl -n bolagetio create -f devops/k8s/job.yml

# make loadtest url=https://bolaget.io
loadtest:
	docker run -it --rm -p 8089:8089 -v `pwd`/devops/locust:/locust fredriklack/docker-locust \
  	/bin/ash -c "locust -H $(url)"
