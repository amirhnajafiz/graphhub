# Congestion Controls

Congestion control refers to techniques and mechanisms used to prevent network congestion and to recover from it when it occurs. Effective congestion control ensures efficient use of network resources and maintains good performance for all users.

## Why Congestion Control is Needed

Without congestion control, excessive data transmission can overwhelm network devices, leading to packet loss, high latency, and reduced throughput. Congestion control helps maintain network stability and fairness.

## Common Congestion Control Algorithms

### 1. **TCP Congestion Control**

TCP uses several algorithms to detect and respond to congestion:

- **Slow Start:**  
  Begins transmission with a small congestion window and increases it exponentially until the first loss or threshold is reached.

- **Congestion Avoidance:**  
  Increases the congestion window linearly to probe for available bandwidth.

- **Fast Retransmit and Fast Recovery:**  
  Quickly retransmits lost packets and reduces the congestion window to recover from packet loss without returning to slow start.

### 2. **Active Queue Management (AQM)**

Routers and switches can use AQM techniques to manage congestion:

- **Random Early Detection (RED):**  
  Proactively drops packets before buffers are full to signal senders to slow down.

- **Explicit Congestion Notification (ECN):**  
  Marks packets instead of dropping them to indicate congestion.

### 3. **Traffic Shaping and Policing**

- **Leaky Bucket and Token Bucket:**  
  Control the rate at which packets are sent into the network, smoothing out bursts and preventing congestion.

### 4. **Quality of Service (QoS)**

- **Prioritization:**  
  Assigns higher priority to critical traffic, ensuring important data is delivered even during congestion.

## Modern Congestion Control Algorithms

- **CUBIC:** Default in Linux, optimized for high-speed networks.
- **BBR (Bottleneck Bandwidth and Round-trip propagation time):** Estimates available bandwidth and RTT to maximize throughput and minimize latency.

## Further Reading

- [TCP Congestion Control (RFC 5681)](https://datatracker.ietf.org/doc/html/rfc5681)
- [Active Queue Management (RFC 7567)](https://datatracker.ietf.org/doc/html/rfc7567)
- [BBR Congestion Control](https://datatracker.ietf.org/doc/html/draft-cardwell-iccrg-bbr-congestion-control)
