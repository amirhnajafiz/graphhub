# Security Policies and Enforcement Mechanisms

In this chapter, our focuse is on policies and ther enforcement. Basically, we want to limit the operations and force entities to follow these limits.

## Terminology and concepts

In access control, three kinds of entities exists:

1. __Principals__ (users)
2. __Subjects__ (processes)
3. __Objects__ (files, network sockets, devices, ...)

## Access control

There is basic principle of least privilege that says, throughout execution, each subject should be give the minimal access necessary to accomplish its task. The goal is to control access to operations performed by subjects on objects.

## Discretionary Access Control (DAC)

Discretionary permissions settings at owner's discretion. Meaning that permission on an object is set by its owner.

It can be modeled as a metrix:

|        | $O_{1}$ | $O_{2}$ | $O_{2}$ | $\ldots$ |
|--------|:-------:|:-------:|:-------:|:--------:|
| User 1 | rw | w | - | $\ldots$ |
| $\ldots$ | $\ldots$ | $\ldots$ | $\ldots$ | $\ldots$ |
| User N | r | wx | - | $\ldots$ |

Implementations:

- __Access-control lists (ACLs)__
    - the AC-matrix column describing access rights on an object are stored with the object
- __Capabilities__
    - row-wise representation of AC-matrix, held by the user corresponding to the row
    - user should not change them, therefore comes with cryptographu mechanisms

### Managing permissions

In systems, manageability is improved using indirection Groups and Roles (RBAC). It gives the features of inheritance and negative permissions.

### Implemetation of DAC on UNIX

#### Objects

All resources are files, Each file has an owner and group owner.
Permissions are divided into three groups (file owner, owner group, everyone else). And 3 bits of permission for each part (read/write/execute).

For directories:

- read means ability to list the directory.
- write means ability to create files in the directory.
- execute means the ability to access specific files if you know the name.

Permissions on newly created files determined by `umask`. To change permissions, use `chmod`. To change ownership use `chown`.

#### Subjects

Subjects inherit the userid, group and supplemantry groups of the parent. File permission checks are performed using this userid and groups. No permission checks on superuser (userid 0). Objects created by a subject inherit the subject's userid and group.

#### Effective, Real and Saved UID/GID

- __Effective__: the uid used for determining access privileges
- __Real__: the real user that is logged on, and on whose behalf a process is running
- __Saved__: allows processes to temporarily relinquish privileges but then restore original privileges

#### In Linux

- __Owner__: the user who created a file or directory is its owner.
- __User__: any person or system component with a user account on the system.
- __Group__: a collection of users. each user belongs to at least one group, and each file has a group associated with it.

In order to see system users as `root`, you can `cat /etc/passwd`. This file is like this:

```s
root:x:0:0:root:/root:/bin/bash
user1:x:1001:1001::/home/user1:/bin/bash
alice:x:1002:1002::/home/alice:/bin/bash
```

Every file or directory in Linux has an owner and belongs to a group:

```sh
-rw-r--r-- 1 user1 group1 1024 Oct  7 10:00 file.txt
```

The following commands are used for manage users and groups:

- add a user: `useradd <username>`
- set user a password: `passwd <password>`
- create a group: `groupadd <groupname>`
- add a user to a group: `usermod -aG <group> <user>`
- view group memberships: `groups <username>`

To change file and directory permissions, these commands are used:

- change ownership: `chown <user>:<group> <file>`
- change permissions: `chmod <permissions> <file>`

These permissions are for owner, group, and others. Each digit represents the sum of permissions:

- 4 = Read
- 2 = Write
- 1 = Execute

For example, `755` means:

- Owner: read/write/execute
- Group: read/execute
- Others: read/execute

##### Add user for SSH

1. Create the user: `sudo useradd -m -s /bin/bash <username>`
2. Set password for user: `sudo passwd <username>`
3. Enable SSH access for the user:
   1. switch to user: `su - <username`
   2. create `.ssh` directorie: `mkdir ~/.ssh && chmod 700 ~/.ssh`
   3. add user public key: `echo "<user-public-key> >> ~/.ssh/authorized_keys" && ~/.ssh/authorized_keys`
   4. check `/etc/ssh/sshd_config` for `PubkeyAuthentication yes`
   5. restart ssh service: `sudo systemctl restart sshd`
4. To add password authentication
   1. edit `/etc/ssh/sshd_config` for `PasswordAuthentication yes, PermitRootLogin no`
   2. restart ssh service: `sudo systemctl restart sshd`

Now users can login using ssh:

```sh
ssh <username>@<server-ip>
ssh -i <private-key-file> <username>@<server-ip>
```

## Capabilities

They are tickets to gain access to a resource. Combine objects and access rights into one package is what they do. They are transferable and must be unforgeable.

- Passwords
- Certificates
- File descriptors
- Some cookies in web applications

### Implementation drawbacks

They are more difficult to implement than ACLs. They are also difficult to manage, therefore, capabilities in their purest form are not widely used in OSes.

However, they provide a better framework than ACLs when one or more of the following conditions hold:

- Policy enforcement isn't centralized.
- Parties have limited trust on each other.
- Rights need to move with principals.

## Mandatory Access Control (MAC)

There are limitations for DAC:

- _Trojan Horse_ problem: assumes that users authorize all actions of their processes, but what if the process does not follow it?
- Provides no protection if a resource owner did not bother to set the ACL properly

To overcome these problems, MAC moves the responsibility to a central point, typically the system administrator.

### Multi-Level security (MSL)

Access control policies do not provide any way to control the manner in which information is used. Once an entity is given access to some data, it can use this information in any way. MLS policies control information flow, and hence control how information is used.

#### Confidentiality Policies

An object is labeled with a level L (unclassified, classified, secret, top secret). A subject is associated with a clearance level C. Therefore, a subject can access on an object if its clearance level is equal to or above the object's level.

#### MLS: Bell-LaPadual Model

To prevent leakage of sensitive information, we ensure:

1. No read-up : a subject S can read object O only if $C(S) \geq L(O)$
2. No write-down : a subject can write an object O only if $L(O) \geq C(S)$

This ensures that information can flow only upwards in terms of confidentiality level.

#### MLS: Biba Model (Integrity)

Designed to ensure integrity rather than confidentiality. We want to keep higher level subjects safe from lower level ones. So any higher level can write to their lower level, however it only can read from higher level.

- No read-down : a subject S can read object O only if $C(S) \leq L(O)$
- No write-up : a subject S can write an object O only if $C(S) \geq L(O)$

##### Low Water-Mark Policy (LOMAC)

Allows read-downs, but downgrade subject to the level of the subject.

### Problems with Information Flow

- Label creep, as more and more objects become sensitive, its difficult for the system to be used by lower-clearance subjects.
- No controlled mechanism for making exceptions.

#### Alternative Approaches

The key goal is to mitigate damage that may result from all pwerful root privileges. So, we should break down root privilege into a number of sub-privileges, and decouple user privileges from program privileges. Like:

- Domain and type enforcement : SELinux
- Linux capabilities
