# Kubeadm

**Kubeadm** is a tool provided by Kubernetes to simplify the process of creating, configuring, and managing Kubernetes clusters. It automates the tasks required to bootstrap a minimum viable, secure, and production-ready cluster.

## Key Features

- Initializes and configures Kubernetes control plane components.
- Joins worker nodes to the cluster.
- Handles certificate generation and management.
- Supports cluster upgrades and configuration changes.
- Provides configuration files for repeatable, declarative cluster setups.

## Typical Workflow

### 1. Install Prerequisites

- Install container runtime (e.g., containerd, Docker).
- Install `kubeadm`, `kubelet`, and `kubectl` on all nodes.

```shell
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl
sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

### 2. Initialize the Control Plane

You can use default settings or provide a configuration file for custom setups.

#### Default Initialization

```shell
sudo kubeadm init --pod-network-cidr=10.244.0.0/16
```

#### Using a Configuration File

Create a file named `kubeadm-config.yaml`:

```yaml
apiVersion: kubeadm.k8s.io/v1beta3
kind: InitConfiguration
localAPIEndpoint:
  advertiseAddress: "192.168.1.100"
  bindPort: 6443
---
apiVersion: kubeadm.k8s.io/v1beta3
kind: ClusterConfiguration
kubernetesVersion: "1.29.0"
networking:
  podSubnet: "10.244.0.0/16"
  serviceSubnet: "10.96.0.0/12"
apiServer:
  extraArgs:
    authorization-mode: Node,RBAC
controllerManager: {}
scheduler: {}
---
apiVersion: kubeadm.k8s.io/v1beta3
kind: KubeletConfiguration
cgroupDriver: systemd
```

Initialize with:

```shell
sudo kubeadm init --config=kubeadm-config.yaml
```

### 3. Set Up kubectl Access

```shell
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

### 4. Install a Pod Network Add-on

Example with Flannel:

```shell
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

### 5. Join Worker Nodes

On each worker node, run the join command output by `kubeadm init`, e.g.:

```shell
sudo kubeadm join <control-plane-ip>:6443 --token <token> --discovery-token-ca-cert-hash sha256:<hash>
```

### 6. Cluster Management

#### Upgrade Cluster

```shell
sudo kubeadm upgrade plan
sudo kubeadm upgrade apply v1.29.0
```

#### Reset Cluster

```shell
sudo kubeadm reset
```

## Example kubeadm Configuration File

```yaml
apiVersion: kubeadm.k8s.io/v1beta3
kind: ClusterConfiguration
kubernetesVersion: "1.29.0"
controlPlaneEndpoint: "k8s.example.com:6443"
networking:
  podSubnet: "10.244.0.0/16"
  serviceSubnet: "10.96.0.0/12"
apiServer:
  extraArgs:
    feature-gates: "AllAlpha=true"
controllerManager: {}
scheduler: {}
dns:
  type: CoreDNS
```

## Useful Commands

- Check cluster status:  
  ```shell
  kubectl get nodes
  kubectl get pods -A
  ```
- View kubeadm config:  
  ```shell
  kubeadm config view
  ```
- Generate new join token:  
  ```shell
  kubeadm token create --print-join-command
  ```

## Further Reading

- [kubeadm Documentation](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/)
- [kubeadm Configuration Reference](https://kubernetes.io/docs/reference/config-api/kubeadm-config.v1beta3/)

