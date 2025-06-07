# Blue & Green Deployment

**Blue-Green Deployment** is a deployment pattern that reduces downtime and risk by running two identical production environments, called **blue** and **green**. At any given time, only one environment (blue or green) is live and serving production traffic.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*Tp58tyzgHLBSA_xp.png)

## How It Works

1. **Blue Environment:** The current production environment serving all user traffic.
2. **Green Environment:** The new version of the application is deployed here. It is kept isolated from users until it is fully tested and ready.
3. **Switch Over:** Once the green environment passes all tests, traffic is switched from blue to green—typically by updating a Kubernetes Service selector or changing DNS records.
4. **Rollback:** If issues are detected, you can quickly revert traffic back to the blue environment.

## Benefits

- **Zero Downtime:** Users experience no interruption during deployment.
- **Easy Rollback:** Quickly revert to the previous version if problems occur.
- **Safe Testing:** The new version can be tested in a production-like environment before going live.

## Considerations in Kubernetes

1. **Storage:**  
   If your application requires persistent storage, ensure both blue and green deployments use the same PersistentVolume (PV) or PersistentVolumeClaim (PVC). Otherwise, you may risk data loss or inconsistency during the switch.
2. **DNS and Service Switching:**  
   - If using a custom domain, update DNS records to point to the new environment.
   - In Kubernetes, you can update the `selector` field of a Service to point to the new deployment (green), instantly switching traffic.
3. **Testing:**  
   Before switching traffic, thoroughly test the green deployment. You can use a canary deployment to gradually shift traffic and monitor performance before a full cutover.
4. **Database Migrations:**  
   Blue-Green is not ideal for deployments requiring complex database schema changes, as data consistency between environments can be challenging.
5. **Stateful Applications:**  
   For stateful apps, synchronizing data between blue and green environments can be complex. Consider using rolling updates or canary deployments for such cases.

## Example: Blue-Green Deployment in Kubernetes

### 1. Deploy Blue and Green Environments

```yaml
# blue-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-blue
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
      version: blue
  template:
    metadata:
      labels:
        app: myapp
        version: blue
    spec:
      containers:
      - name: myapp
        image: myapp:1.0
---
# green-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-green
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
      version: green
  template:
    metadata:
      labels:
        app: myapp
        version: green
    spec:
      containers:
      - name: myapp
        image: myapp:2.0
```

### 2. Service Definition

```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp
    version: blue   # Change to 'green' to switch traffic
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
```

### 3. Switch Traffic

To switch from blue to green, update the Service selector:

```shell
kubectl patch service myapp-service -p '{"spec":{"selector":{"app":"myapp","version":"green"}}}'
```

### 4. Rollback

If issues are found, revert the selector back to blue:

```shell
kubectl patch service myapp-service -p '{"spec":{"selector":{"app":"myapp","version":"blue"}}}'
```

## When to Use Blue-Green Deployment

- When you need zero-downtime deployments.
- When rollback speed is critical.
- For stateless applications or those with minimal data migration needs.

## When to Consider Alternatives

- For stateful applications with complex data requirements.
- When database schema changes are involved.
- When gradual rollout and monitoring are preferred (consider canary or rolling updates).

## Further Reading

- [Kubernetes Blue-Green Deployments](https://kubernetes.io/blog/2018/04/30/zero-downtime-deployment-kubernetes-jenkins/)
- [Kubernetes Service Documentation](https://kubernetes.io/docs/concepts/services-networking/service/)
