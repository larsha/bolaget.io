web = fredriklack/brynn:web
elasticsearch = fredriklack/brynn:elasticsearch

build_web:
	docker build -t $(web) -f Dockerfile.web .

build_elasticsearch:
	docker build -t $(elasticsearch) -f Dockerfile.elasticsearch .

push_web:
	docker push $(web)

push_elasticsearch:
	docker push $(elasticsearch)
