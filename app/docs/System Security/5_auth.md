# Authentication

Authentication is to ensure that the principal is who it claims to be.
It covers user authentication and authentication between systems.

## Passwords

Early systems stored plaintext password. After a while, the stored only one-way
hashes of passwords. Then, they used salt to thwart offline attacks.

### Confidentiality of stored passwords

It is difficult to protect stored passwords. The solution is to not store plaintext
passwords. Instead, use hash functions and store hashed passwords.
But, the password weaknesses is still a problem.

## Password attacks

There are two offline and online attacks on passwords.

### Offline attacks

Attacker has access to hashed passwords, and can make an unbounded number of
attempts at guessing the password.

- Brute-force attack: guess password, hash, compare
- Dictionary attack: use an intelligent algorithm to enumerate passwords

#### Defending against offline attacks

- slow down offline attacks
    - make hash algorithm slower
    - make attacker repeat work for every user by using salt
- protect password file
    - /etc/passwd is global however /etc/shadow is readable only by root

### Online attacks

Attacker has no access to hashed passwords, so each attack attempt requires entering the password
at the password dialog. Usually gets blocked by systems limits.
So, guessing is typically unsuccessful except for the most easily guessed passwords.

Passwords stealing is the most viable approach for succeeding in online attacks.

- Phishing
- Password dumps
- Network sniffers
- Keyloggers and other malware
- Password reset

#### Password Theft and Trusted Path

In order to make sure that a password is not stolen when it is used, users
can use trusted path which is a secure way for a user to communicate with the subsystem
performing user authentication.

##### Phishing and Trusted path

Phishing attacks typically involve tricking a user into revealing their passwords.
There are three ways to defened against that.

1. Two-stage login with personalized prompts
2. SSL provides strong defense
3. Two-factor authentication

Other non-solutions:

- CAPTCHA
- Security questions
- Password rules
- Alternative password schemes

## Authentication over networks

### Server-side authentication of plaintext passwords

The servers don't trust client computer, therefore it does this task.

### Host-based authentication

Trust client host to perform user authentication. Used in network file system
by using /etc/hosts.equiv.

### Transmit only encrypted passwords

Encrypt user password using a client host specific secret.
Server uses client secret to decrypt and verify user password.
However, attackers can use replay attacks. Therefore, one-time passwords come handy.

#### One-time passwords

Start with a password P to generate a sequence of one time passwords $Q_{1}, \ldots , Q_{n}$.
However, no password should provide any info about other passwords.
Then, using a one-way hash function: $O_{k} = H^{N-k}(P)$.

So, the protocol goes as follow:

1. System sends user $(i)$
2. User sends system $H^{N-i}(P)$

The system need not store P, just the previous OTP (one-time password).

##### Other OTPs: SecureID

- A hand-held device sold by RSA
- Uses a device-specific secret to generate authentication token every minute
- Combined with a PIN or password

#### Challenge-response protocols

In these protocols, server sends a challenge to the client and waits for the response.
If the client is successful in solving the challenge, the server continues the communication.

##### SSH

- Password based authentication
    1. Server sends a $KU_{S}$ to client
    2. Client uses that key to send the password and a random number
    3. Communication is encrypted using the client random number
- Public key based authentication
    1. Client sends the server it's public key
    2. Server checks in `.ssh/authorized_keys` to find the user key
    3. Server sends a random number encrypted using client public key
    4. Client decrypts the message and sends the result

##### Websites

Websites use password authentication over https

1. Server sends client it's public key certificate with a key inside it
2. Client reads it and used the server public key to send a random number
3. All subsequent communication encrypted using that random number

## Improving password schemes

- Master password: a master password is used to encrypt all other passwords
- Public keys
- Two-factor authentication
- One-time passwords or PINs

### Password management challenges

- easy-to-remeber passwords may be easy to guess
- password management
- shared devices problem
- stolen devices

### Benefits of password managers

- Allows strong passwords unique to each website
- Reduces theft due to practices such as writing them down
- Computers are not easily phished

### Biometrics

Authenticate by recognizing some aspect of human physiology, anatomy, skill or trait.

#### Issues

- False match or acceptance rate
- False non-match/rejection rate
- Verification vs Identification

#### Handwritten signatures

Routinely used in transactions and contracts. Recognition may be manual, machine-assisted or completely mechanical.

#### Fingerprints

Most commonly used biometric. However, even low error rates can compound when doing
a on-to-many match.

#### Problems with biometrics

- Age of reference data
- Age of data
- Recordings
- Collusions (providing bad data voluntarily)

### Visual passwords

- Using passpoints: select points on an image
- Select images from an array
