# Processor and Virtual Machine Security

## Processor Security

Processors operate at multiple privilege levels. At least two levels
are needed, privileged and unprivileged.
- Ring 0 is highes privilege
- Ring 3 is lowest privilege

OS kernel runs in Ring 0, while user-level code executes in unprivileged mode.
Improtant processor state can be changed only throught the execution of privileged
instruction.

- Page tables
- I/O devices

## Virtualization

Creation of logical instances of physical resources. Same functions, without
rewriting the whole thing.
- CPU
- Memory
- I/O

Some resources are shared using high level interfaces rather than virtualization.

Since only OS can control and manage system resources and share them
safely across user-level processes, resources are often virtualized.
It is as if a user-level process has an exclusive, private copy of that
resource.

One key problem is that there is no control in transfers across privilege levels.
Transfering access between privileged and unprivileged levels are trough
system interrupts.

### System Virtualization

Creates several virtual systems within a single physical system.
VVM (hypervisor) is the software layer providing the virtualization.
VM runs on top of the VMM. VMM runs in kernel-level (Ring 0).

#### Process virtualization

The VM supports an application binary interface that uses interrupts
and system-calls. (JWM)

#### OS or Namespace virtualization

Having multiple logical VMs that share the same OS kernel. Isolates
VMs by partitioning all objects into namespaces. (Docker, vServer)

#### Full virtualization

The VM supports a complete ISA and user and system instructions. (VirtualBox)

### VMM Architecture

#### Type 1 (baremetal)

The VMM runs on base hardware.

```
---
guest application
-
multi guest OS
-
VMM
-
host hardware
---
```

#### Type 2 (hosted)

The VMM runs as an ordinary application inside host OS.

```
---
guest application
-
multi guest OS
-
VMM
-
host OS
-
host hardare
---
```

### Issues

- Protection levels
- Requirement for efficient virtualization
- Which instructions are privileged?

### Virtualization Approaches

- Full virtualization using binary translation: needs disassemble the binary, identify instructions and patch them (like VMware or QEMU)
- Paravirtualization: OS modified to run on VMM, then it uses Hypercalls (like Xen)
- Harware-assisted virtualization: OS requests trap to VMM without binary translation or paravirtualization (most VMMs today)

### Memory Virtualization

Physical memory is divided among multiple VMs with two levels of translation in Guest OS and VMM.
By using shadow page, when guest attempts to update, VMM intercepts and emulate the effects on the
corresponding shadow page table.

### I/O Virtualization

The VMM intercepts guest's I/O-performing instructions.
Performs necessary actions to emulate their effect.
This emulations leads to low performance for most I/O operations.
Compared to CPU and memory, that are executed with less extra operations.

## VMs security

### Security Applications

VM technology provides strong isolation that is necessary to run malware
without undue risks. (Strong resource isolation and snapshot/restore features)

- Honypots systems
- Malware analysis

Basically, it is using VMs for less damage and keep alignment in guest OS.
Also, it provides protection from compromised OSes. Running malware and
rootkit detection techniques in VMM, or enforce security properties from
within the VMM.

### Security challenges in virtualized environments

Since virtualization leads to co-tenancy, it has challenges.

- VMs belonging to distinct principals use the same hadrware. Therefor, it needs strong isolation.
- It provides increased opportunities for side-channel attacks.
- Also, Denail of service is hard to prevent.

### Docker security

It uses namespaces and cgroups to isolate its containers.
It also has a container infrastructure and services (docker daemon).

#### Attack vectors

- Shared kernel
- Docker daemon needs root privileges
- Apps can reach to the host

#### Best practices

- Avoid root privilege
- Limit further using linux capabilities
- Use seccomp-bpf to limit system calls that can be made by processes within the container
- Avoid using untrusted softwares

