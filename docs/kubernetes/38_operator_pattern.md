# Operator Pattern

Operators are software extensions to Kubernetes that make use of custom resources to manage applications and their components.  
Operators follow Kubernetes principles, notably the control loop.

The Operator pattern consists of two major components:

- **Custom Resource (CR):**  
  A CR is a Kubernetes API object similar to built-in resources like Pod, Deployment, and Service, but its schema is defined by users. A CR has `spec` and `status` sections and is managed by Kubernetes so users can create, read, update, and delete (CRUD) it via Kubernetes APIs. The `spec` section describes the desired state of the application, while the `status` section reflects the current state. For example, a CR might have a field like `replicasPerRegion` to specify how many instances of an app should run in each region.

- **Control Loop (Controller):**  
  The control loop is a program (often called a controller) that watches for changes to CRs and other resources, compares the current state to the desired state, and takes action to reconcile any differences. This loop updates the `status` field of the CR to reflect progress or errors. The control loop embodies the "reconcile loop" pattern fundamental to Kubernetes.

Any program that follows this pattern is a Kubernetes Operator. You might also have heard of the Operator SDK, which is a framework to help build Operators, but it is not required—Operators can be written in any language using the Kubernetes API.

## Why Use Operators?

Operators automate complex, application-specific tasks that go beyond what built-in Kubernetes controllers provide. Examples include:

- Managing database clusters (e.g., backups, failover, scaling)
- Upgrading applications with custom logic
- Handling application-specific configuration and secrets
- Automating recovery from failures

## Operator Lifecycle

1. **Define a Custom Resource Definition (CRD):**  
   Extend the Kubernetes API by defining a new resource type.

2. **Implement the Controller:**  
   Write a program that watches for changes to the CR and other resources, and reconciles the actual state to match the desired state.

3. **Deploy the Operator:**  
   Run the controller as a Deployment in your cluster.

4. **Create and Manage CRs:**  
   Users create CRs to describe the desired state of their application. The Operator ensures the cluster matches this state.

## Example: Simple Custom Resource

```yaml
apiVersion: "cache.example.com/v1"
kind: "Memcached"
metadata:
  name: "example-memcached"
spec:
  size: 3
```

The Operator would watch for `Memcached` resources and ensure a Deployment with 3 replicas exists.

## Popular Operators

- **Prometheus Operator:** Manages Prometheus monitoring instances.
- **Cert-Manager:** Automates management and issuance of TLS certificates.
- **MongoDB, MySQL, and PostgreSQL Operators:** Manage database clusters.
- **ElasticSearch Operator:** Manages ElasticSearch clusters.

## Further Reading

- [Kubernetes Operators Concepts](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/)
- [Operator SDK Documentation](https://sdk.operatorframework.io/docs/)
- [Awesome Kubernetes Operators](https://github.com/operator-framework/awesome-operators)
