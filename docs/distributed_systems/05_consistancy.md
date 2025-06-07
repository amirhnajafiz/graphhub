# Consistency

Consistency in distributed systems refers to the guarantee about the visibility and ordering of updates to a data item. It defines how and when changes made by one node become visible to others, and how systems handle concurrent operations.

## Consistency Models

- **Strong Consistency:**  
  Every read receives the most recent write or an error. All nodes see the same data at the same time. Example: linearizability.

- **Sequential Consistency:**  
  The result of execution is as if all operations were executed in some sequential order, and the operations of each individual process appear in this sequence in the order issued.

- **Causal Consistency:**  
  Writes that are causally related must be seen by all processes in the same order. Concurrent writes may be seen in a different order on different nodes.

- **Eventual Consistency:**  
  If no new updates are made, eventually all accesses will return the last updated value. There is no guarantee about how long it will take for all nodes to become consistent.

- **Read-Your-Writes Consistency:**  
  After a process writes a value, it will always see that value in subsequent reads.

- **Monotonic Read Consistency:**  
  Once a process has seen a particular value, it will never see an earlier value in subsequent reads.

- **Monotonic Write Consistency:**  
  Writes by a process are completed in the order issued.

- **Session Consistency:**  
  Guarantees consistency for a single session, often combining read-your-writes and monotonic reads.

## Trade-offs

- Stronger consistency models provide more predictable behavior but can reduce system availability and performance.
- Weaker consistency models improve performance and availability but may expose stale or out-of-order data.

## Use Cases

- **Strong Consistency:** Banking systems, distributed locking, critical configuration management.
- **Eventual Consistency:** Social media feeds, DNS, caching systems.

## Further Reading

- [Consistency Models (Wikipedia)](https://en.wikipedia.org/wiki/Consistency_model)
- [Designing Data-Intensive Applications (Martin Kleppmann)](https://dataintensive.net/)
