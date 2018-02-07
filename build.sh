#!/bin/bash

echo '--------------'
echo 'bundle install'
bundle install

echo '++++++++++++++++++++++'
echo 'BEGIN rebuilding _site'
echo 'rm -rf ./_site'
rm -rf ./_site

echo '------------------------------'
echo 'BEGIN bundle exec jekyll build'
bundle exec jekyll build
echo 'FINISHED bundle exec jekyll build'
echo '---------------------------------'

echo 'FINISHED rebuilding _site'
echo '+++++++++++++++++++++++++'
