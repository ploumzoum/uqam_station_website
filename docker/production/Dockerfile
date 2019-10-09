# base image
FROM python:3.6-slim
ARG DEBIAN_FRONTEND=noninteractive
#RUN apt-get update
#RUN apt-get install -y software-properties-common vim
ENV PYTHONUNBUFFERED 1
ENV WORKPATH "/var/www/station.escer.uqam.ca"

# set working directory
WORKDIR $WORKPATH
# Add the project folder to Docker container
ADD . .

ENV PYTHONPATH "${PYTHONPATH}:${WORKPATH}"

RUN apt-get update \
    && apt-get --no-install-recommends -y install  apt-utils \
    && apt-get --no-install-recommends -y install build-essential \
        default-libmysqlclient-dev \
    && apt-get clean; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*
# install server requirements
RUN pip install --upgrade pip \
    && pip install -r requirements/production.pip

#Add apps directory to python path
ENV PYTHONPATH "${PYTHONPATH}:${WORKPATH}/apps"
RUN python manage.py migrate -- noinput
RUN python manage.py collectstatic --noinput

# Create log files
#RUN mkdir /usr/share/logs
#RUN touch /usr/share/logs/access.log
#RUN touch /usr/share/logs/error.log
#RUN chmod 777 /usr/share/logs/access.log
#RUN chmod 777 /usr/share/logs/error.log


#CMD [ "gunicorn", "-c", "config/gunicorn/gunicorn.production.conf", "--env", "DJANGO_SETTINGS_MODULE=uqam_station_website.settings.production", "uqam_station_website.wsgi" ]
