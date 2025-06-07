# PAXOS

Paxos is a family of protocols for solving consensus in a network of unreliable processors (nodes). It is designed to ensure that a group of nodes can agree on a single value, even if some nodes or network messages fail.

## Key Concepts

- **Consensus:** The process of agreeing on a single value among distributed nodes.
- **Proposer:** Suggests values to be agreed upon.
- **Acceptor:** Votes on proposed values.
- **Learner:** Learns the chosen value after consensus is reached.
- **Quorum:** A majority of acceptors whose agreement is required for consensus.

## Paxos Phases

1. **Prepare Phase:**  
   - A proposer selects a proposal number and sends a prepare request to a majority of acceptors.
   - Acceptors respond with a promise not to accept proposals with a lower number and may include the highest-numbered proposal they have accepted.

2. **Accept Phase:**  
   - After receiving promises from a majority, the proposer sends an accept request with a value (possibly the highest value seen so far).
   - Acceptors accept the proposal unless they have already promised to a higher-numbered proposal.

3. **Learn Phase:**  
   - Once a value is accepted by a majority, it is chosen.
   - Learners are informed of the chosen value.

## Safety and Fault Tolerance

- Paxos guarantees safety (no two nodes decide on different values) even in the presence of failures.
- Liveness (progress) is guaranteed if a majority of nodes are functioning and can communicate.

## Use Cases

- Distributed databases
- Distributed locks
- Replicated state machines

## Further Reading

- [Paxos Made Simple (Leslie Lamport)](https://lamport.azurewebsites.net/pubs/paxos-simple.pdf)
- [The Part-Time Parliament (Original Paxos Paper)](https://lamport.azurewebsites.net/pubs/lamport-paxos.pdf)
