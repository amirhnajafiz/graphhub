# Memory Errors: Exploits and Defenses

This chapter aims for memory exploits and its defenses. Although, today, compilers and programming languages are designed in a manner that are safe againts memory errors. Nevertheless, bad developing can open ways for attackers to perform their attacks.

## Memory layout in Stack

Stack is a memory that is used to store applications data. Your application has input arguments, environment variables, local variables, arrays, etc.

Here is a view of the Stack layout for your applications.

| High memory | - |
|---|---|
| argv, env   | command-line args and environment |
| stack       | generally grows downwards |
| heap        | generally grows upwards |
| bss         | uninitialized global data |
| data        | initialized global data |
| text        | read-only program code |
| __Low memory__  | _-_ |

In code example:

```c
int a = 1; // Data
int b; // BSS

// Text
int main(int argc, char **argv) /* ptr to argv */
{
    int *c; // Stack (local variable)
    c = (int *)malloc(5 * sizeof(int)); // Heap (dynamic allocation)
}
```

## Call stack (Activation Record / Stack Frame)

An activation record is created for each procedure.

Structure of stack frame:

| High memory (direction of stack growth is downgrade) |
|-------------|
| Actual parameters |
| Return value |
| Return address |
| Saved BP (base pointer / frame pointer) |
| Local variables |
| Temporary variables |

## Stack access

Most items on the stack are accessed relative to __Base Pointer__.
Typically they can get accessed using a hard-coded offset into binary.
__Stack Pointer (SP)__ moves on push/pop.
However, base pointer only moves on function call/return.

### Caller to Callee

When caller calls a callee, first it push all params onto stack in reverse order. Then it performs the following tasks in order:

1. Push base pointer onto stack. (save previous function base pointer)
2. Copy stack pointer to base pointer.
3. Reserve stack space for local vars.

### Callee to Caller

After the callee is done, it performs these tasks in order:

1. Store return value in `eax` or `rax`.
2. Reset stack to pre-call state. Destroys current stack frame, and restores caller's frame.
3. Return control back to the caller.

## Stack Smashing

Stack smashing is a attack that cases a stack buffer overflow. Typically, a program starts writing more data to a buffer than it is capable of holding. An attacker can use this attack to control the buffer.

### Defense 1: Non-executable data (DEP, NX, W XOR X)

The first defense solution is non-executable data.
Prevent execution of data to block code executes.
It counters direct code injection.
However, to pass this defense, two attacks are used, __Return to libc__ and __Return-oriented programming (ROP)__.

### Evasion 1.1: Return to libc

Use code that already is in process memory.
Because exploitable functions are there in __libc__ which is the low-level system library that is part of every program. Example:

- `system`
- `execve`

Attacker needs to control the arguments to this function. Since the attacker controls the stack contents, and the function is getting its arguments from the atack.

Typicall attack will be executed by running /bin/bash by using return to libc and controlling the arguments on stack.

### Revasion 1.2: Return-Oriented Programming (ROP)

In this technique, an attacker gains control of the call stack (stack pointer) to hijack program control flow and then executes carefully chosen machine instruction sequences that are already present in the machine's memory, called __gadgets__.

To put it in simple words, this attack involves using the stack pointer as the attacker's program counter. Then, use the victim's code as your data. Store code on stack and use gadgets to execute it in order.

### Defense 2: Stack Canary

To block the previous attacks, callee stores a __canary__ value on the stack.
Callee generates and stores a canary value on function entry. This value is checked at return. If the canary is dead, then abort the program to turn __control-flow hijack__ into __DoS (denial of service)__.

#### Canary defense issues

1. Fixed values for canary can be detected by attackers.
2. Random canary is better, but the attack can rely on a vulnerability that reveals canary value.
3. XOR canary avoids the need for an additional location. However, it breaks compatibility stack tracing and debuggers.

### ProPolice

This technique is also called contemporary canary-based defense. The goal is to change the values in the stack memory to prevent the stated attacks.

It includes the following steps:

1. Create a random canary value at process start time.
2. Protect return address and base pointer by locating canary below saved base pointer.
3. Reorder local variables so that simple variables occur after variables subject to overflow.

The stack structure after applying these steps becomes:

