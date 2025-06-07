# HTTP

## What is HTTP?

- HTTP (HyperText Transfer Protocol) is the protocol for transferring data on the web.
- It defines how clients (like browsers) and servers communicate.

## HTTP/1.1

- Introduced persistent connections (keep-alive) to reuse TCP connections.
- Requests and responses are sent as plain text.
- Only one request per connection at a time (head-of-line blocking).
- Widely used but can be inefficient for modern web needs.

## HTTP/2

- Uses binary framing instead of plain text, making it faster and more efficient.
- Supports multiplexing: multiple requests/responses over a single connection.
- Header compression reduces overhead.
- Improves performance, especially for sites with many resources.

## HTTP/3

- Uses QUIC protocol (built on UDP) instead of TCP.
- Reduces connection setup time and improves reliability on unstable networks.
- Maintains multiplexing and header compression from HTTP/2.
- Aims for faster, more secure web communication.

## Summary

HTTP has evolved from simple, text-based communication (HTTP/1.1) to faster, more efficient, and secure protocols (HTTP/2 and HTTP/3) to meet modern web demands.
