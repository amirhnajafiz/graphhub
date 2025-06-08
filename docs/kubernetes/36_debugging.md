# Debugging Pods

Debugging is a crucial part of working with Kubernetes. When applications misbehave, you need effective tools and strategies to diagnose and resolve issues. Kubernetes provides several native mechanisms for debugging running containers and pods.

![Debugging Overview](../images/k8s-debug-overview.png)

## Introduction to Pod Debugging

Pods may fail to start, crash repeatedly, or behave unexpectedly due to misconfigurations, resource limits, or application bugs. Kubernetes offers built-in commands and patterns to help you investigate and fix these problems.

## Using `kubectl debug`

The Kubernetes-native answer to debugging running containers is to use `kubectl debug`. This command spins up a new container into a running pod. The debug container can run as a different user and from any image you choose. Because the debug container runs within the same pod as the container it targets (and therefore on the same node), the isolation between both containers does not need to be absolute. The debug container can share system resources with other containers running in the same pod.

### Example: Attaching a Debug Container

```shell
kubectl debug -it \
  --container=debug-container \
  --image=alpine \
  --target=postcont \
  postpod
```

![Attach Debug Container](../images/k8s-debug-attach.png)

- `--container`: Name for the debug container.
- `--image`: Image to use for the debug container (e.g., `alpine`, `busybox`).
- `--target`: The name of the existing container to target.
- `postpod`: The name of the pod to debug.

### Example: Debugging a Stuck Pod

If a pod is stuck in `CrashLoopBackOff`, you can start a debug session with a different entrypoint:

```shell
kubectl debug <pod-name> -it --image=busybox --share-processes -- bash
```

This allows you to inspect the pod's filesystem and environment without triggering the original entrypoint.

## Common Debugging Scenarios

### 1. Investigating CrashLoopBackOff
- Check logs: `kubectl logs <pod-name>`
- Describe pod: `kubectl describe pod <pod-name>`
- Use `kubectl debug` to inspect the pod's state

### 2. Debugging Network Issues
- Use a debug container with networking tools (e.g., `nicolaka/netshoot`):

```shell
kubectl debug <pod-name> -it --image=nicolaka/netshoot -- bash
```

- Test connectivity with `ping`, `curl`, or `nslookup`.

![Network Debugging](../images/k8s-debug-network.png)

### 3. Examining Environment Variables and Filesystem
- Use `env` or `printenv` to list environment variables.
- Use `ls`, `cat`, or `less` to inspect files and directories.

## Additional Debugging Tools
- `kubectl exec`: Run commands in a running container.
- `kubectl port-forward`: Forward a local port to a pod for debugging services.
- `kubectl describe`: Get detailed information about pods and other resources.

## links

- [K8S debugging](https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/)
- [Debugging Pods and Replication Controllers](https://kubernetes.io/docs/tasks/debug/debug-cluster/)
- [kubectl debug documentation](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#debug)

---

> **Note:** The images referenced above (e.g., `k8s-debug-overview.png`, `k8s-debug-attach.png`, `k8s-debug-network.png`) are placeholders. Add your own screenshots or diagrams to the `docs/images/` directory for a richer guide.
