# Docker and containerd Configuration

## Docker Configuration

Docker can be configured using the `daemon.json` file, command-line flags, and environment variables.

### Main Configuration File

- **Location:**  
  - Linux: `/etc/docker/daemon.json`  
  - macOS: `~/Library/Group Containers/group.com.docker/settings.json` (for Docker Desktop)

### Example `daemon.json`

```json
{
  "data-root": "/var/lib/docker",
  "log-level": "info",
  "storage-driver": "overlay2",
  "insecure-registries": ["myregistry.local:5000"],
  "registry-mirrors": ["https://mirror.gcr.io"]
}
```

### Common Configuration Options

- `data-root`: Directory where Docker stores images, containers, and volumes.
- `log-level`: Logging level (`debug`, `info`, `warn`, `error`, `fatal`).
- `storage-driver`: Filesystem driver (e.g., `overlay2`, `aufs`).
- `insecure-registries`: List of registries Docker should treat as insecure.
- `registry-mirrors`: List of registry mirrors to use for image pulls.

### Reloading Docker Configuration

After changing `daemon.json`, restart Docker:

```sh
sudo systemctl restart docker
```
Or, for Docker Desktop, restart the application.

---

## containerd Configuration

containerd is configured using the `config.toml` file.

### Main Configuration File

- **Location:**  
  - `/etc/containerd/config.toml`

### Generate Default Config

To generate a default configuration file:

```sh
containerd config default > /etc/containerd/config.toml
```

### Example `config.toml`

```toml
[plugins."io.containerd.grpc.v1.cri".containerd]
  snapshotter = "overlayfs"

[plugins."io.containerd.grpc.v1.cri".registry]
  [plugins."io.containerd.grpc.v1.cri".registry.mirrors]
    [plugins."io.containerd.grpc.v1.cri".registry.mirrors."docker.io"]
      endpoint = ["https://mirror.gcr.io"]
```

### Common Configuration Options

- `snapshotter`: Filesystem snapshotter to use (e.g., `overlayfs`).
- `registry.mirrors`: Configure registry mirrors for pulling images.
- `plugins`: Plugin-specific configuration, such as CRI for Kubernetes integration.

### Reloading containerd Configuration

After editing `config.toml`, restart containerd:

```sh
sudo systemctl restart containerd
```

---

## References

-