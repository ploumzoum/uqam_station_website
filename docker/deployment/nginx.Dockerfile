FROM nginx:1.17.2-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY config/nginx/nginx.conf /etc/nginx/conf.d