gce_web = eu.gcr.io/brynn-145714/bolagetio/web:latest
gce_nginx = eu.gcr.io/brynn-145714/bolagetio/nginx:latest
gce_elasticsearch = eu.gcr.io/brynn-145714/bolagetio/elasticsearch:latest

gce_build_web:
	docker build -t $(gce_web) -f Dockerfile.web .

gce_push_web:
	gcloud docker -- push $(gce_web)

gce_build_nginx:
	docker build -t $(gce_nginx) -f Dockerfile.nginx .

gce_push_nginx:
	gcloud docker -- push $(gce_nginx)

gce_build_elasticsearch:
	docker build -t $(gce_elasticsearch) -f Dockerfile.elasticsearch .

gce_push_elasticsearch:
	gcloud docker -- push $(gce_elasticsearch)
