# SSH

**SSH (Secure Shell)** is a protocol for securely connecting to remote systems over a network. It provides encrypted communication and is commonly used for remote login, command execution, and file transfer.

---

## Basic SSH Usage

- **Connect to a remote server:**
  ```shell
  ssh user@hostname
  ```
  - `user`: Username on the remote system.
  - `hostname`: IP address or domain name.

- **Specify a port:**
  ```shell
  ssh -p 2222 user@hostname
  ```

- **Run a command remotely:**
  ```shell
  ssh user@hostname 'ls -l /var/log'
  ```

---

## SSH Key Authentication

1. **Generate SSH key pair:**
   ```shell
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```
   - Default location: `~/.ssh/id_ed25519` and `~/.ssh/id_ed25519.pub`

2. **Copy public key to remote server:**
   ```shell
   ssh-copy-id user@hostname
   ```
   - Or manually append `~/.ssh/id_ed25519.pub` to `~/.ssh/authorized_keys` on the server.

3. **Connect using key:**
   ```shell
   ssh user@hostname
   ```

---

## SSH Agent

- **Start the agent and add your key:**
  ```shell
  eval "$(ssh-agent -s)"
  ssh-add ~/.ssh/id_ed25519
  ```

---

## SSH Config File

Customize connections in `~/.ssh/config`:

```text
Host myserver
    HostName example.com
    User alice
    Port 2222
    IdentityFile ~/.ssh/id_ed25519
    ForwardAgent yes
```

- Connect with:
  ```shell
  ssh myserver
  ```

---

## Port Forwarding

- **Local port forwarding:**
  ```shell
  ssh -L 8080:localhost:80 user@hostname
  ```
  (Access remote port 80 via local port 8080)

- **Remote port forwarding:**
  ```shell
  ssh -R 9090:localhost:3000 user@hostname
  ```
  (Expose local port 3000 on remote port 9090)

---

## Copying Files

- **Using scp:**
  ```shell
  scp file.txt user@hostname:/path/to/dest/
  scp user@hostname:/path/to/file.txt .
  ```

- **Using rsync:**
  ```shell
  rsync -avz file.txt user@hostname:/path/to/dest/
  ```

---

## Useful SSH Commands

- **Check SSH version:**
  ```shell
  ssh -V
  ```
- **Verbose/debug connection:**
  ```shell
  ssh -v user@hostname
  ```
- **Kill hung SSH session:**  
  Press `~.` (tilde, then dot) in the SSH terminal.

---

## Server-Side Configuration

- **Config file:** `/etc/ssh/sshd_config`
- **Restart SSH service (Linux):**
  ```shell
  sudo systemctl restart sshd
  ```
- **Common options:**
  ```
  PermitRootLogin no
  PasswordAuthentication no
  PubkeyAuthentication yes
  AllowUsers alice bob
  ```

---

## Security Tips

- Use SSH keys, not passwords.
- Disable root login.
- Change default port (optional).
- Use strong passphrases.
- Regularly update OpenSSH.

---

## References

- [OpenSSH Manual](https://man.openbsd.org/ssh)
- [SSH Config Documentation](https://linux.die.net/man/5/ssh_config)

