# TCP

The Transmission Control Protocol (TCP) is a core protocol of the Internet Protocol Suite. It provides reliable, ordered, and error-checked delivery of data between applications running on hosts in a network.

## Key Features

- **Connection-Oriented:** TCP establishes a connection between sender and receiver before data transfer begins.
- **Reliable Delivery:** Ensures that data is delivered without errors and in the correct order.
- **Flow Control:** Uses a sliding window mechanism to prevent overwhelming the receiver.
- **Congestion Control:** Adjusts the rate of data transmission based on network congestion.
- **Full Duplex:** Allows data to be sent and received simultaneously.

## TCP Connection Lifecycle

1. **Three-Way Handshake (Connection Establishment):**
   - **SYN:** Client sends a SYN (synchronize) packet to the server.
   - **SYN-ACK:** Server responds with a SYN-ACK packet.
   - **ACK:** Client sends an ACK packet, and the connection is established.

2. **Data Transfer:**
   - Data is sent in segments, each with a sequence number.
   - Receiver sends acknowledgments (ACKs) for received segments.

3. **Connection Termination:**
   - Either side can initiate termination using a four-step FIN/ACK handshake.

## TCP Header Fields

- **Source Port / Destination Port:** Identify sending and receiving applications.
- **Sequence Number:** Position of the first byte of data in the segment.
- **Acknowledgment Number:** Next expected byte from the sender.
- **Flags:** Control bits (SYN, ACK, FIN, RST, PSH, URG).
- **Window Size:** Flow control information.
- **Checksum:** Error-checking for the header and data.

## Use Cases

- Web browsing (HTTP/HTTPS)
- Email (SMTP, IMAP, POP3)
- File transfer (FTP)
- Remote login (SSH, Telnet)

## Further Reading

- [TCP in RFC 793](https://datatracker.ietf.org/doc/html/rfc793)
- [Computer Networking: A Top-Down Approach (Kurose & Ross)](https://www.pearson.com/en-us/subject-catalog/p/computer-networking-a-top-down-approach/P200000003481/9780136681557)
