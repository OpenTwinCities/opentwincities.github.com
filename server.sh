#!/bin/bash

# Not setting this environment variable results in the following error
# in css/style.scss:
# Invalid US-ASCII character "\xE2"
export LC_ALL='C.UTF-8'

sh build.sh

echo '**********************'
echo 'OPEN YOUR WEB BROWSER.'
echo 'GO TO THE FOLLOWING URL:'
echo 'http://<IP Address>:4000'
echo 'If Docker is installed directly in your host OS, the IP address is localhost.'
echo 'If you are using Docker Machine, use the IP address is probably 192.168.99.100.'
echo '*******************************************************************************'
echo '---------------------------------------'
echo 'bundle exec jekyll serve --host 0.0.0.0'
bundle exec jekyll serve --host 0.0.0.0
