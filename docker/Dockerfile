# base image
FROM python:3.6

#RUN apt-get update
#RUN apt-get install -y software-properties-common vim

ENV PYTHONUNBUFFERED 1


# set working directory
WORKDIR /usr/uqam_station_website
# Add the project folder to Docker container
ADD . .
ENV PYTHONPATH "${PYTHONPATH}:/usr/uqam_station_website"


# install server requirements
RUN pip install --upgrade pip
RUN pip install -r requirements/production.pip

# Apply database migrations
RUN python manage.py migrate

 # Collect static files
RUN python manage.py collectstatic --noinput





#Add apps directory to python path
ENV PYTHONPATH "${PYTHONPATH}:/usr/uqam_station_website/apps"
# Create log files
#RUN mkdir /usr/uqam_station_website.nginx/logs
#RUN touch /usr/uqam_station_website.nginx/logs/access.log
#RUN touch /usr/uqam_station_website.nginx/logs/error.log

# expose the port 80
EXPOSE 80

CMD [ "gunicorn", "-c", "config/gunicorn/gunicorn.conf", "--env", "DJANGO_SETTINGS_MODULE=uqam_station_website.settings.production", "uqam_station_website.wsgi" ]
