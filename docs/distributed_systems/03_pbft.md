# PBFT

Practical Byzantine Fault Tolerance (PBFT) is a consensus algorithm designed to work in asynchronous distributed systems where nodes may fail or act maliciously (Byzantine faults). PBFT ensures that a distributed system can reach agreement even if some nodes behave arbitrarily.

## Key Concepts

- **Byzantine Fault:** A failure where nodes may act arbitrarily, including malicious behavior or sending conflicting information.
- **Replica:** Each node in the system is called a replica.
- **Primary:** The leader node that coordinates the consensus process.
- **View:** A period during which a particular primary is responsible for coordinating consensus.
- **Quorum:** PBFT requires at least 3f + 1 replicas to tolerate up to f Byzantine faults.

## PBFT Phases

1. **Pre-Prepare:**  
   - The primary receives a client request and broadcasts a pre-prepare message to all replicas.

2. **Prepare:**  
   - Replicas verify the pre-prepare message and broadcast a prepare message to others.

3. **Commit:**  
   - After receiving enough prepare messages, replicas broadcast a commit message.
   - When a replica receives enough commit messages, it executes the request and replies to the client.

## Safety and Fault Tolerance

- PBFT can tolerate up to f faulty nodes in a system of 3f + 1 replicas.
- Guarantees safety (all non-faulty nodes agree on the same value) and liveness (the system continues to make progress).

## Use Cases

- Permissioned blockchains
- Distributed databases
- Financial systems requiring high integrity

## Further Reading

- [Practical Byzantine Fault Tolerance (Original Paper)](https://pmg.csail.mit.edu/papers/osdi99.pdf)
- [PBFT Explained](https://www.usenix.org/legacy/event/osdi99/full_papers/castro/castro.pdf)
