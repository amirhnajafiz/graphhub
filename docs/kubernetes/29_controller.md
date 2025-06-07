# Kube Controller Manager

The **Kube Controller Manager** runs controller processes that regulate the state of the Kubernetes cluster. A controller is a control loop that watches the state of the cluster through the API server and makes or requests changes as needed to move the current state toward the desired state.

Controllers are responsible for responding to cluster events, ensuring resources match their specifications, and handling failures or changes automatically. All core controllers are packaged and run together as a single process: the Kube Controller Manager.

## Responsibilities

- Monitors the cluster state via the API server.
- Ensures the desired state of resources matches the actual state.
- Handles failures, scaling, and replication.
- Automates routine tasks (e.g., creating pods, managing endpoints).

## Common Controllers

- **Node Controller:** Monitors node health and manages node lifecycle.
- **Pod Controller:** Ensures the correct number of pods are running.
- **Service Controller:** Manages service endpoints.
- **Replication Controller:** Ensures the specified number of pod replicas are running.
- **Deployment Controller:** Manages deployments and rolling updates.
- **Namespace Controller:** Manages the lifecycle of namespaces.
- **Endpoint Controller:** Populates endpoint objects for services.

## How It Works

Each controller watches the cluster state through the API server. When it detects a difference between the desired and actual state, it takes action to reconcile them. For example, if a node goes down, the Node Controller will mark it as unavailable and trigger pod rescheduling.

## Further Reading

- [Kube Controller Manager Documentation](https://kubernetes.io/docs/concepts/architecture/controller/)
- [Kubernetes Controllers](https://kubernetes.io/docs/concepts/architecture/controller/#kubernetes-controllers)
