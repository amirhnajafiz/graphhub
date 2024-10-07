# Memory Errors: Exploits and Defenses

## Memory layout in stack

```
-- high mem
argv, env
stack : local variables

heap : dynamic memory allocation
bss : uninit global data
data : init global data
text : functions
-- low mem
```

## Call stack (Activation Record / Stack Frame)

Creates for each procedure.
Structure:

- Actual params
- Return value
- Return address
- Saved base pointer (frame pointer)
- Local variables
- Temp variables

## Stack access

Most items on the stack are accessed relative to Base pointer. A hard-coded offset into binary.
Stack pointer moves on push/pop. However, base pointer only moves on function call/return.

### Caller to Callee

1. Push base pointer onto stack. (save previous function base pointer)
2. Copy stack pointer to base pointer.
3. reserves stack space for local vars.

### Callee to Caller

1. Store return value in `eax` or `rax`.
2. Reset stack to pre-call state.
3. Return control back to the caller.

## Stack Smashing

Attacker controls the buffer.

### Defense 1: Non-executable data (DEP, NX, W XOR X)

Prevent execution of data that counters direct code injection.

### Evasion 1.1: Return to libc

Use code that already is in process memory.
libc is the low-level system library that is part of every program.
Basically running /bin/bash by using return to libc and controlling the arguments on stack.

### Revasion 1.2: Return-Oriented Programming (ROP)

Using stack pointer as the attacker's program counter.
As an attacker, don't limit yourself on one or two functions. Instead, use the victim's code as
your data. Store your code on stack and use gadgets to execute it.
Pick your code bytes from user code using these gadgets.

### Defense 2: Stack Canary

Calle generates and stores a canary value on function entry. This value is checked at return.
If the canary is dead, then abort the program. Turning control-flow hijack into DoS.

#### Canary Issues

Fixed values can be detected by attackers.
Random canary is better, but the attack can rely on a vulnerability that reveals canary value.
XOR canary avoids the need for an additional location. However, it's hard to trace and debug.

### ProPolice

1. Create a random canary value at process start time
2. Protect return address and base pointer by locating canary below saved base pointer.
3. Reorder local variables so that simple variables occur after variables subject to overflow.

Structure:

```
-- high mem
RA
Saved BP
Canary
Array type local vars
Non-array type local vars
-- low mem
```

### Bypassing canaries

- Indirect (aka double pointer) overwrite vulnerability is still an issue.
- Brute-force attacks: try every possible value for canary until you succeed.
- Partial overwrite: guess the canary 1-byte at a time
- Information leaks: using format-string vulnerability to get memory locations.

### Other defenses

- Shadow Stack: store a copy of return address
- Safe Stack: no arrays of any kind on the stack

## Beyond Stack Smaching

### Overflows in Heap-allocated buffers

Since there is no return address nearby, attackers should overwrite other code pointers like
heap metadata or a function pointer.

Heap metadata overwrite, provides a primitive to write an attacker chosen value to an attacker
chosen location.

Some systematic solutions are Heap canaries and separate metadata from data.

### Format-string vulnerabilities

Exploits code of the form to read data from attacker into a string. Since printf usual reads memory
, by passing `%n` you can get memory locations on stack.

### Integer overflows

Multiple forms:
- variables of different widths
- variables of different signs
- arithmetic overflows

### Use-after-free vulnerabilities

Attention is to access use-after-free data by dangling pointers.

## Systematic study of memory errors

### Memory errors

A memory error happens when an object accessed using a pointer expression is
different from the one intended by the programmer.

- Spatial error: out-of-bounds access, access using a corrupted pointer, uninitialized pointer access
- Temporal error: access to objects that have been freed

Most attacks used to be based on spatial errors, but today, temporal errors have
become very important.

Typical attacks involve an out-of-bounds write to corrupt a pointer.
This means that most attacks rely on multiple memory errors.

- Stack Smaching: out-of-bounds write + use of a corrupted pointer as return address
- Heap Overflow: out-of-bounds write + corrupted pointer for write and corrupted pointer as target

### Defenses

Memory error defenses can divide into two categories:

- Prevent memory corruption
- Disrupt exploits (guarding solutions)

### Prevent memory corruption

Detect and stop memory corruption before it happens.
It is a subclass of spatial errors, where we detect access past the end of valid objects.
All spatial errors can be detected by recognizing pointer arithmetic that crosses object boundaries.

### Disrupt exploits

Protect attractive targets against common ways to corrupt them.

- Disrupt corruption
- Disrupt take-overs (Randomization-based defenses)
- Disrupt payload execution

#### Disrupt take-overs (Control-flow hijack)

A key issue for an attack is using their controlled inputs to induce errors with predictable effects.
Their approach is to exploit software bugs to overwrite critical data.

- Relative address attacks (RA)
- Absolute address attacks (AA)
- RA + AA attacks

In order to disrupt them, we use __benign diversity__.

- Preserver functional behaviour
- Randomize attack behavior

#### Automated introduction of diversity

The idea is to use transformations that preserver program semantics.
The focus is on programming language semantics.

- Address Space Randomization (ASR)
- Data Space Randomization (DSR)
- Instruction Set Randomization (ISR)

Without using randomization, memory errors corrupt memory in a predictable way.
This means the attacker knows the exact data item that is corrupted (RAR defense),
and the correct value to use for corruption (AAR or DSR defenses)

##### Absolute Address Randomization (AAR/ASLR)

Randomize base address of data and code.

- data: stack, heap, static memory
- code: libraries and executable regions

Limits:

- Relative address data-only attacks
- Information leakage attacks
- Brute-force in space domain using NOP padding or Heap spray

##### Relative Address Randomization (RAR)

Randomize distance between static objects.
This is done in compile time.
Randomize distance between stack objects.

To make ROP (return oriented programming) infeasible:

- Permute order of functions
- Randomly rearrange instructions within a function

Benefits of RAR:

- Defeats the overwrite step, as well the step that uses the overwritten pointer value
- Provides higher entropy
- Unlike AAR, a single information leak is insufficient to derandomize everything

##### Data Space Randomization (DSR)

The basic idea is to randomize data representation.
We XOR each data object with a distinct random mask.
Therefore, effect of data corruption becomse non-deterministic.

Unlike AAR, DSR protects all data, not just pointers.

