# Kube Scheduler

The **Kube Scheduler** is a core component of the Kubernetes control plane responsible for assigning newly created pods to nodes in the cluster. It ensures that workloads are placed on nodes that meet their resource and scheduling requirements.

## Responsibilities

- Watches for unscheduled pods via the API server.
- Selects an appropriate node for each pod based on resource requirements, constraints, and policies.
- Considers factors such as CPU, memory, affinity/anti-affinity rules, taints and tolerations, and custom scheduling policies.
- Ensures balanced resource utilization across the cluster.

## How It Works

1. **Pod Creation:** When a new pod is created without a node assignment, it is detected by the scheduler.
2. **Filtering:** The scheduler filters out nodes that do not meet the pod’s requirements (e.g., insufficient resources, taints).
3. **Scoring:** Remaining nodes are scored based on criteria like resource availability, affinity rules, and custom priorities.
4. **Binding:** The scheduler selects the best node and updates the pod’s specification to bind it to that node.

## Example Scheduling Criteria

- **Resource Requests and Limits:** Ensures the node has enough CPU and memory.
- **Node Selectors and Affinity:** Schedules pods based on labels or affinity/anti-affinity rules.
- **Taints and Tolerations:** Prevents pods from being scheduled on unsuitable nodes.
- **Pod Topology Spread Constraints:** Distributes pods for high availability.

## Custom Schedulers

Kubernetes supports running multiple schedulers. You can implement and deploy custom schedulers for specialized scheduling needs.

## Further Reading

- [Kube Scheduler Documentation](https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/)
- [Scheduling Pods](https://kubernetes.io/docs/concepts/scheduling-eviction/)
