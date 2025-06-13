# Containers

## What is a Container?

A container is a lightweight, standalone, and executable package that includes everything needed to run a piece of software: code, runtime, system tools, libraries, and settings. Containers ensure that applications run consistently across different computing environments.

## How Containers Work

- **Isolation:** Containers use operating system features (like namespaces and cgroups in Linux) to isolate processes and resources from each other.
- **Images:** Containers are created from images, which are read-only templates that define the container’s contents.
- **Portability:** Since containers include all dependencies, they can run on any system with a compatible container runtime (like Docker or containerd).
- **Efficiency:** Containers share the host OS kernel, making them more lightweight and faster to start than virtual machines.

## Components

- **Namespaces (NS):** Provide process and resource isolation by partitioning kernel resources so that one set of processes sees one set of resources, while another set sees a different set.
- **Control Groups (cgroups):** Allow the allocation and limitation of resources (CPU, memory, disk I/O, etc.) among groups of processes, ensuring containers do not interfere with each other.
- **OverlayFS:** A union filesystem that enables efficient layering of images, allowing containers to share common files while maintaining their own changes in a separate layer.

## Common Container Tools

- **Docker:** The most popular container platform for building, running, and managing containers.
- **Podman:** A daemonless container engine for developing, managing, and running OCI Containers.
- **Kubernetes:** An orchestration platform for managing large numbers of containers in production.

## Typical Use Cases

- Microservices architecture
- Application deployment and scaling
- Continuous integration and delivery (CI/CD)
- Testing and development environments

*For more details, see [the official Docker documentation](https://docs.docker.com/get-started/overview/).