| High memory (direction of stack growth is downgrade) |
|-------------|
| Old stack frame |
| parameter #N |
| ... |
| parameter #1 |
| RA |
| Saved BP |
| Canary |
| Array-type local variables |
| Non-array type local variables |

### Bypassing canaries

There are some methods to bypass the canary. In order words, the attacker can still perform attacks without killing the canary.

- Indirect (aka double pointer) overwrite vulnerability. This attacks needs a dobule pointer in code to change it's pointing location to base pointer's location. Therefore, it will jump over canary.
- Brute-force attacks in which attackers try every possible value for canary until you succeed.
- Partial overwrite in which attackers guess the canary 1-byte at a time.
- Information leaks, which exploits a memory error that allows reading arbitrary memory location. A common example is __format string__ attack. When the victim contains `printf(s)` with `s` provided by attacker. Then, `printf` blindly interprets stack contents as arguments.

### Other defenses for return address

- __Shadow Stack__: In this method, we store a copy of return address in a place that is unwritable.
- __Safe Stack__: In this method, no arrays of any kind are on the stack. Already implemented into some compilers like LLVM.

## Beyond Stack Smaching

In this section, we take a look at attacks on other parts of the memory, since stack is not the only memory that is being used by applications.

### Overflows in Heap-allocated buffers

For a buffer allocated on the heap, there is no return address nearby. So, attackers should overwrite other code pointers like heap metadata or a function pointer.

#### Heap metadata overwrite

When a pointer that has not been properly initialized or has already been freed is used, it can overwrite critical heap metadata. This can corrupt the allocator's view of the heap, causing unpredictable behavior. Which is ofcourse, predictable by the attacker.

It provides a primitive to write an attacker chosen value to an attacker
chosen location. Any doubly linked list implementation has this vulnerability. Some systematic solutions are __Heap Canaries__ and __separate metadata from data__.

### Format-string vulnerabilities

Exploits code of the form to read data from attacker into a string. The key is `printf` function. `printf` usually reads memory. The `%n` primitive allows for a memory write. It writes the number of characters printed so far.

According to the `printf()` main page, here is what `%n` should do:

- The number of characters written so far is stored into the integer indicated by the `int * (or variant)` pointer argument. No argument is converted.

The primitive, write `#` of chars printed to an attacker-chosen location. Below are some format parameters which can be used and their consequences:

- `%x` Read data from the stack
- `%s` Read character strings from the process' memory
- `%p` Read strings from the process' memory
- `%n` Write an integer to locations in the process' memory

### Integer overflows

Integer overflows can take multiple forms:

- variables of different widths.
- variables of different signs.
- arithmetic overflows.

These can subvert bounds and size checks. For example, allocate a buffer smaller than needed:

```c
if (sz < n) memcpy(buf, src, sz); // a very large sz may become a negative integer!
```

### Use-after-free vulnerabilities

Most past attacks were based on out-of-bounds writes. But recently, attention is to access __use-after-free__ data by dangling pointers. The typical use in attacks is victim uses a dangling pointer to access critical data, however the block is already freed and reallocated for processing the attacker's input.

A __dangling pointer__ is a variable in a programming language that points to a memory location that is no longer valid or has been deallocated.

## Systematic study of memory errors

In this section, we are going to take a look the memory errors in a systematic view. The idea is to get a general view of memory errors.

### Memory errors

A memory error happens when an object accessed using a pointer expression is different from the one intended by the programmer. There are two types of memory errors:

- __Spatial error__: out-of-bounds access, access using a corrupted pointer, uninitialized pointer access
- __Temporal error__: access to objects that have been freed, dangling pointers, applicable to stack and heap allocated data

Most attacks used to be based on spatial errors, but today, temporal errors have become very important.

- __dobule free__
- __use-after-free__

Typical attacks involve an out-of-bounds write to corrupt a pointer. This means that most attacks rely on multiple memory errors.

- Stack Smaching: out-of-bounds write + use of a corrupted pointer as return address
- Heap Overflow: out-of-bounds write + corrupted pointer for write and corrupted pointer as target

### Overview of memory error defenses

Memory error defenses can divide into two categories:

- __Prevent memory corruption__
- __Disrupt exploits__ (guarding solutions)

