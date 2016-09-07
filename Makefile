docker_pull:
	docker pull fredriklack/bolaget.io:elasticsearch
	docker pull fredriklack/bolaget.io:node

create_services:
	make docker_pull
	./devops/create_services

production_deploy:
	./devops/production_deploy

development_index:
	docker exec bolagetio_web npm run dev:worker

development_start:
	docker start bolagetio_elasticsearch
	docker start bolagetio_web

development_stop:
	docker stop bolagetio_elasticsearch
	docker stop bolagetio_web

development_create:
	make docker_pull
	./devops/development_create

fill_elastic:
	./devops/fill_elastic
