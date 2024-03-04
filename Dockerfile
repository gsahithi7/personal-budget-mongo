FROM ubuntu:latest

# Install wget and gnupg
RUN apt-get update && apt-get install -y wget gnupg

# Import the public key used by the package management system
RUN wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add -

# Create a list file for MongoDB
RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list

# Reload local package database
RUN apt-get update

# Install the MongoDB Shell
RUN apt-get install -y mongodb-mongosh


# Set the MongoDB data directory
VOLUME [ "/data/db" ]


# Set the entrypoint to mongosh
ENTRYPOINT [ "mongosh" ]