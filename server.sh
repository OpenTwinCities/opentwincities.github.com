#!/bin/bash

echo '++++++++++++++++'
echo 'rebuilding _site'
echo 'rm -rf ./_site'
rm -rf ./_site

echo '+++++++++++++++++++++++++++'
echo 'BEGIN: docker-compose build'
echo '+++++++++++++++++++++++++++'
docker-compose build
echo '++++++++++++++++++++++++++++++'
echo 'FINISHED: docker-compose build'
echo '++++++++++++++++++++++++++++++'

echo '-----------------'
echo 'docker-compose up'
echo
echo 'Web page: http://localhost:4000/'
echo 'LiveReload: http://localhost:35729/'
docker-compose up
