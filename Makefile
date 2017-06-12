.PHONY: run

run_job:
	kubectl -n bolagetio delete job/worker
	kubectl -n bolagetio create -f devops/k8s/job.yml
