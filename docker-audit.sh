#!/bin/bash
set -e

# NOTE: This script is to be used ONLY in a Docker container or in Travis.

echo '-------------------'
echo 'gem install bundler'
gem install bundler

# BEGIN: changing the Gemfile
STR1="gem 'bundler-audit'"
STR2="# $STR1"
sed -i.bak "s|$STR2|$STR1|g" Gemfile
rm Gemfile.bak
# END: changing the Gemfile

echo '----------------------'
echo 'bundle install --quiet'
bundle install --quiet

echo '-------------------------------'
echo 'bundle exec bundle-audit update'
bundle exec bundle-audit update

echo '------------------------'
echo 'bundle exec bundle-audit'
bundle exec bundle-audit

# BEGIN: changing the Gemfile back
sed -i.bak "s|$STR1|$STR2|g" Gemfile
rm Gemfile.bak
# END: changing the Gemfile back

echo '----------------------'
echo 'bundle install --quiet'
bundle install --quiet
