# Kubernetes Networking

Kubernetes (sometimes referred to as K8s) is an open-source platform that is used to manage and automate the deployment, scheduling, monitoring, maintenance, and operation of application containers across a cluster of machines.

Developed by Google, networking with Kubernetes allows administrators to move workloads across private, public, and hybrid cloud infrastructures. Developers use Kubernetes to package software applications with their required infrastructure and deploy new versions quickly.

Kubernetes networking allows Kubernetes components to communicate with each other and with other applications. The Kubernetes platform is different from other networking platforms because it is based on a flat network structure that eliminates the need to map host ports to container ports. The Kubernetes platform provides a way to run distributed systems, sharing machines between applications without dynamically allocating ports.

## How does networking work in Kubernetes?

The different components in the Kubernetes platform (Pods, containers, nodes, applications) use different networking methods to communicate. There is container-to-container communication, Pod-to-Pod communication, Pod-to-service communication, and external-to-service communication.

Pod-to-Pod communication is the foundation of Kubernetes. Pods communicate with each other following network policies set by the network plugin, communicating with other Pods without explicitly creating links between them or mapping container ports to host ports. Because Pods share the same network namespace and have their own IP addresses, they can find and communicate with all other Pods on all nodes using localhost, without using network address translation (NAT).

One of the challenges of Kubernetes networking is addressing how internal (east-west) traffic and external (north-south) traffic interact, because the internal network is isolated from the external network. However, traffic that flows between nodes can also flow to and from nodes and an external physical or virtual machine. There are a few different ways of getting external traffic into a Kubernetes cluster:

- LoadBalancer: LoadBalancer is the standard way to connect a service externally to the internet. In this scenario, a network load balancer forwards all external traffic to a service. Each service gets its own IP address.
- ClusterIP: ClusterIP is the default Kubernetes service for internal communications. However, external traffic can access the default Kubernetes ClusterIP service through a proxy. This can be useful for debugging services or displaying internal dashboards.
- NodePort: NodePort opens ports on the nodes or virtual machines, and traffic is forwarded from the ports to the service. It is most often used for services that don’t always have to be available, such as demo applications.
- Ingress: Ingress acts as a router or controller to route traffic to services via a load balancer. It is useful if you want to use the same IP address to expose multiple services.

One more important aspect of Kubernetes networking is the Container Networking Interface, or CNI. The CNI connects Pods across nodes, acting as an interface between a network namespace and a network plug-in or a network provider and a Kubernetes network. There are many different CNI providers and plug-ins to choose from with different sets of features and functionality. CNI plug-ins have the ability to dynamically configure a network and resources as Pods are provisioned and destroyed. They provision and manage IP addresses as containers are created and deleted. Kubernetes is the default networking provider for Kubernetes, but CNI plug-ins such as Flannel, Calico, Canal, and Weave Net offer additional features.

## How to implement?

Network administrators can implement the Kubernetes networking model in a wide variety of different ways. Gartner recognized the following Kubernetes networking examples as “Visionary” in its 2019 Magic Quadrant for Data Center Networking report:

- Big Switch Networks’ Big Cloud Fabric: A cloud-native networking architecture that runs Kubernetes in private cloud environments.
- Cumulus NetQ: A telemetry-based fabric validation system that provides visibility into container deployments.
- Dell EMC: A cloud platform that supports both traditional applications and cloud-native environments with integrated support for Kubernetes and containers.
- VMware NSX-T: Network virtualization and security platform that virtualizes networks for multi-cloud or multi-hypervisor environments, including native container networking.
