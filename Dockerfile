# Specify the Docker image to use as a base:
FROM ruby:2.6.5-stretch

ENV DEBIAN_FRONTEND=noninteractive \
    NODE_VERSION=12.18.2

RUN sed -i '/deb-src/d' /etc/apt/sources.list && \
    apt-get update && \
    apt-get install -y build-essential tree graphviz

RUN curl -sSL "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" | tar xfJ - -C /usr/local --strip-components=1 && \
    npm install npm -g

RUN useradd -m -s /bin/bash -u 1000 winner
USER winner
WORKDIR /home/winner/myapp
