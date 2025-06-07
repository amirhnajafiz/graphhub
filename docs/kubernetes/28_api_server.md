# Kube API Server

The **Kube API Server** is the central management component of a Kubernetes cluster. All communication—whether from users, automation, or internal cluster components—passes through the API server.

## Responsibilities

- Serves as the front-end for the Kubernetes control plane.
- Handles all REST operations for creating, reading, updating, and deleting (CRUD) Kubernetes resources.
- Authenticates and authorizes API requests.
- Validates and processes resource definitions.
- Persists cluster state to etcd.
- Notifies controllers (like the scheduler and kubelet) of changes in cluster state.

## How It Works

1. **Receives Requests:** All `kubectl` commands and API calls are sent to the API server.
2. **Authentication & Authorization:** Verifies the identity and permissions of the requester.
3. **Validation:** Checks the request for correctness and compliance with the Kubernetes API schema.
4. **Persistence:** Updates or retrieves data from etcd, the cluster's backing store.
5. **Notification:** Notifies other control plane components (e.g., scheduler, controllers, kubelets) of changes.

## Example

```shell
kubectl get pods
```
This command sends a request to the API server, which authenticates the user, retrieves the list of pods from etcd, and returns the result.

## Key Features

- RESTful API interface (JSON over HTTP)
- Extensible via Custom Resource Definitions (CRDs) and API aggregation
- Supports admission controllers for policy enforcement
- Secure communication via TLS

## Further Reading

- [Kubernetes API Server Documentation](https://kubernetes.io/docs/concepts/overview/components/#kube-apiserver)
- [API Access Control](https://kubernetes.io/docs/reference/access-authn-authz/)
