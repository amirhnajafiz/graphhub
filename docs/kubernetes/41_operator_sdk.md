# Operator SDK

The **Operator SDK** is a framework for building Kubernetes Operators. It provides tools, libraries, and code generation to help you develop, test, package, and deploy Operators using Go, Ansible, or Helm.

## Key Concepts

- **Operator:** A controller that manages a custom resource and automates application lifecycle tasks.
- **Custom Resource Definition (CRD):** Extends the Kubernetes API with new resource types.
- **Controller:** Watches for changes to resources and reconciles actual state to desired state.

---

## Getting Started

### 1. Install Operator SDK

```shell
brew install operator-sdk
# or see https://sdk.operatorframework.io/docs/installation/
```

### 2. Initialize a New Operator Project

```shell
operator-sdk init --domain=example.com --repo=github.com/example/memcached-operator
```
- `--domain`: The API group domain (e.g., `cache.example.com`).
- `--repo`: The Go module path for your project.

### 3. Create an API and Controller

```shell
operator-sdk create api --group=cache --version=v1 --kind=Memcached --resource --controller
```
- This generates CRD manifests, API types, and a controller scaffold.

### 4. Implement Reconcile Logic

Edit the generated controller code (in `controllers/`) to define how your Operator manages resources.

### 5. Build and Run Locally

```shell
make install   # Install CRDs into the cluster
make run       # Run the operator locally (uses your kubeconfig)
```

### 6. Deploy to Cluster

Build and push your Operator image:

```shell
make docker-build docker-push IMG=<your-registry>/memcached-operator:tag
```

Deploy to the cluster:

```shell
make deploy IMG=<your-registry>/memcached-operator:tag
```

---

## Operator Lifecycle Management (OLM), Bundles, and Catalogs

### Bundles

A **bundle** is a packaging format for Operators. It contains manifests for the Operator, CRDs, RBAC, and metadata.

- Generate a bundle:
  ```shell
  make bundle
  ```
- Validate the bundle:
  ```shell
  operator-sdk bundle validate ./bundle
  ```

### Catalogs

A **catalog** is a collection of Operator bundles, used by OLM to manage Operator installation and upgrades.

- Build a catalog image:
  ```shell
  opm index add --bundles <bundle-image> --tag <catalog-image>
  ```
- Push the catalog image to a registry.

### Deploying with OLM

- Install OLM in your cluster:  
  [OLM installation guide](https://olm.operatorframework.io/docs/getting-started/)
- Deploy your Operator from a catalog using OLM.

---

## Managing ClusterServiceVersions (CSVs) and Upgrading Operators

### What is a CSV?

A **ClusterServiceVersion (CSV)** is a YAML manifest used by OLM to describe an Operator, its version, permissions, install strategy, and owned CRDs. OLM uses CSVs to manage Operator installation, upgrades, and lifecycle.

### Upgrade Workflow

1. **Update the Catalog:**  
   Build and push a new bundle and update your catalog image with the new bundle version.
2. **OLM Detects New Version:**  
   OLM watches the catalog for new CSVs. When a new version is available, OLM creates a new InstallPlan.
3. **InstallPlan Execution:**  
   The InstallPlan creates or updates resources (Deployments, CRDs, RBAC, etc.) as defined in the new CSV.
4. **CSV Status:**  
   The new CSV transitions through phases: `Pending` → `InstallReady` → `Installing` → `Succeeded`.
5. **Operator Pod Update:**  
   The Operator Deployment is updated, and new pods are rolled out.

### Useful kubectl Commands

- **List CSVs in a namespace:**
  ```shell
  kubectl get csv -n <namespace>
  ```
- **Describe a CSV (see status, conditions, errors):**
  ```shell
  kubectl describe csv <csv-name> -n <namespace>
  ```
- **List InstallPlans:**
  ```shell
  kubectl get installplan -n <namespace>
  ```
- **Describe an InstallPlan:**
  ```shell
  kubectl describe installplan <installplan-name> -n <namespace>
  ```
- **List Subscriptions (controls upgrade channel):**
  ```shell
  kubectl get subscription -n <namespace>
  ```
- **Describe a Subscription:**
  ```shell
  kubectl describe subscription <subscription-name> -n <namespace>
  ```

### Events and Workflow

- **Subscription** triggers OLM to check the catalog for updates.
- **InstallPlan** is created for new CSVs.
- **CSV** is installed and transitions through phases.
- **Deployment** for the Operator is updated.
- **Pods** are rolled out for the new Operator version.

### Debugging and Troubleshooting

- **Check CSV status:**  
  Look for errors or failed phases in the CSV.
- **Check InstallPlan:**  
  Ensure all steps completed successfully.
- **Check Operator Pod logs:**  
  ```shell
  kubectl get pods -n <namespace> -l name=<operator-name>
  kubectl logs <pod-name> -n <namespace>
  ```
- **Check OLM and Operator Lifecycle Manager pods:**  
  OLM runs in the `olm` namespace:
  ```shell
  kubectl get pods -n olm
  kubectl logs <olm-pod> -n olm
  ```
- **Check Events:**  
  ```shell
  kubectl get events -n <namespace>
  ```

### Typical Pods to Check

- **Operator Pod:**  
  The main pod running your Operator logic.
- **OLM Pods:**  
  `olm-operator`, `catalog-operator`, `operator-lifecycle-manager`, etc. in the `olm` namespace.
- **Catalog Source Pod:**  
  If using a custom catalog, check the pod serving your catalog image.

---

## Common Kubernetes Objects Used

- **CustomResourceDefinition (CRD):** Defines new resource types.
- **Deployment:** Runs the Operator controller.
- **ServiceAccount, Role, RoleBinding:** RBAC for Operator permissions.
- **ClusterServiceVersion (CSV):** OLM metadata for Operator versioning.
- **Subscription:** Tells OLM to install/upgrade an Operator.
- **InstallPlan:** OLM's plan for installing/upgrading Operators.

---

## Useful Commands

```shell
operator-sdk init ...
operator-sdk create api ...
operator-sdk run bundle <bundle-image>
operator-sdk bundle validate ./bundle
opm index add --bundles <bundle-image> --tag <catalog-image>
kubectl get crd
kubectl get csv -n <namespace>
kubectl get subscription -n <namespace>
```

---

## References

- [Operator SDK Documentation](https://sdk.operatorframework.io/docs/)
- [OLM Documentation](https://olm.operatorframework.io/docs/)
- [OperatorHub.io](https://operatorhub.io/)
