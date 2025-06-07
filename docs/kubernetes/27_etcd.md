# ETCD

etcd is a distributed, reliable key-value store that is simple, secure, and fast. It is designed for fast reads and writes, and provides strong consistency using the RAFT consensus algorithm.

## Features

- Distributed and highly available
- Strong consistency and reliability
- Secure communication with TLS
- Watch support for real-time updates
- Snapshots and backup/restore capabilities

## Running etcd

etcd typically listens on port `2379` for client requests and `2380` for peer communication. You can interact with etcd using the `etcd` server and the `etcdctl` command-line tool.

### Example Commands

```shell
./etcdctl put key1 value1
./etcdctl get key1
./etcdctl del key1
./etcdctl watch key1
```

## etcd in Kubernetes

etcd is the primary data store for Kubernetes. It stores all cluster state and configuration, including:

- Nodes, Pods, Deployments
- ConfigMaps and Secrets
- Service Accounts, Roles, and RoleBindings
- PersistentVolumeClaims and StorageClasses
- All API objects and their state

Every change to the Kubernetes cluster is recorded in etcd, making it critical for cluster reliability and disaster recovery.

## Deployment

A typical etcd deployment in production is a cluster of 3, 5, or 7 nodes for high availability. Each member communicates with others using secure peer URLs.

### Example `etcd.service` Configuration

```shell
[Service]
ExecStart=/usr/local/bin/etcd \\
  --name controller-0 \\
  --cert-file=/etc/etcd/etcd-server.crt \\
  --key-file=/etc/etcd/etcd-server.key \\
  --peer-cert-file=/etc/etcd/etcd-server.crt \\
  --peer-key-file=/etc/etcd/etcd-server.key \\
  --trusted-ca-file=/etc/etcd/ca.crt \\
  --peer-trusted-ca-file=/etc/etcd/ca.crt \\
  --initial-advertise-peer-urls https://${INTERNAL_IP}:2380 \\
  --listen-peer-urls https://${INTERNAL_IP}:2380 \\
  --listen-client-urls https://${INTERNAL_IP}:2379,https://127.0.0.1:2379 \\
  --advertise-client-urls https://${INTERNAL_IP}:2379 \\
  --initial-cluster controller-0=https://${CONTROLLER0_IP}:2380,controller-1=https://${CONTROLLER1_IP}:2380 \\
  --initial-cluster-state new \\
  --data-dir=/var/lib/etcd
```

## Backup and Restore

Regular backups are essential for disaster recovery.

```shell
# Backup
./etcdctl snapshot save backup.db

# Restore
./etcdctl snapshot restore backup.db --data-dir /var/lib/etcd-restored
```

## Security Best Practices

- Always enable TLS for client and peer communication.
- Restrict access to etcd endpoints.
- Regularly back up etcd data.
- Monitor etcd health and cluster status.

## Further Reading

- [etcd Documentation](https://etcd.io/docs/)
- [Kubernetes etcd Cluster Administration](https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/)
- [etcd Operator](https://github.com/etcd-io/etcd-operator)
