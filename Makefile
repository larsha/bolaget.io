web = fredriklack/brynn:bolagetio_web
nginx = fredriklack/brynn:bolagetio_nginx
elasticsearch = fredriklack/brynn:bolagetio_elasticsearch

build_nginx:
	docker build -t $(nginx) -f Dockerfile.nginx .

build_web:
	docker build -t $(web) -f Dockerfile.web .

build_elasticsearch:
	docker build -t $(elasticsearch) -f Dockerfile.elasticsearch .

push_nginx:
	docker push $(nginx)

push_web:
	docker push $(web)

push_elasticsearch:
	docker push $(elasticsearch)
