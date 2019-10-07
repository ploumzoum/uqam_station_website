FROM nginx:1.17.2-alpine
RUN apk update && apk add bash
RUN rm /etc/nginx/conf.d/default.conf
COPY config/nginx/nginx.production.conf /etc/nginx/conf.d