# DNS

## What is DNS?

- DNS (Domain Name System) translates human-readable domain names (like `example.com`) into IP addresses.
- Acts as the "phonebook" of the internet.

## How DNS Works

1. User enters a domain in the browser.
2. Browser checks local cache for the IP.
3. If not found, query goes to a recursive DNS resolver.
4. Resolver asks root, TLD, and authoritative DNS servers in sequence.
5. IP address is returned and used to connect to the website.

## Types of DNS Servers

- **Root Servers:** Direct queries to TLD servers.
- **TLD Servers:** Handle top-level domains (e.g., `.com`, `.org`).
- **Authoritative Servers:** Store actual domain-to-IP mappings.
- **Recursive Resolvers:** Intermediaries that perform the lookup process.

## DNS Records

- **A Record:** Maps domain to IPv4 address.
- **AAAA Record:** Maps domain to IPv6 address.
- **CNAME:** Alias for another domain.
- **MX:** Mail server information.
- **NS:** Name server for the domain.

## Caching

- DNS responses are cached at multiple levels (browser, OS, resolver) to speed up lookups and reduce traffic.

## Common Issues

- **DNS Spoofing/Poisoning:** Attacker provides false DNS responses.
- **Propagation Delay:** DNS changes take time to update globally.

## DNS Security (DNSSEC)

- **DNSSEC (Domain Name System Security Extensions):** Adds digital signatures to DNS data using public-key cryptography.
- Allows resolvers to verify that DNS responses are authentic and have not been altered.
- Helps prevent attacks like DNS spoofing and cache poisoning.
- Not all domains and resolvers support DNSSEC, but adoption is increasing for better security.

## Summary

DNS is essential for translating domain names to IP addresses, enabling user-friendly internet navigation.
