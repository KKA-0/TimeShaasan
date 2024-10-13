#!/bin/bash

# Generate a random secret
SECRET=$(openssl rand -base64 32 | tr -d '=|+/')

# Store it in the .env file
echo "SECRET=${SECRET}" > .env

# Run docker-compose
docker-compose -f docker-compose.micro.local.yml up -d --build