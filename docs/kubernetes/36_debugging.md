# Debugging Pods in Kubernetes

Debugging is a critical skill for maintaining healthy Kubernetes clusters. Kubernetes provides several tools and techniques to help you diagnose and resolve issues with your pods and containers.

## 1. Using `kubectl debug`

The Kubernetes-native answer to debugging running containers is to use `kubectl debug`. This command spins up a new container into a running pod, allowing you to troubleshoot issues interactively.

- The debug container can run as a different user and from any image you choose.
- It shares system resources with other containers in the same pod, making it ideal for troubleshooting.

### Example Command

```shell
kubectl debug -it \
  --container=debug-container \
  --image=alpine \
  --target=postcont \
  postpod
```

## 2. Common Debugging Scenarios

- **Network issues:** Use tools like `curl`, `wget`, or `nslookup` inside the debug container.
- **File system inspection:** Mount the same volumes and inspect files.
- **Process inspection:** Use `ps`, `top`, or `htop` to view running processes.
- **Environment variables:** Check with `env` or `printenv`.
- **Resource limits:** Inspect with `ulimit` and check `/proc` for cgroup limits.

## 3. Other Useful Commands

- `kubectl describe pod <pod-name>`: Shows detailed information about the pod, including events.
- `kubectl logs <pod-name> [-c container-name]`: View logs for a specific container.
- `kubectl exec -it <pod-name> -- /bin/sh`: Get a shell inside a running container.
- `kubectl get events --sort-by=.metadata.creationTimestamp`: View recent events for troubleshooting.

## 4. Debugging Images

For advanced debugging, use images with extra troubleshooting tools (e.g., `nicolaka/netshoot`, `busybox`, or `alpine`).

```shell
kubectl debug -it <pod-name> --image=nicolaka/netshoot --target=<container-name>
```

- `nicolaka/netshoot` includes networking tools like `dig`, `tcpdump`, `iftop`, and more.
- `busybox` and `alpine` are lightweight and useful for basic inspection.

## 5. Best Practices

- Always use minimal and trusted images for debugging.
- Clean up debug containers after use.
- Use RBAC to restrict who can run debug containers.
- Document common troubleshooting steps for your team.

## 6. Visual Guide

> Add screenshots or diagrams to the `public/` directory and reference them here for a richer guide.

- ![Debugging Overview](../public/debugging-overview.png)
- ![kubectl debug example](../public/debug-kubectl-example.png)
- ![Pod inspection](../public/debug-pod-inspection.png)

## References & Links

- [K8S debugging](https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/)
- [Netshoot image](https://github.com/nicolaka/netshoot)

---

*Tip: Add your own screenshots to `public/` as `debugging-overview.png`, `debug-kubectl-example.png`, and `debug-pod-inspection.png` for richer documentation.*
