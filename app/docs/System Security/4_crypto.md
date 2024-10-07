# Cryptography

Cryptography is the process of hiding or coding information so that only the person a message was intended for can read it.

## Security basis

Separation is the basis of achieving security. However, functionality is in joining. Therefore, it should be a controlled sharing to achieve both.

There are two areas where security is needed.

1. __Communication security__: data channels, crypographic separation is necessary
2. __System security__: security at the end points, logical separation is necessary

### Communication security concerns

In a message transfer between A and B, we can have four types of concerns:

- __Interruption__ : A to B is blocked
- __Interception__ : C can see messages from A to B
- __Modification__ : C changes messages from A to B
- __Fabrication__ : C sends messages as A to B

## Cryptography

Encode the data in a manner that makes it accessible only to authorized parties. Two important factors are here, __encryption algorithm__ and __encryption key__. Since secure algorithms are hard to develop and does not beyond a few users (security by obsurity, seeks to keep a system secure by keeping knowledge of it secret), need to preserver secrecy of key.

### Terminology

- Plaintext = unencrypted
- Ciphertext = encrypted
- Encryption = $E_{k}(X)$
- Decryption = $D_{k}(X)$
- Cryptanalysis = discover k, X or both

### Types of attacks in cryptography

In all these types, we assume that the attacker knows the encryption algorithm.

1. __Cipher text only__ : attacker only has a set of cipher texts.
2. __Known plain text__ : attacker has access to both the plain text and its encrypted version.
3. __Chosen plain text__ : attacker can select the plain text and see its encrypted version.
4. __Chosen cipher text__ : attacker can select see the plain text from encrypted version.
5. __Chosen text__ : attacker can chose the plain text and see its encrypted version.

## Steganography

It is hiding presence of information. Use normal-looking messages/pictures that conceal secret data.

## Symmetric Cryptography

In the __symmetric cryptography__, encryption and decryption are performed with only one secret key.

### Stream and Block ciphers

- __Stream cipher__ is used to encrypt digital streams of data, one bit or bytes at a time.
It provides most flexibility for cryptographic applications.
- __Block cipher__ operates on data blocks that are typicall 128 bits or more.

#### Structure of Block ciphers

It needs to produce a reversible mapping tha maps n-bit blocks to other n-bit blocks. Good ciphers are based on Shannon's concepts.

- __Diffusion__: disperse bit-patterns within each block of data.
- __Confusion__: mix-up the order of bits within a block.

In principle, good ciphers can be implemented using a table of mappings in which encryption key selects which mapping to use.

### Symmetric Cryptography Algorithms

- DES (56 bits)
- Triple DES with two keys (128 bits)
- AES (128 bits)
- IDEA (128 bits)
- Blowfish (up to 448 bits)
- RC2 (8 to 1024 bits)
- RC5 (up to 2040 bits)
- CAST-128 (40 to 128 bits)

## Public key (asymmetric) cryptography

It uses one key for encryption and another one for decryption. It requires that it be computationally infeasible to compute one of the keys based on the other. One of the two keys is private to a principal; the other key can be freely distributed to any one.

### Encryption vs Signing

- __Encryption in public key crypto__: `A` locks a message using `B` public key, therefore only `B` can open it using it's private key.
- __Authentication in public key crypto__: `A` locks a message using `A` private key, therefore `B` can open it using `A` public key.

When the encoding operation is performed using someone's public key, the results are accessible only to that person. When the encoding operation is done using someones's private key, the results are accessible to every one. By combining them, we can have both encryption and signing. So the flow is like this:

```
A send message to B:
1. A use its private key
2. A use B public key
3. B use its private key
4. B use A public key
```

### RSA Algorithm

- Alphabet: $\{0, \ldots , n-1\}$
- Encryption: $C = M^e \mod n$
- Decryption: $M = C^d \mod n = M^{ed} \mod n$
- Both sender and receiver know n
- Sender knows e, while only the receiver knows d
- $KU = (e, n), KR = (d, n)$
- It is possible to find d, e, and n such that $M^{ed} \equiv M \mod n$
- It is infeasible to determine d from e

#### RSA key generation

- Select two large prime numbers p and q
- Calculate $n = p \times q$
- Calculate the numbers less than n that are prime to it $\phi(n) = (p-1)(q-1)$.
- Select an e less than $\phi(n)$ that is relatively prime to it
- Calculate $d = e^{-1} \mod \phi(n)$
- Set $KU = (e, n), KR = (d, n)$

In order to find big prime numbers, we can use __Miller-Rabin__ test for primality.

##### Miller-Rabin test for primality

- Pick an odd number n. Note that $n-1 = 2^k q$, where q is odd.
- Pick a number $1 < a < n-1$, compute $a^q, a^{2q}, \ldots, a^{2^k q}$.
- If n is prime, by Fermat's theorem: $a^{2^k q} = a^{n-1} = 1 \mod n$
- If the test fails, that means n is composite.
- If it succeeds, n is not guaranteed to be prime. But the probability of success for a nonprime is less than 0.25.

### Conventional Vs Public key crypto

Conventional crypto is fast, on the other hand, public key crypto is much slower. But, key distribution is easier with public keys. Therefore, the solution is to use conventional crypto for encrypting bulk data, and use public key crypto to set up keys for such encryption.

Use __certificates__ and __certification authorities__ (CAs) to establish authenticity of public keys.

## Use of Random numbers

When creating random numbers for cryptography, we need a strong random number generator. These random numbers are used to protect against replay attacks.

- __Pseudorandom__ number generators: Linear congruential method, which is not good for crypto
- __Natural Random Noise__: which is the best source for having randomness.
    - radiation counters
    - radio noise
    - keystroke intervals
    - network packet arrival characteristics

In linux, `/dev/random` is a source of cryptographically secure random numbers. However, pest practice suggests to use `/dev/urandom` for better output.

## Digital Signatures

It is used to required properties as:

- receiver can verify who sends
- sender cannot repudiate (tell that I was not the sender)
- receiver cannot generate

It uses public-key signature. Originator simply encrypts the message using its private key. When the receiver gets the message decrypted using the originator's public key, then we can be sure about who sent the message.

### Message Digests

Encrypting the whole message for signature purposes is too inefficient. The solution is to use one-way hash functions on message and encrypt the hash using private key.

#### Common hash functions

- MD5 (128 bits)
- SHA-1 (160 bits)
- SHA-3 (224 to 512 bits)
- SHA-256
- RIPEMD-160

## Digital Certificates

Certificates are issued by a CA (certificate authorithy). As everyone knows the public keys of the CA, a certificate for a principal A is simply A's public key that is encrypted with CA's private key.

Certificates allow key exchange without real-time access to public-key authority. A certificate binds identity to public key. An example is `X.509` certificates.
