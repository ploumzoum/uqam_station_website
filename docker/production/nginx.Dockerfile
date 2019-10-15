FROM nginx:alpine
RUN apk update && apk add bash
RUN rm /etc/nginx/conf.d/default.conf
COPY config/nginx/nginx.conf /etc/nginx/conf.d