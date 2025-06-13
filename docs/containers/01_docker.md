# Docker

Docker is a popular platform for developing, shipping, and running applications inside containers. It simplifies application deployment by packaging code and dependencies together.

## Key Concepts

- **Image:** A read-only template with instructions for creating a container.
- **Container:** A runnable instance of an image.
- **Dockerfile:** A text file with instructions to build a Docker image.
- **Docker Hub:** A cloud-based registry for sharing Docker images.

## Useful Docker Commands

- **Check Docker version**
  ```
  docker --version
  ```

- **List running containers**
  ```
  docker ps
  ```

- **List all containers**
  ```
  docker ps -a
  ```

- **List images**
  ```
  docker images
  ```

- **Pull an image**
  ```
  docker pull <image-name>
  ```

- **Build an image from a Dockerfile**
  ```
  docker build -t <image-name> .
  ```

- **Run a container**
  ```
  docker run -it --name <container-name> <image-name>
  ```

- **Stop a container**
  ```
  docker stop <container-name>
  ```

- **Remove a container**
  ```
  docker rm <container-name>
  ```

- **Remove an image**
  ```
  docker rmi <image-name>
  ```

- **View container logs**
  ```
  docker logs <container-name>
  ```

- **Execute a command in a running container**
  ```
  docker exec -it <container-name> /bin/bash
  ```

## Networking Commands

- **List networks**
    ```
    docker network ls
    ```

- **Create a network**
    ```
    docker network create <network-name>
    ```

- **Connect a container to a network**
    ```
    docker network connect <network-name> <container-name>
    ```

- **Disconnect a container from a network**
    ```
    docker network disconnect <network-name> <container-name>
    ```

## Persistent Volumes

- **List volumes**
    ```
    docker volume ls
    ```

- **Create a volume**
    ```
    docker volume create <volume-name>
    ```

- **Use a volume with a container**
    ```
    docker run -v <volume-name>:/path/in/container <image-name>
    ```

- **Remove a volume**
    ```
    docker volume rm <volume-name>
    ```
