# Kube Proxy

**Kube Proxy** is a network component that runs on every node in a Kubernetes cluster. It maintains network rules on nodes, enabling communication to your services and pods from inside or outside the cluster.

Every pod can access another pod by using an internal virtual network. Traffic is forwarded to backend applications based on service definitions. A Kubernetes Service is an abstraction that defines a logical set of pods and a policy by which to access them.

Kube Proxy watches the API server for new or updated services and endpoints, and creates or updates rules to direct traffic accordingly. It uses operating system packet filtering (like `iptables` or `ipvs`) to handle traffic routing.

## Responsibilities

- Watches for new or updated services and endpoints via the API server.
- Maintains network rules on each node to route traffic to the correct backend pods.
- Supports different proxy modes for handling traffic (iptables, ipvs, userspace).
- Enables load balancing for service traffic.

## Proxy Modes

Kube Proxy supports several modes for handling network traffic:

- **iptables (default):** Uses Linux `iptables` rules to direct traffic to backend pods. Efficient and widely used.
- **ipvs:** Uses Linux IP Virtual Server (IPVS) for load balancing. Offers better performance and scalability than iptables.
- **userspace:** An older mode where Kube Proxy itself proxies the traffic. Less efficient and rarely used in modern clusters.

You can specify the proxy mode with the `--proxy-mode` flag:

```shell
kube-proxy --proxy-mode=ipvs
```

## Example Kube Proxy Configuration

A typical `kube-proxy` configuration file (`kube-proxy-config.yaml`):

```yaml
apiVersion: kubeproxy.config.k8s.io/v1alpha1
kind: KubeProxyConfiguration
mode: "ipvs"
clusterCIDR: "10.244.0.0/16"
metricsBindAddress: "0.0.0.0:10249"
hostnameOverride: ""
clientConnection:
  kubeconfig: "/var/lib/kube-proxy/kubeconfig"
```

To start kube-proxy with a configuration file:

```shell
kube-proxy --config=/etc/kubernetes/kube-proxy-config.yaml
```

## How It Works

1. **Service Creation:** When a Service is created, kube-proxy sets up rules to capture traffic to the Service’s cluster IP.
2. **Endpoint Updates:** As pods are added or removed, kube-proxy updates the rules to ensure traffic is routed only to healthy pods.
3. **Traffic Forwarding:** Incoming traffic to a Service is load balanced and forwarded to one of the backend pods.

## Key Features

- Supports TCP, UDP, and SCTP protocols.
- Provides round-robin load balancing by default.
- Integrates with cloud provider load balancers for external access.
- Automatically updates rules as services and endpoints change.

## Further Reading

- [Kube Proxy Documentation](https://kubernetes.io/docs/concepts/services-networking/service/#kube-proxy)
- [Kube Proxy Modes](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/)
