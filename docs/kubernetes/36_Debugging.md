# Debugging Pods

The Kubernetes-native answer to debugging running containers is to use `kubectl debug`.  
The `debug` command spins up a new container into a running pod.  
This new container can run as a different user and from any image you choose.  
Because the debug container runs within the same pod as the container it targets (and therefore on the same node),  
the isolation between both containers does not need to be absolute.  
The debug container can share system resources with other containers running in the same pod.

## Common Debug Images

- **alpine:** Lightweight, basic shell and tools.
- **busybox:** Minimal, but includes many common Unix utilities.
- **nicolaka/netshoot:** Networking troubleshooting tools (ping, dig, traceroute, etc).
- **ubuntu:** Full-featured, useful for more advanced debugging.
- **praqma/network-multitool:** All-in-one networking toolbox.

## Example Commands

### Attach a debug container to a running pod

```shell
kubectl debug -it \
  --container=debug-container \
  --image=alpine \
  --target=postcont \
  postpod
```

### Use netshoot for advanced network debugging

```shell
kubectl debug -it \
  --image=nicolaka/netshoot \
  --target=myapp-container \
  myapp-pod
```

### Debug a pod by creating a copy with a different image

```shell
kubectl debug mypod -it --image=ubuntu --copy-to=mypod-debug
```

### Start a shell in a running container

```shell
kubectl exec -it mypod -- /bin/sh
```

## Useful Links

- [K8S debugging](https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/)
- [Netshoot DockerHub](https://hub.docker.com/r/nicolaka/netshoot)
- [Debugging with kubectl debug](https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/#ephemeral-container)
