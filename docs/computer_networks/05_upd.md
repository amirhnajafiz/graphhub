# UDP

The User Datagram Protocol (UDP) is a core protocol of the Internet Protocol Suite. Unlike TCP, UDP provides a connectionless, lightweight method for sending datagrams without guaranteeing delivery, order, or error checking.

## Key Features

- **Connectionless:** No connection is established before data transfer.
- **Unreliable Delivery:** Packets may be lost, duplicated, or arrive out of order.
- **No Flow or Congestion Control:** UDP does not manage data rate or retransmissions.
- **Low Overhead:** Minimal protocol mechanism, making it fast and efficient.
- **Supports Broadcast and Multicast:** Useful for applications that need to send data to multiple recipients.

## UDP Header Fields

- **Source Port / Destination Port:** Identify sending and receiving applications.
- **Length:** Length of the UDP header and data.
- **Checksum:** Error-checking for the header and data (optional in IPv4, required in IPv6).

## Use Cases

- Streaming media (audio/video)
- Online gaming
- DNS queries
- Voice over IP (VoIP)
- Simple query-response protocols

## Further Reading

- [UDP in RFC 768](https://datatracker.ietf.org/doc/html/rfc768)
- [Computer Networking: A Top-Down Approach (Kurose & Ross)](https://www.pearson.com/en-us/subject-catalog/p/computer-networking-a-top-down-approach/P200000003481/9780136681557)
