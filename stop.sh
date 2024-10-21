#!/bin/bash

# Delete .env file
rm -rf .env

# Stop docker-compose
docker-compose -f docker-compose.micro.local.yml down