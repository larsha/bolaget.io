FROM nginx:1.17.3-alpine

ARG CONF=0

RUN rm /etc/nginx/nginx.conf
COPY /src/${CONF} /etc/nginx/nginx.conf

EXPOSE 80
