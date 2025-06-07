# Container Networking

A container network is a form of virtualization similar to virtual machines (VM) in concept but with distinguishing differences. Primarily, the container method is a form of operating system virtualization as compared to VMs, which are a form of hardware virtualization.

Each virtual machine running on a hypervisor has their own operating system, applications, and libraries, and are able to encapsulate persistent data, install a new OS, use a different filesystem than the host, or use a different kernel version.

Conversely, containers are a “running instance” of an image, ephemeral operating system virtualization that spins up to perform some tasks then is deleted and forgotten. Because of the ephemeral nature of containers, system users run many more instances of containers than compared to virtual machines requiring a larger address space.

To create isolation, a container relies on two Linux Kernel features: namespace and cgroups. To give the container its own view of the system isolating it from other resources, a namespace is created for each of the resources and unshared from the remaining system. Control groups (Cgroups) are then used to monitor and limit system resources like CPU, memory, disk I/O, network, etc.

## Types

There are five types of container networking used today; their characteristics center around IP-per-container versus IP-per-pod models and the requirement of network address translation (NAT) versus no translation required.

- None: The container receives a network stack; however, it lacks an external connection. This mode is useful for testing containers, staging a container for a later network connection, and assigning to containers not requiring external communications.
- Bridge: Containers that are bridged on an internal host network and allowed to communicate with other containers on the same host. Containers cannot be accessed from outside the host. Bridge network is the default for Docker containers.
- Host: This configuration allows a created container to share the host’s network namespace, granting the container access to all the host’s network interfaces. The least complex of the external networking configurations, this type is prone to port conflicts due to the shared use of the networking interfaces.
- Underlay: Underlays open the host interfaces directly to containers running on the host and remove the need for port-mapping, making them more efficient than bridges.
- Overlay: Overlays use networking tunnels to communicate across hosts, allowing containers to act like they are on the same machine when they are hosted on different hosts.

