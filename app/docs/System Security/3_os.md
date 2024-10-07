# Operating System Security

This chapter focuses on OS security and processes. Mostly talking about UNIX systems.

## UNIX Intro

User level is a set of processs, the kernel does not place requirements
on which processes should run. Command shell is one such process, and there can be many such command shells. Programs can spawn other programs, orchestrate them to achive higher level goals. Interconnect programs using pipes. Everything is a file in operating system. Every device is a file. File permissions provde a universal access control mechanism.

System Architecture:

```
the users
-------------------------------------
shell and commands, compilers and interpreters, system libraries
=====================================
system-call interface to the kernel
=====================================
signals termianl handling character I/O system terminal drivers
file system, swapping block I/O, system disk and tape drivers
CPU scheduling, page replacement, demand paging, virtual memory
=====================================
kernel interface to the hardware
=====================================
terminal controllers, terminals | device controllers, disks and tapes | memory controllers, physical memory
```

File System organization:

```
/vmunix
/bin : contains binaries
/boot : contains files required for starting the system
/dev : contains device files
/etc : everything to configure
/home : user's personal directories
/lib : system libraries
/media : external storage mounted
/mnt : where you manually mount storage devices or partitions
/opt : software you compile
/proc : like /dev is a virtual directory that contains computer information
/root : home directory of superuser
/tmp : used for storing temporary values
/sbin : similar to /bin, but is has apps that only superuser can run
/sys : another virtual directory contains information from devices connected to your computer
/var : contains logs
```

## Processes

Process is a program in execution which has a __pid__, __owner__, __group__, and other attributes. Processes have separate virtual address spaces.

This memory isolation provides the basis of security:

- a process cannot access the memory of other processes.
- access to kernel memory controlled by page permissions.
- read/write/execute permissions set at the granularity of a page.

### Virtual memory

Each process has a logically separate address space. Memory organized into pages (4KB). Swap space is a disk space for backing up pages that don't fit into physical memory. Processor exception when a page is not in physical memory. OS handles the exception transparently to bring this page into memory.

#### Virtual memory allocation

May be OS initiated or be requested by a process (using mmap, mprotect).

### Process Control Block (PCB)

Contains all process state that the OS needs to manage.

- register values
- uid, gid, current directory, ...
- open file table, file descriptors are indices into this table

#### fork system call

When using fork systemcall, child inherits all its parent attributes. So child is an exact copy of parent, except for return value of syscall (zero for child, pid of child for parent). However, copying memory is expensive. Linux uses `clone`, a generalization that allows fine control. 

#### execve system call

Used to replace calling process with a new program. When using this system call, all of the memory is overwritten. But file descriptors are still inherited.

#### exit and wait system calls

Processes return a status code when they exit. Parent receives this status when it waits on a child. Child cannot fully exit until parent collects this code, otherwise it will become zombie.

### Process Scheduling

Processor time is split across running processes. Scheduler is responsible for stopping one process and giving a turn to the next process.

### Process ownership

Each process has a __owner (uid)__ and a __group (gid) owner__. A root process can change its uid and gid. __Setuid__ permission bit allows uid change on execve. By default, process assumes the uid of the executable file's owner. Allows normal users to access features that require privilege (sudo).

#### Userids

- __Effective userid__: all access checks use this id.
- __Real userid__: the user that logged in. after executing a setuid executble, real user remains the same but effective user becomes root.
- __Saved userid__: under certain conditions, effective uid is saved in saved uid.

A process is allowed to switch between its real, save, and effective userids.For fine grained control over different ids, use:

- `seteuid`
- `setreuid`
- `setresuid`

### Userid Vs Usernames

The file `/etc/passwd` maps userids to usernames. Similarly, group names are specified in `/etc/group`. Note that `/etc/passwd` is a public database, however, encrypted passwords are in `/etc/shadow` that can be read only by the root.

## File System

A __File__ is simply a sequence of bytes. __Directory__ is a special file that contains information about the location of files. __Path__ is a sequence of directory names followed by a file name. File implementation is done by using __Inodes__.

```
| mode      |
| owners    |
| timestaps |
| size      |
| direct block  | => | data |
| single direct | => | A | B | data | data | => | block A |, | block B |, ...
```

### Key system calls

- open: returns a file descriptor for reading/writing the file
- read, write
- mmap : map part of a file
- lseek : move file pointer to different places
- chmod
- chown

## Link vs File

__Hard link__ is like a file name, it points to the actual file. __Symlink__ is a special file that has interpreted as name of another file/dir. Path-to-file translation involves dereferencing many links. OS limits the number of symlinks travered to prevent infinite loops during lookup.

### Key systemcalls

- rename
- link, unlink
- mkdir, rmdir

## Interprocess Communication

- __Pipe__ is a unidirectional communication channel, using its syscall returns a pair of fd's, which write is in $fd[1]$ and read is in $fd[0]$. Moreover, errors are in $fd[2]$.
- __Socketpair__ is similar, but allows bidirectional communication. What is written in $fd[0]$ can be read from $fd[1]$.

### How does I/O redirection word?

Application needs no special code to support redirection. By default, all appplications read from $fd[0]$, write to $fd[1]$, and display
errors on $fd[2]$.

To redirect input from a file, simply rename the fd to 0:

```sh
dup2(orig_fd, new_fd)
```

To create a pipeline (`cat | wc`), create a pipe with endpoints $fd[0]$ and $fd[1]$, fork to create a new child that inherits these fds. Parent closes $fd[0]$ and child closes $fd[1]$.

### Socket Communication

Sockets may be used by servers or clients.

- Server steps: $create \to bind \to listen \to accept \to read/write$
- Client steps: $create \to connect \to read/write$

## Signals

Signal is a exception-related control-flow mechanism which is modelled after hardware interrupts. A signal can suspend current processing, and gets handled by a signal handler.

### Key Signals

- process control: SIGKILL, SIGTERM, SIGINT, SIGQUIT, SIGSTOP, SIGSTP, SIGCONT
- illegal memory access: SIGSEGV, SIGBUS
- low-level errors: SIGFPE, SIGILL, SIGABRT
- child exited: SIGCHLD
- timer interrupt: SIGALRM
- input/output related condition: SIGPIPE, SIGHUP
- bad system call: SIGSYS

### Signal generation, delivery and handling

There two types of signals, sync and async. Sync signal caused by program execution. While async signal genereted due to external events.

Handlers installed using signal or sigaction syscalls. These handlers use a stack that is logically distinct from the program stack.

- `SIG_IGN` (ignore)
- `SIG_DFL` (default hanlder

Signals can be blocked but there is no queue. A signal needs care because handlers execute concurrently with the program.