### Prevent memory corruption

Detect and stop memory corruption before it happens. It is a subclass of spatial errors, where we detect access past the end of valid objects. All spatial errors can be detected by recognizing pointer arithmetic that crosses object boundaries.

### Disrupt exploits

Corruption is not stopped always. Therefore, __guarding solutions__ is the answer:

- Disrupt __corruption__
- Disrupt __take-overs__ (Randomization-based defenses)
- Disrupt __payload execution__

#### Disrupt corruption

Protet attractive targets agains common ways to corrupt them.

#### Disrupt take-overs (Control-flow hijack)

A key issue for an attack is using their controlled inputs to induce errors with predictable effects. Their approach is to exploit software bugs to overwrite critical data:

- __Relative address attacks__ (RA)
- __Absolute address attacks__ (AA)
- RA + AA attacks

In order to disrupt them, we use __Benign diversity__:

- __Preserver functional behaviour__: on benign inputs, diversified program behaves exactly like the original program.
- __Randomize attack behavior__: On inputs that exercise a bug, diversified program behaves differently from the original program.

#### Automated introduction of diversity

The idea is to use transformations that preserver program semantics. The focus is on programming language semantics, to randomize implementation aspects that aren't specified in the programming language. Examples:

- __Address Space Randomization (ASR)__: randomize memory locations of code or data objects.
- __Data Space Randomization (DSR)__: randomize low-level representation of data objects.
- __Instruction Set Randomization (ISR)__: randomize interpretation of low-level code.

Without using randomization, memory errors corrupt memory in a predictable way.This means the attacker knows the exact data item that is corrupted (RAR defense), and the correct value to use for corruption (AAR or DSR defenses)

##### Absolute Address Randomization (AAR/ASLR)

Randomize base address of data and code.

- data: stack, heap, static memory
- code: libraries and executable regions

Limits:

- Incomplete implementations
- Relative address data-only attacks
- Information leakage attacks
- Brute-force in space domain using NOP padding or __Heap spray__

Heap spray exploits compromise an application by placing shellcode onto the heap then executing it through various vectors.

##### Relative Address Randomization (RAR)

Randomize distance between static objects. This is done in compile time. Randomize distance between stack objects. Since the entropy is limited if the number of variables is small, better option is __safe stack__. Heap allocations can be randomized without help from compilers.

##### Fine-grained code randomization (RAR for code)

To make __ROP (return oriented programming)__ infeasible:

- Permute order of functions
- Randomly rearrange instructions within a function

Benefits of RAR:

- Defeats the overwrite step, as well the step that uses the overwritten pointer value.
- Provides higher entropy.
- Unlike AAR, a single information leak is insufficient to derandomize everything.

##### Data Space Randomization (DSR)

The basic idea is to randomize data representation. We XOR each data object with a distinct random mask. Therefore, effect of data corruption becomse non-deterministic. Unlike AAR, DSR protects all data, not just pointers. Effective against relative address as well as absolute address attacks. It also has a large entropy.

## Notes and Comments

- In memory exploits, sometimes the base address of the injected code is uncertain. To deal with it, the attacker uses a `NOP-sled`. A `NOP` operation jumps over instructions without doing anything.
- In a callee to caller operation, the local variables of caller will be referenced relative to `BP` (base pointer). Therefore, if the attacker wants to control the caller variables, it should change the BP to point to a different location. Moreover, the attacker can set the value of these variables relative to the new location of `BP`.
- One good solution to prevent Stack Smashing attacks is to use a __Safe Stack__. Meaning that the compiler creates two stacks: (i) a safe stack in which all of the control data and simple variable are stored, and (ii) a second stack that stores arrays, or more generally, any variable whose address is taken.
- In Heap memory defense using a Canary value, the value should be the first field in the heap block. It should have a random value that is unpredictable. And, it's value should be checked before any of the heap block fields are accessed.
- If you can somehow inject code, it can figure out the randomness. In other words, randomization does not provide much protection against malicious code; but it can protect benign programs from vulnerabilities such as buffer overflow.
- `GOT` is a table of function pointers that is used to dispatch calls to shared libraries. Typically, heap overflow attacks are used to overwrite GOT entries, say, the entry corresponding to the read system call.
