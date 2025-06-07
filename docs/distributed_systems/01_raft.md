# RAFT

RAFT is a consensus algorithm designed to manage a replicated log in distributed systems. It is widely used because it is easier to understand than other consensus algorithms like Paxos, while providing the same fault-tolerance and consistency guarantees.

## Key Concepts

- **Leader Election:** One node is elected as the leader, which handles all client requests that modify the log.
- **Log Replication:** The leader appends client requests to its log and replicates them to follower nodes.
- **Safety:** RAFT ensures that committed entries are durable and consistent across the cluster, even in the presence of failures.
- **Term:** Time in RAFT is divided into terms, each beginning with an election. Terms are used to detect obsolete information and ensure safety.

## RAFT Roles

- **Leader:** Handles all client interactions and log replication.
- **Follower:** Passive nodes that respond to requests from leaders and candidates.
- **Candidate:** A follower becomes a candidate when it starts an election to become the leader.

## Leader Election Process

1. Each node starts as a follower.
2. If a follower does not hear from a leader, it becomes a candidate and starts an election.
3. Candidates request votes from other nodes.
4. If a candidate receives a majority of votes, it becomes the leader.

## Log Replication

- The leader receives commands from clients and appends them to its log.
- The leader sends AppendEntries RPCs to followers to replicate the log entries.
- Once a log entry is safely replicated on a majority of nodes, it is considered committed.

## Safety and Fault Tolerance

- RAFT can tolerate up to (N-1)/2 failures in a cluster of N nodes.
- Committed entries are never lost as long as a majority of nodes are operational.

## Use Cases

- Distributed databases
- Key-value stores
- Configuration management systems

## Further Reading

- [In Search of an Understandable Consensus Algorithm (RAFT Paper)](https://raft.github.io/raft.pdf)
- [The RAFT Consensus Algorithm Website](https://raft.github.io/)
