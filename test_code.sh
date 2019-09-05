#!/bin/bash

# This script runs the app through code metrics.
# Violations will not stop the app from passing but will be flagged here.

echo '----------------------'
echo 'bundle install --quiet'
bundle install --quiet

# Update the local ruby-advisory-db advisory database
echo '-------------------------------'
echo 'bundle exec bundle-audit update'
bundle exec bundle-audit update

# Audit the gems listed in Gemfile.lock for vulnerabilities
echo '------------------------'
echo 'bundle exec bundle-audit'
bundle exec bundle-audit

# Checks for outdated and insecure gems
mkdir -p log
echo '----------------------------------------------------------'
echo 'bundle exec gemsurance --output log/gemsurance_report.html'
bundle exec gemsurance --output log/gemsurance_report.html
echo 'The Gemsurance Report is at log/gemsurance_report.html .'
