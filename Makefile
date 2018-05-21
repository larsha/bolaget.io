# Make sure this insecure registry is added to local Docker daemon
INSECURE_LOCAL_REGISTRY=docker.for.mac.localhost:5000

.PHONY: setup_development_registry
setup_development_registry:
	kubectl config use-context docker-for-desktop
	helm install stable/docker-registry \
		--namespace default \
		--name docker-registry \
		--set service.type=LoadBalancer \
		--set persistence.enabled=true

.PHONY: build_development_nginx
build_development_nginx:
	kubectl config use-context docker-for-desktop

	# Nginx
	docker build \
		--build-arg CONF=development.conf \
		-t $(INSECURE_LOCAL_REGISTRY)/bolagetio/nginx-deployment:latest \
		-f services/nginx/Dockerfile services/nginx

	docker push $(INSECURE_LOCAL_REGISTRY)/bolagetio/nginx-deployment:latest

.PHONY: build_development_web
build_development_web:
	kubectl config use-context docker-for-desktop

	# Web
	docker build \
		-t $(INSECURE_LOCAL_REGISTRY)/bolagetio/web-deployment:latest \
		-f services/web/Dockerfile services/web

	docker push $(INSECURE_LOCAL_REGISTRY)/bolagetio/web-deployment:latest

.PHONY: setup_development
setup_development:
	kubectl config use-context docker-for-desktop
	helm init --upgrade --service-account default

.PHONY: install_development
install_development:
	kubectl config use-context docker-for-desktop
	kubectl create ns bolagetio
	kubectl config set-context docker-for-desktop --namespace=bolagetio
	helm install -f chart/values.local.yaml --name bolagetio ./chart

.PHONY: install_development_dry_run
install_development_dry_run:
	kubectl config use-context docker-for-desktop
	helm install -f chart/values.local.yaml --name bolagetio --dry-run --debug ./chart

.PHONY: delete_development
delete_development:
	helm delete bolagetio --purge
	kubectl delete ns bolagetio