# Specify the Docker image to use as a base:
FROM ruby:3.2.1

RUN useradd -m -s /bin/bash -u 1000 winner
USER winner
WORKDIR /home/winner/myapp
