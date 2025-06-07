# Datacenters

Datacenters are specialized facilities that house large numbers of servers, storage systems, and networking equipment to support cloud computing, enterprise IT, and large-scale web services. Datacenter networking focuses on providing high bandwidth, low latency, scalability, and reliability to interconnect thousands of servers efficiently.

## Key Concepts in Datacenter Networking

- **High Bandwidth & Low Latency:** Datacenter networks are designed to handle massive amounts of data with minimal delay.
- **Scalability:** Networks must support rapid growth in the number of servers and virtual machines.
- **Redundancy & Reliability:** Multiple paths and failover mechanisms ensure continuous operation.
- **East-West Traffic:** Most traffic is between servers within the datacenter (east-west), not just in and out (north-south).

## Datacenter Network Topologies

- **Three-Tier Architecture:** Traditional model with Core, Aggregation, and Access layers.
- **Fat-Tree (Clos) Topology:** Provides high bisection bandwidth and multiple paths between servers, enabling scalability and fault tolerance.
- **Leaf-Spine Architecture:** Modern design with two layers—leaf switches connect to servers, spine switches interconnect all leaf switches, reducing bottlenecks.

## Datacenter TCP (DCTCP)

- **DCTCP** is a TCP variant optimized for datacenter environments.
- Uses Explicit Congestion Notification (ECN) to provide fine-grained feedback about congestion.
- Reduces queue buildup and latency, improving throughput and fairness for short and long flows.
- Widely adopted in large-scale datacenters like Microsoft Azure.

## Portland

- **Portland** is a scalable Layer 2 datacenter network fabric.
- Uses a hierarchical, location-aware addressing scheme to simplify routing and support VM mobility.
- Employs a fabric manager for address assignment and efficient forwarding.
- Designed to work with fat-tree topologies and support large-scale datacenter deployments.

## Software-Defined Networking (SDN) in Datacenters

- **SDN** separates the control plane from the data plane, enabling centralized management and programmability of the network.
- Controllers (e.g., OpenFlow, ONOS, OpenDaylight) manage network devices and policies.
- Enables rapid deployment of new services, automated network management, and fine-grained traffic engineering.
- Facilitates network virtualization and multi-tenancy.

## Other Datacenter Networking Technologies

- **VXLAN (Virtual Extensible LAN):** Overlays Layer 2 networks over Layer 3 infrastructure, enabling scalable network virtualization.
- **RDMA (Remote Direct Memory Access):** Enables high-throughput, low-latency networking for storage and compute clusters.
- **TRILL/SPB:** Protocols for scalable Layer 2 multipath forwarding.
- **Network Function Virtualization (NFV):** Virtualizes network services (firewalls, load balancers) to run on commodity hardware.

## Challenges in Datacenter Networking

- **Congestion Control:** Managing incast and outcast congestion, especially for bursty workloads.
- **Load Balancing:** Distributing traffic evenly across multiple paths and servers.
- **Fault Tolerance:** Rapid detection and recovery from failures.
- **Security:** Isolating tenants, preventing attacks, and ensuring compliance.

## Further Reading

- [DCTCP: Data Center TCP](https://www.microsoft.com/en-us/research/publication/data-center-tcp-dctcp/)
- [Portland: A Scalable Fault-Tolerant Layer 2 Data Center Network Fabric](https://www.usenix.org/legacy/event/sigcomm09/tech/full_papers/guo.pdf)
- [Software-Defined Networking (Open Networking Foundation)](https://opennetworking.org/sdn-definition/)
- [Fat-Tree Topology Explained](https://www.cs.princeton.edu/courses/archive/spr10/cos598C/lec/fat-tree.pdf)
- [Leaf-Spine Architecture](https://www.cisco.com/c/en/us/solutions/data-center-virtualization/leaf-spine.html)
