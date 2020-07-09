#!/bin/bash
set -e

# NOTE: This script is to be used ONLY in a Docker container or in Travis.

echo '-------------------'
echo 'gem install bundler'
gem install bundler

# BEGIN: changing the Gemfile
STR1="gem 'gemsurance'"
STR2="# $STR1"
sed -i.bak "s|$STR2|$STR1|g" Gemfile
rm Gemfile.bak
# END: changing the Gemfile

echo '----------------------'
echo 'bundle install --quiet'
bundle install --quiet

# Checks for outdated and insecure gems
echo '----------------------'
echo 'bundle exec gemsurance'
bundle exec gemsurance
wait
mv gemsurance_report.html tmp/gemsurance_report.html
echo 'The Gemsurance Report is at tmp/gemsurance_report.html .'

# BEGIN: changing the Gemfile back
sed -i.bak "s|$STR1|$STR2|g" Gemfile
rm Gemfile.bak
# END: changing the Gemfile back

echo '----------------------'
echo 'bundle install --quiet'
bundle install --quiet
