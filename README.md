
# Personal Budget Mongo
This guide outlines setting up MongoDB with Docker and accessing it using a Dockerized MongoDB Shell (mongosh).

## Setup MongoDB with Docker

### Pull and Run MongoDB
```sh
docker pull mongo
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Build and Run Mongosh Container
First, ensure you have a Dockerfile for `mongosh-image`. Then, build and run your mongosh Docker image:

```sh
docker build -t mongosh-image .
docker run -it --network host mongosh-image mongodb://127.0.0.1:27017
```

### Key Points
- **Pull and Run MongoDB**: Start a MongoDB server using the official Mongo image.
- **Build and Run Mongosh Container**: Build a custom Docker image for MongoDB Shell and connect to the MongoDB server.

Make sure your MongoDB server is running before trying to connect with the mongosh container.
