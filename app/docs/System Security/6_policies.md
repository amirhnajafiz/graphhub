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
