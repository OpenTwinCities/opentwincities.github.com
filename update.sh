#!/bin/bash

docker-compose run --rm web bin/update
bash gemsurance.sh
