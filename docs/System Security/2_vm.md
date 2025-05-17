# Processor and Virtual Machine Security

In this chapter, we focuse on processors and VMs security levels. Moreover, we will see how we can use VMs in security applications.

## Processor Security

Processors operate at multiple privilege levels. At least two levels
are needed, privileged and unprivileged.

- __Ring 0__ is highes privilege (kernel-level)
- __Ring 3__ is lowest privilege (user-level)

OS kernel runs in Ring 0, while user-level code executes in unprivileged mode. Improtant processor state can be changed only throught the execution of privileged instruction.

- Page tables
- I/O devices

As a result, only the kernel code can change critical processor state. However, there is no control for transfers across privilege levels. So, privileged crossings are usually effected via interrupts. These interrupts are like request messages.

## Virtualization is OSes

Creation of logical instances of physical resources. Same functions, without rewriting the whole thing. Resources to virtualize are:

- CPU
- Memory
- I/O devices

Some resources are shared using high level interfaces rather than virtualization. Since only OS can control and manage system resources and share them safely across user-level processes, resources are often virtualized. It is as if a user-level process has an exclusive, private copy of that
resource.

## System Virtualization

Creates several virtual systems within a single physical system. This virtual should still provide privileged instructions, so that OS kernels can run on top. __VVM (hypervisor)__ is the software layer providing the virtualization. VM runs on top of the VMM. VMM runs in kernel-level (Ring 0).

### Process virtualization

The VM supports an application binary interface that uses interrupts and system-calls. (JWM)

### OS or Namespace virtualization

Having multiple logical VMs that share the same OS kernel. Isolates VMs by partitioning all objects into namespaces. (Docker, vServer)

### Full virtualization

The VM supports a complete ISA and user and system instructions. (VirtualBox)

### VMM Architectures

There are two types of VMM, __baremetal__ and __hosted__.

#### Type 1 (baremetal)

The VMM runs on bare hardware.

```
|+++++++++++++++++++| |+++++++++++++++++++|
| guest application | | guest application |
|+++++++++++++++++++| |+++++++++++++++++++|
===========================================
|++++++++++++++++++|
|  multi guest OS  |
|++++++++++++++++++|
===========================================
|+++++++++++++++++++|
|        VMM        |
|+++++++++++++++++++|
===========================================
|+++++++++++++++++++|
|   host hardware   |
|+++++++++++++++++++|
```

#### Type 2 (hosted)

The VMM runs as an ordinary application inside host OS.

```
|+++++++++++++++++++| |+++++++++++++++++++|
| guest application | | guest application |
|+++++++++++++++++++| |+++++++++++++++++++|
===========================================
|++++++++++++++++++|
|  multi guest OS  |
|++++++++++++++++++|
===========================================
|+++++++++++++++++++|
|        VMM        |
|+++++++++++++++++++|
===========================================
|+++++++++++++++++++++++|
| host operating system |
|+++++++++++++++++++++++|
===========================================
|+++++++++++++++++++|
|   host hardware   |
|+++++++++++++++++++|
```

### Key issues in CPU virtualization

- Protection levels.
- Requirement for efficient virtualization. Privileged instructions will be executed as traps if they come from user-level. Sensitive instructions are the ones that affect important system state. Therefore, if an instruction is privileged and sensitive, it can support efficient __trap and emulate__ approach.
- For x86, not all sensitive instructions are privileged.

### Virtualization Approaches

- __Full virtualization__ using binary translation: needs disassemble the binary, identify instructions and patch them. Rely dynamic disassembly and translation in order to make disassembly tractable, and to support dynamic changes to code. (like VMware or QEMU)
- __Paravirtualization__: OS modified to run on VMM, then it uses Hypercalls. It is no longer 100% interface compatible, but has better performance. (like Xen)
- __Harware-assisted virtualization__: OS requests trap to VMM without binary translation or paravirtualization. Separates CPU execution into two modes. Hypervisor executes in host mode, and all VMs execute in guest mode. (most VMMs today)

### Memory Virtualization

Access to MMU needs to be virtualized, otherwise guest OS may directly access physical memory and subvert VMM. Physical memory is divided among multiple VMs with two levels of translation in Guest OS and VMM.

- Guest OS: guest virtual addr $\to$ guest physical addr
- VMM: guest physical addr $\to$ machine addr

Shadow page table is needed to avoid 2-step translation. By using shadow page, when guest attempts to update, VMM intercepts and emulate the effects on the corresponding shadow page table.

### I/O Virtualization

The VMM intercepts guest's I/O-performing instructions. Performs necessary actions to emulate their effect. This emulations leads to low performance for most I/O operations. Compared to CPU and memory, that are executed with less extra operations.

## VMs security applications and concerns

### Security Applications

VM technology provides strong isolation that is necessary to run malware
without undue risks. (Strong resource isolation and snapshot/restore features)

- __Honypots systems__
- __Malware analysis__

Basically, it is using VMs for less damage and keep alignment in guest OS. Also, it provides protection from compromised OSes. Running malware and rootkit detection techniques in VMM, or enforce security properties from within the VMM.

#### Rootkit

A rootkit, is a set of software tools that enable an unauthorized user to gain control of a computer system without being detected.

### Security challenges in virtualized environments

Since virtualization leads to __co-tenancy__, it has challenges.

- VMs belonging to distinct principals use the same hadrware. Therefor, it needs strong isolation.
- It provides increased opportunities for side-channel attacks.
- Also, Denail of service is hard to prevent.

### Docker security

It uses __namespaces__ and __cgroups__ to isolate its containers. It also has a container infrastructure and services (__docker daemon__). Containerscan share files with the host OS, but this can be dangerous since it can allow root user in a container to change critical host OS files.

#### Docker attack vectors

- Shared kernel: it is using same OS kernel across different containers. Any kernel vulnerabilities may be exploited.
- Docker daemon needs root privileges. So, malicious processes may abuse this privilege.
- Apps running within Docker can reach to the host by sharing folders. Or, root processes inside container can possibly execute systemcalls as root on host.

#### Docker security practices

- Avoid root privilege.
- Limit further using linux capabilities.
- Use seccomp-bpf to limit system calls that can be made by processes within the container.
- Avoid using untrusted software.

## Notes and Comments

- __Fault isolation__ means that a fault occurring in one module will not corrupt a different module. Operating systems use hardware features (such as page tables or segmentation harware) to realize fault isolation between user processes.
