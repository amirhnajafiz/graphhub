# containerd

containerd is an industry-standard container runtime that manages the complete container lifecycle on a host system. It is designed to be embedded into a larger system, such as Docker or Kubernetes, and provides core container management capabilities.

## Key Concepts

- **Container Runtime:** The low-level software responsible for running containers.
- **Snapshotter:** Manages the filesystem snapshots used by containers.
- **Namespaces:** Isolate resources and workloads within containerd.
- **CRI (Container Runtime Interface):** Allows Kubernetes to interact with containerd.

## Useful containerd Commands

- **Check containerd version**
  ```
  containerd --version
  ```

- **List running containers**
  ```
  ctr -n <namespace> containers list
  ```

- **List all images**
  ```
  ctr -n <namespace> images list
  ```

- **Pull an image**
  ```
  ctr -n <namespace> images pull <image-name>
  ```

- **Run a container**
  ```
  ctr -n <namespace> run -t <image-name> <container-id>
  ```

- **Start a container**
  ```
  ctr -n <namespace> tasks start <container-id>
  ```

- **Stop a container**
  ```
  ctr -n <namespace> tasks kill <container-id>
  ```

- **Remove a container**
  ```
  ctr -n <namespace> containers delete <container-id>
  ```

- **Remove an image**
  ```
  ctr -n <namespace> images remove <image-name>
  ```

- **View container logs**
  ```
  ctr -n <namespace> tasks logs <container-id>
  ```

## Namespaces

containerd uses namespaces to isolate groups of containers and images. The default namespace is usually `default`, but you can specify others as
