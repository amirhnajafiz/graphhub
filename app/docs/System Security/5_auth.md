# Authentication

Authentication is to ensure that the principal is who it claims to be. It covers user authentication and authentication between systems.

## Passwords

Early systems stored plaintext password. After a while, the stored only one-way hashes of passwords. Then, they used salt to thwart offline attacks.

### Confidentiality of stored passwords

It is difficult to protect stored passwords. The solution is to not store plaintext passwords. Instead, use hash functions and store hashed passwords. But, the password weaknesses is still a problem.

## Attacks on Passwords

There are two __offline__ and __online__ attacks on passwords.

### Offline attacks

Attacker has access to hashed passwords, and can make an unbounded number of attempts at guessing the password. These attacks greatly speeded by GPUs.

- __Brute-force attack__: guess password, hash, compare
- __Dictionary attack__: use an intelligent algorithm to enumerate passwords

#### Defending against offline attacks

- slow down offline attacks
    - make hash algorithm slower
    - make attacker repeat work for every user by using `salt`
      - Original proposal: $DES_{password || salt}^25 (0)$
- protect password file
    - `/etc/passwd` is global however `/etc/shadow` is readable only by root

### Online attacks

Attacker has no access to hashed passwords, so each attack attempt requires entering the password at the password dialog. Usually gets blocked by systems limits. So, guessing is typically unsuccessful except for the most easily guessed passwords.

Passwords stealing is the most viable approach for succeeding in online attacks such as:

- Phishing
- Password dumps
- Network sniffers
- Keyloggers and other malware
- Password reset

#### Password Theft and Trusted Path

In order to make sure that a password is not stolen when it is used, users can use __trusted path__ which is a secure way for a user to communicate with the subsystem performing user authentication.

##### Phishing and Trusted path

Phishing attacks typically involve tricking a user into revealing their passwords. There are three ways to defened against that:

1. __Two-stage login__ with personalized prompts
2. __SSL__ provides strong defense
3. __Two-factor authentication__

Other non-solutions:

- CAPTCHA
- Security questions
- Password rules
- Alternative password schemes

## Authentication over networks

This authentication is needed when two systems are going to share data between themselves.

### Server-side authentication of plaintext passwords

The servers don't trust client computer, therefore it does this task. It is a bad option unless you physically secure the network, and trust all clients on the network.

### Host-based authentication

Trust client host to perform user authentication. Used in network file system by using `/etc/hosts.equiv`. It is not a great option today, as users often have admin privileges on client machines.

### Transmit only encrypted passwords

Encrypt user password using a client host specific secret. Server uses client secret to decrypt and verify user password. However, attackers can use replay attacks. Therefore, __one-time passwords__ come handy.

#### One-time passwords

Start with a password P to generate a sequence of one time passwords $Q_{1}, \ldots , Q_{n}$. However, no password should provide any info about other passwords. Then, using a one-way hash function: $O_{k} = H^{N-k}(P)$. So, the protocol goes as follow:

1. System sends user $(i)$
2. User sends system $H^{N-i}(P)$
3. Even if user doesn't respond, use $i+1$ as next challenge

The system need not store P, just the previous OTP (one-time password).

##### Other OTPs: SecureID

- A hand-held device sold by RSA.
- Uses a device-specific secret to generate authentication token every minute. ($AES_{K_{s}} (Time)$)
- Combined with a PIN or password.

#### Challenge-response protocols

In these protocols, server sends a challenge to the client and waits for the response. If the client is successful in solving the challenge, the server continues the communication.

##### SSH

- Password based authentication
    1. Server sends a $KU_{S}$ to client
    2. Client uses that key to send the password and a random number, $E_{KU_{s}} (K_{SES} = random()), E_{K_{SES}} (password)$
    3. Communication is encrypted using the client random number, $K_{SES}$
    4. It has a weakness, integrity of $KU_{S}$ is not assured. SSH asks the user to confirm the key the first time a server is accessed, and saves the key for use in future accesses to same server.
- Public key based authentication
    1. Client sends the server it's public key, $KU_{USER}$
    2. Server checks in `.ssh/authorized_keys` to find the user key
    3. Server sends a random number encrypted using client public key, $challenge = E_{KU_{USER}} (random)$
    4. Client decrypts the message and sends the result

##### Websites

Websites use password authentication over https

1. Server sends client it's public key certificate with a key inside it
2. Client reads it and used the server public key to send a random number
3. All subsequent communication encrypted using that random number

## Improving password schemes

- Master password: a master password is used to encrypt all other passwords
- Public keys like SSH or PGP
- Two-factor authentication
- One-time passwords or PINs

### Password management challenges

- easy-to-remeber passwords may be easy to guess, using dictionary attacks
- password management dealing with multiple passwords, or password selection rules
- shared devices problem
- stolen devices

### Using Master passwords

A master password is used to encrypt all other passwords. The focus on creating one strong password.

### Benefits of password managers

- Allows strong passwords unique to each website.
- Reduces theft due to practices such as writing them down.
- Computers are not easily phished.

### Biometrics

Authenticate by recognizing some aspect of human physiology, anatomy, skill or trait.

#### Issues

- False match or acceptance rate, "fraud rate"
- False non-match/rejection rate, "insult rate"
  - there is a trade-off between the two rates
- Verification (pair-wise comparison) vs Identification (one-to-many comparison)

#### Handwritten signatures

Routinely used in transactions and contracts. Recognition may be manual, machine-assisted or completely mechanical.

#### Fingerprints

Most commonly used biometric. However, even low error rates can compound when doing
a on-to-many match.

Other methods are:

- Iris recognition
- Voice recognition
- Keystroke dynamics
- DNS

#### Problems with biometrics

- Age of reference data
- Age of data
- Recordings
- Collusions (providing bad data voluntarily)
- It may reduce false accepts, but at the cost of increased false rejects

### Visual passwords

There are several schemes to use pictures that seem so much easier to remember than the details in an arbitrary text password.

- Using passpoints: select points on an image
- Select images from an array

#### Issues with graphical passwords

- Many of the basic attack techniques continue to work
  - Dictionary
  - Social engineering
- New attacks
  - Shoulder-surfing
