# base image
FROM python:3.6

ENV PYTHONUNBUFFERED 1


# set working directory
WORKDIR /usr/server
ENV PYTHONPATH "${PYTHONPATH}:/usr/server"
# Add dev-requirements.pip file to container
ADD ../requirements/development.pip /usr/server

# install server requirements
RUN pip install --upgrade pip
RUN pip install -r /usr/server/development.pip

# Add the current directory(the web folder) to Docker container
ADD . /usr/server