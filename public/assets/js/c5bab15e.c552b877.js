"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[105],{1851:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>i,metadata:()=>o,toc:()=>c});var t=n(4848),s=n(8453);const i={},a="Memory Errors: Exploits and Defenses",o={id:"System Security/memerr-rand",title:"Memory Errors: Exploits and Defenses",description:"This chapter aims for memory exploits and its defenses. Although, today, compilers and programming languages are designed in a manner that are safe againts memory errors. Nevertheless, bad developing can open ways for attackers to perform their attacks.",source:"@site/docs/System Security/1_memerr-rand.md",sourceDirName:"System Security",slug:"/System Security/memerr-rand",permalink:"/graphhub/docs/System Security/memerr-rand",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Computer Systems Security",permalink:"/graphhub/docs/System Security/intro"},next:{title:"Processor and Virtual Machine Security",permalink:"/graphhub/docs/System Security/vm"}},l={},c=[{value:"Memory layout in Stack",id:"memory-layout-in-stack",level:2},{value:"Call stack (Activation Record / Stack Frame)",id:"call-stack-activation-record--stack-frame",level:2},{value:"Stack access",id:"stack-access",level:2},{value:"Caller to Callee",id:"caller-to-callee",level:3},{value:"Callee to Caller",id:"callee-to-caller",level:3},{value:"Stack Smashing",id:"stack-smashing",level:2},{value:"Defense 1: Non-executable data (DEP, NX, W XOR X)",id:"defense-1-non-executable-data-dep-nx-w-xor-x",level:3},{value:"Evasion 1.1: Return to libc",id:"evasion-11-return-to-libc",level:3},{value:"Revasion 1.2: Return-Oriented Programming (ROP)",id:"revasion-12-return-oriented-programming-rop",level:3},{value:"Defense 2: Stack Canary",id:"defense-2-stack-canary",level:3},{value:"Canary defense issues",id:"canary-defense-issues",level:4},{value:"ProPolice",id:"propolice",level:3},{value:"Bypassing canaries",id:"bypassing-canaries",level:3},{value:"Other defenses for return address",id:"other-defenses-for-return-address",level:3},{value:"Beyond Stack Smaching",id:"beyond-stack-smaching",level:2},{value:"Overflows in Heap-allocated buffers",id:"overflows-in-heap-allocated-buffers",level:3},{value:"Heap metadata overwrite",id:"heap-metadata-overwrite",level:4},{value:"Format-string vulnerabilities",id:"format-string-vulnerabilities",level:3},{value:"Integer overflows",id:"integer-overflows",level:3},{value:"Use-after-free vulnerabilities",id:"use-after-free-vulnerabilities",level:3},{value:"Systematic study of memory errors",id:"systematic-study-of-memory-errors",level:2},{value:"Memory errors",id:"memory-errors",level:3},{value:"Overview of memory error defenses",id:"overview-of-memory-error-defenses",level:3},{value:"Prevent memory corruption",id:"prevent-memory-corruption",level:3},{value:"Disrupt exploits",id:"disrupt-exploits",level:3},{value:"Disrupt corruption",id:"disrupt-corruption",level:4},{value:"Disrupt take-overs (Control-flow hijack)",id:"disrupt-take-overs-control-flow-hijack",level:4},{value:"Automated introduction of diversity",id:"automated-introduction-of-diversity",level:4},{value:"Absolute Address Randomization (AAR/ASLR)",id:"absolute-address-randomization-aaraslr",level:5},{value:"Relative Address Randomization (RAR)",id:"relative-address-randomization-rar",level:5},{value:"Fine-grained code randomization (RAR for code)",id:"fine-grained-code-randomization-rar-for-code",level:5},{value:"Data Space Randomization (DSR)",id:"data-space-randomization-dsr",level:5}];function d(e){const r={code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.header,{children:(0,t.jsx)(r.h1,{id:"memory-errors-exploits-and-defenses",children:"Memory Errors: Exploits and Defenses"})}),"\n",(0,t.jsx)(r.p,{children:"This chapter aims for memory exploits and its defenses. Although, today, compilers and programming languages are designed in a manner that are safe againts memory errors. Nevertheless, bad developing can open ways for attackers to perform their attacks."}),"\n",(0,t.jsx)(r.h2,{id:"memory-layout-in-stack",children:"Memory layout in Stack"}),"\n",(0,t.jsx)(r.p,{children:"Stack is a memory that is used to store applications data. Your application has input arguments, environment variables, local variables, arrays, etc."}),"\n",(0,t.jsx)(r.p,{children:"Here is a view of the Stack layout for your applications."}),"\n",(0,t.jsxs)(r.table,{children:[(0,t.jsx)(r.thead,{children:(0,t.jsxs)(r.tr,{children:[(0,t.jsx)(r.th,{children:"High memory"}),(0,t.jsx)(r.th,{children:"-"})]})}),(0,t.jsxs)(r.tbody,{children:[(0,t.jsxs)(r.tr,{children:[(0,t.jsx)(r.td,{children:"argv, env"}),(0,t.jsx)(r.td,{children:"command-line args and environment"})]}),(0,t.jsxs)(r.tr,{children:[(0,t.jsx)(r.td,{children:"stack"}),(0,t.jsx)(r.td,{children:"generally grows downwards"})]}),(0,t.jsxs)(r.tr,{children:[(0,t.jsx)(r.td,{children:"heap"}),(0,t.jsx)(r.td,{children:"generally grows upwards"})]}),(0,t.jsxs)(r.tr,{children:[(0,t.jsx)(r.td,{children:"bss"}),(0,t.jsx)(r.td,{children:"uninitialized global data"})]}),(0,t.jsxs)(r.tr,{children:[(0,t.jsx)(r.td,{children:"data"}),(0,t.jsx)(r.td,{children:"initialized global data"})]}),(0,t.jsxs)(r.tr,{children:[(0,t.jsx)(r.td,{children:"text"}),(0,t.jsx)(r.td,{children:"read-only program code"})]}),(0,t.jsxs)(r.tr,{children:[(0,t.jsx)(r.td,{children:(0,t.jsx)(r.strong,{children:"Low memory"})}),(0,t.jsx)(r.td,{children:(0,t.jsx)(r.em,{children:"-"})})]})]})]}),"\n",(0,t.jsx)(r.p,{children:"In code example:"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-c",children:"int a = 1; // Data\r\nint b; // BSS\r\n\r\n// Text\r\nint main(int argc, char **argv) /* ptr to argv */\r\n{\r\n    int *c; // Stack (local variable)\r\n    c = (int *)malloc(5 * sizeof(int)); // Heap (dynamic allocation)\r\n}\n"})}),"\n",(0,t.jsx)(r.h2,{id:"call-stack-activation-record--stack-frame",children:"Call stack (Activation Record / Stack Frame)"}),"\n",(0,t.jsx)(r.p,{children:"An activation record is created for each procedure."}),"\n",(0,t.jsx)(r.p,{children:"Structure of stack frame:"}),"\n",(0,t.jsxs)(r.table,{children:[(0,t.jsx)(r.thead,{children:(0,t.jsx)(r.tr,{children:(0,t.jsx)(r.th,{children:"High memory (direction of stack growth is downgrade)"})})}),(0,t.jsxs)(r.tbody,{children:[(0,t.jsx)(r.tr,{children:(0,t.jsx)(r.td,{children:"Actual parameters"})}),(0,t.jsx)(r.tr,{children:(0,t.jsx)(r.td,{children:"Return value"})}),(0,t.jsx)(r.tr,{children:(0,t.jsx)(r.td,{children:"Return address"})}),(0,t.jsx)(r.tr,{children:(0,t.jsx)(r.td,{children:"Saved BP (base pointer / frame pointer)"})}),(0,t.jsx)(r.tr,{children:(0,t.jsx)(r.td,{children:"Local variables"})}),(0,t.jsx)(r.tr,{children:(0,t.jsx)(r.td,{children:"Temporary variables"})})]})]}),"\n",(0,t.jsx)(r.h2,{id:"stack-access",children:"Stack access"}),"\n",(0,t.jsxs)(r.p,{children:["Most items on the stack are accessed relative to ",(0,t.jsx)(r.strong,{children:"Base Pointer"}),".\r\nTypically they can get accessed using a hard-coded offset into binary.\r\n",(0,t.jsx)(r.strong,{children:"Stack Pointer (SP)"})," moves on push/pop.\r\nHowever, base pointer only moves on function call/return."]}),"\n",(0,t.jsx)(r.h3,{id:"caller-to-callee",children:"Caller to Callee"}),"\n",(0,t.jsx)(r.p,{children:"When caller calls a callee, first it push all params onto stack in reverse order. Then it performs the following tasks in order:"}),"\n",(0,t.jsxs)(r.ol,{children:["\n",(0,t.jsx)(r.li,{children:"Push base pointer onto stack. (save previous function base pointer)"}),"\n",(0,t.jsx)(r.li,{children:"Copy stack pointer to base pointer."}),"\n",(0,t.jsx)(r.li,{children:"Reserve stack space for local vars."}),"\n"]}),"\n",(0,t.jsx)(r.h3,{id:"callee-to-caller",children:"Callee to Caller"}),"\n",(0,t.jsx)(r.p,{children:"After the callee is done, it performs these tasks in order:"}),"\n",(0,t.jsxs)(r.ol,{children:["\n",(0,t.jsxs)(r.li,{children:["Store return value in ",(0,t.jsx)(r.code,{children:"eax"})," or ",(0,t.jsx)(r.code,{children:"rax"}),"."]}),"\n",(0,t.jsx)(r.li,{children:"Reset stack to pre-call state. Destroys current stack frame, and restores caller's frame."}),"\n",(0,t.jsx)(r.li,{children:"Return control back to the caller."}),"\n"]}),"\n",(0,t.jsx)(r.h2,{id:"stack-smashing",children:"Stack Smashing"}),"\n",(0,t.jsx)(r.p,{children:"Stack smashing is a attack that cases a stack buffer overflow. Typically, a program starts writing more data to a buffer than it is capable of holding. An attacker can use this attack to control the buffer."}),"\n",(0,t.jsx)(r.h3,{id:"defense-1-non-executable-data-dep-nx-w-xor-x",children:"Defense 1: Non-executable data (DEP, NX, W XOR X)"}),"\n",(0,t.jsxs)(r.p,{children:["The first defense solution is non-executable data.\r\nPrevent execution of data to block code executes.\r\nIt counters direct code injection.\r\nHowever, to pass this defense, two attacks are used, ",(0,t.jsx)(r.strong,{children:"Return to libc"})," and ",(0,t.jsx)(r.strong,{children:"Return-oriented programming (ROP)"}),"."]}),"\n",(0,t.jsx)(r.h3,{id:"evasion-11-return-to-libc",children:"Evasion 1.1: Return to libc"}),"\n",(0,t.jsxs)(r.p,{children:["Use code that already is in process memory.\r\nBecause exploitable functions are there in ",(0,t.jsx)(r.strong,{children:"libc"})," which is the low-level system library that is part of every program. Example:"]}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:(0,t.jsx)(r.code,{children:"system"})}),"\n",(0,t.jsx)(r.li,{children:(0,t.jsx)(r.code,{children:"execve"})}),"\n"]}),"\n",(0,t.jsx)(r.p,{children:"Attacker needs to control the arguments to this function. Since the attacker controls the stack contents, and the function is getting its arguments from the atack."}),"\n",(0,t.jsx)(r.p,{children:"Typicall attack will be executed by running /bin/bash by using return to libc and controlling the arguments on stack."}),"\n",(0,t.jsx)(r.h3,{id:"revasion-12-return-oriented-programming-rop",children:"Revasion 1.2: Return-Oriented Programming (ROP)"}),"\n",(0,t.jsxs)(r.p,{children:["In this technique, an attacker gains control of the call stack (stack pointer) to hijack program control flow and then executes carefully chosen machine instruction sequences that are already present in the machine's memory, called ",(0,t.jsx)(r.strong,{children:"gadgets"}),"."]}),"\n",(0,t.jsx)(r.p,{children:"To put it in simple words, this attack involves using the stack pointer as the attacker's program counter. Then, use the victim's code as your data. Store code on stack and use gadgets to execute it in order."}),"\n",(0,t.jsx)(r.h3,{id:"defense-2-stack-canary",children:"Defense 2: Stack Canary"}),"\n",(0,t.jsxs)(r.p,{children:["To block the previous attacks, callee stores a ",(0,t.jsx)(r.strong,{children:"canary"})," value on the stack.\r\nCallee generates and stores a canary value on function entry. This value is checked at return. If the canary is dead, then abort the program to turn ",(0,t.jsx)(r.strong,{children:"control-flow hijack"})," into ",(0,t.jsx)(r.strong,{children:"DoS (denial of service)"}),"."]}),"\n",(0,t.jsx)(r.h4,{id:"canary-defense-issues",children:"Canary defense issues"}),"\n",(0,t.jsxs)(r.ol,{children:["\n",(0,t.jsx)(r.li,{children:"Fixed values for canary can be detected by attackers."}),"\n",(0,t.jsx)(r.li,{children:"Random canary is better, but the attack can rely on a vulnerability that reveals canary value."}),"\n",(0,t.jsx)(r.li,{children:"XOR canary avoids the need for an additional location. However, it breaks compatibility stack tracing and debuggers."}),"\n"]}),"\n",(0,t.jsx)(r.h3,{id:"propolice",children:"ProPolice"}),"\n",(0,t.jsx)(r.p,{children:"This technique is also called contemporary canary-based defense. The goal is to change the values in the stack memory to prevent the stated attacks."}),"\n",(0,t.jsx)(r.p,{children:"It includes the following steps:"}),"\n",(0,t.jsxs)(r.ol,{children:["\n",(0,t.jsx)(r.li,{children:"Create a random canary value at process start time."}),"\n",(0,t.jsx)(r.li,{children:"Protect return address and base pointer by locating canary below saved base pointer."}),"\n",(0,t.jsx)(r.li,{children:"Reorder local variables so that simple variables occur after variables subject to overflow."}),"\n"]}),"\n",(0,t.jsx)(r.p,{children:"The stack structure after applying these steps becomes:"}),"\n",(0,t.jsxs)(r.table,{children:[(0,t.jsx)(r.thead,{children:(0,t.jsx)(r.tr,{children:(0,t.jsx)(r.th,{children:"High memory (direction of stack growth is downgrade)"})})}),(0,t.jsxs)(r.tbody,{children:[(0,t.jsx)(r.tr,{children:(0,t.jsx)(r.td,{children:"Old stack frame"})}),(0,t.jsx)(r.tr,{children:(0,t.jsx)(r.td,{children:"parameter #N"})}),(0,t.jsx)(r.tr,{children:(0,t.jsx)(r.td,{children:"..."})}),(0,t.jsx)(r.tr,{children:(0,t.jsx)(r.td,{children:"parameter #1"})}),(0,t.jsx)(r.tr,{children:(0,t.jsx)(r.td,{children:"RA"})}),(0,t.jsx)(r.tr,{children:(0,t.jsx)(r.td,{children:"Saved BP"})}),(0,t.jsx)(r.tr,{children:(0,t.jsx)(r.td,{children:"Canary"})}),(0,t.jsx)(r.tr,{children:(0,t.jsx)(r.td,{children:"Array-type local variables"})}),(0,t.jsx)(r.tr,{children:(0,t.jsx)(r.td,{children:"Non-array type local variables"})})]})]}),"\n",(0,t.jsx)(r.h3,{id:"bypassing-canaries",children:"Bypassing canaries"}),"\n",(0,t.jsx)(r.p,{children:"There are some methods to bypass the canary. In order words, the attacker can still perform attacks without killing the canary."}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:"Indirect (aka double pointer) overwrite vulnerability. This attacks needs a dobule pointer in code to change it's pointing location to base pointer's location. Therefore, it will jump over canary."}),"\n",(0,t.jsx)(r.li,{children:"Brute-force attacks in which attackers try every possible value for canary until you succeed."}),"\n",(0,t.jsx)(r.li,{children:"Partial overwrite in which attackers guess the canary 1-byte at a time."}),"\n",(0,t.jsxs)(r.li,{children:["Information leaks, which exploits a memory error that allows reading arbitrary memory location. A common example is ",(0,t.jsx)(r.strong,{children:"format string"})," attack. When the victim contains ",(0,t.jsx)(r.code,{children:"printf(s)"})," with ",(0,t.jsx)(r.code,{children:"s"})," provided by attacker. Then, ",(0,t.jsx)(r.code,{children:"printf"})," blindly interprets stack contents as arguments."]}),"\n"]}),"\n",(0,t.jsx)(r.h3,{id:"other-defenses-for-return-address",children:"Other defenses for return address"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.strong,{children:"Shadow Stack"}),": In this method, we store a copy of return address in a place that is unwritable."]}),"\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.strong,{children:"Safe Stack"}),": In this method, no arrays of any kind are on the stack. Already implemented into some compilers like LLVM."]}),"\n"]}),"\n",(0,t.jsx)(r.h2,{id:"beyond-stack-smaching",children:"Beyond Stack Smaching"}),"\n",(0,t.jsx)(r.p,{children:"In this section, we take a look at attacks on other parts of the memory, since stack is not the only memory that is being used by applications."}),"\n",(0,t.jsx)(r.h3,{id:"overflows-in-heap-allocated-buffers",children:"Overflows in Heap-allocated buffers"}),"\n",(0,t.jsx)(r.p,{children:"For a buffer allocated on the heap, there is no return address nearby. So, attackers should overwrite other code pointers like heap metadata or a function pointer."}),"\n",(0,t.jsx)(r.h4,{id:"heap-metadata-overwrite",children:"Heap metadata overwrite"}),"\n",(0,t.jsx)(r.p,{children:"When a pointer that has not been properly initialized or has already been freed is used, it can overwrite critical heap metadata. This can corrupt the allocator's view of the heap, causing unpredictable behavior. Which is ofcourse, predictable by the attacker."}),"\n",(0,t.jsxs)(r.p,{children:["It provides a primitive to write an attacker chosen value to an attacker\r\nchosen location. Any doubly linked list implementation has this vulnerability. Some systematic solutions are ",(0,t.jsx)(r.strong,{children:"Heap Canaries"})," and ",(0,t.jsx)(r.strong,{children:"separate metadata from data"}),"."]}),"\n",(0,t.jsx)(r.h3,{id:"format-string-vulnerabilities",children:"Format-string vulnerabilities"}),"\n",(0,t.jsxs)(r.p,{children:["Exploits code of the form to read data from attacker into a string. The key is ",(0,t.jsx)(r.code,{children:"printf"})," function. ",(0,t.jsx)(r.code,{children:"printf"})," usually reads memory. The ",(0,t.jsx)(r.code,{children:"%n"})," primitive allows for a memory write. It writes the number of characters printed so far."]}),"\n",(0,t.jsxs)(r.p,{children:["According to the ",(0,t.jsx)(r.code,{children:"printf()"})," main page, here is what ",(0,t.jsx)(r.code,{children:"%n"})," should do:"]}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsxs)(r.li,{children:["The number of characters written so far is stored into the integer indicated by the ",(0,t.jsx)(r.code,{children:"int * (or variant)"})," pointer argument. No argument is converted."]}),"\n"]}),"\n",(0,t.jsxs)(r.p,{children:["The primitive, write ",(0,t.jsx)(r.code,{children:"#"})," of chars printed to an attacker-chosen location. Below are some format parameters which can be used and their consequences:"]}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.code,{children:"%x"})," Read data from the stack"]}),"\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.code,{children:"%s"})," Read character strings from the process' memory"]}),"\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.code,{children:"%p"})," Read strings from the process' memory"]}),"\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.code,{children:"%n"})," Write an integer to locations in the process' memory"]}),"\n"]}),"\n",(0,t.jsx)(r.h3,{id:"integer-overflows",children:"Integer overflows"}),"\n",(0,t.jsx)(r.p,{children:"Integer overflows can take multiple forms:"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:"variables of different widths."}),"\n",(0,t.jsx)(r.li,{children:"variables of different signs."}),"\n",(0,t.jsx)(r.li,{children:"arithmetic overflows."}),"\n"]}),"\n",(0,t.jsx)(r.p,{children:"These can subvert bounds and size checks. For example, allocate a buffer smaller than needed:"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-c",children:"if (sz < n) memcpy(buf, src, sz); // a very large sz may become a negative integer!\n"})}),"\n",(0,t.jsx)(r.h3,{id:"use-after-free-vulnerabilities",children:"Use-after-free vulnerabilities"}),"\n",(0,t.jsxs)(r.p,{children:["Most past attacks were based on out-of-bounds writes. But recently, attention is to access ",(0,t.jsx)(r.strong,{children:"use-after-free"})," data by dangling pointers. The typical use in attacks is victim uses a dangling pointer to access critical data, however the block is already freed and reallocated for processing the attacker's input."]}),"\n",(0,t.jsxs)(r.p,{children:["A ",(0,t.jsx)(r.strong,{children:"dangling pointer"})," is a variable in a programming language that points to a memory location that is no longer valid or has been deallocated."]}),"\n",(0,t.jsx)(r.h2,{id:"systematic-study-of-memory-errors",children:"Systematic study of memory errors"}),"\n",(0,t.jsx)(r.p,{children:"In this section, we are going to take a look the memory errors in a systematic view. The idea is to get a general view of memory errors."}),"\n",(0,t.jsx)(r.h3,{id:"memory-errors",children:"Memory errors"}),"\n",(0,t.jsx)(r.p,{children:"A memory error happens when an object accessed using a pointer expression is different from the one intended by the programmer. There are two types of memory errors:"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.strong,{children:"Spatial error"}),": out-of-bounds access, access using a corrupted pointer, uninitialized pointer access"]}),"\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.strong,{children:"Temporal error"}),": access to objects that have been freed, dangling pointers, applicable to stack and heap allocated data"]}),"\n"]}),"\n",(0,t.jsx)(r.p,{children:"Most attacks used to be based on spatial errors, but today, temporal errors have become very important."}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:(0,t.jsx)(r.strong,{children:"dobule free"})}),"\n",(0,t.jsx)(r.li,{children:(0,t.jsx)(r.strong,{children:"use-after-free"})}),"\n"]}),"\n",(0,t.jsx)(r.p,{children:"Typical attacks involve an out-of-bounds write to corrupt a pointer. This means that most attacks rely on multiple memory errors."}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:"Stack Smaching: out-of-bounds write + use of a corrupted pointer as return address"}),"\n",(0,t.jsx)(r.li,{children:"Heap Overflow: out-of-bounds write + corrupted pointer for write and corrupted pointer as target"}),"\n"]}),"\n",(0,t.jsx)(r.h3,{id:"overview-of-memory-error-defenses",children:"Overview of memory error defenses"}),"\n",(0,t.jsx)(r.p,{children:"Memory error defenses can divide into two categories:"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:(0,t.jsx)(r.strong,{children:"Prevent memory corruption"})}),"\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.strong,{children:"Disrupt exploits"})," (guarding solutions)"]}),"\n"]}),"\n",(0,t.jsx)(r.h3,{id:"prevent-memory-corruption",children:"Prevent memory corruption"}),"\n",(0,t.jsx)(r.p,{children:"Detect and stop memory corruption before it happens. It is a subclass of spatial errors, where we detect access past the end of valid objects. All spatial errors can be detected by recognizing pointer arithmetic that crosses object boundaries."}),"\n",(0,t.jsx)(r.h3,{id:"disrupt-exploits",children:"Disrupt exploits"}),"\n",(0,t.jsxs)(r.p,{children:["Corruption is not stopped always. Therefore, ",(0,t.jsx)(r.strong,{children:"guarding solutions"})," is the answer:"]}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsxs)(r.li,{children:["Disrupt ",(0,t.jsx)(r.strong,{children:"corruption"})]}),"\n",(0,t.jsxs)(r.li,{children:["Disrupt ",(0,t.jsx)(r.strong,{children:"take-overs"})," (Randomization-based defenses)"]}),"\n",(0,t.jsxs)(r.li,{children:["Disrupt ",(0,t.jsx)(r.strong,{children:"payload execution"})]}),"\n"]}),"\n",(0,t.jsx)(r.h4,{id:"disrupt-corruption",children:"Disrupt corruption"}),"\n",(0,t.jsx)(r.p,{children:"Protet attractive targets agains common ways to corrupt them."}),"\n",(0,t.jsx)(r.h4,{id:"disrupt-take-overs-control-flow-hijack",children:"Disrupt take-overs (Control-flow hijack)"}),"\n",(0,t.jsx)(r.p,{children:"A key issue for an attack is using their controlled inputs to induce errors with predictable effects. Their approach is to exploit software bugs to overwrite critical data:"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.strong,{children:"Relative address attacks"})," (RA)"]}),"\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.strong,{children:"Absolute address attacks"})," (AA)"]}),"\n",(0,t.jsx)(r.li,{children:"RA + AA attacks"}),"\n"]}),"\n",(0,t.jsxs)(r.p,{children:["In order to disrupt them, we use ",(0,t.jsx)(r.strong,{children:"Benign diversity"}),":"]}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.strong,{children:"Preserver functional behaviour"}),": on benign inputs, diversified program behaves exactly like the original program."]}),"\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.strong,{children:"Randomize attack behavior"}),": On inputs that exercise a bug, diversified program behaves differently from the original program."]}),"\n"]}),"\n",(0,t.jsx)(r.h4,{id:"automated-introduction-of-diversity",children:"Automated introduction of diversity"}),"\n",(0,t.jsx)(r.p,{children:"The idea is to use transformations that preserver program semantics. The focus is on programming language semantics, to randomize implementation aspects that aren't specified in the programming language. Examples:"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.strong,{children:"Address Space Randomization (ASR)"}),": randomize memory locations of code or data objects."]}),"\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.strong,{children:"Data Space Randomization (DSR)"}),": randomize low-level representation of data objects."]}),"\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.strong,{children:"Instruction Set Randomization (ISR)"}),": randomize interpretation of low-level code."]}),"\n"]}),"\n",(0,t.jsx)(r.p,{children:"Without using randomization, memory errors corrupt memory in a predictable way.This means the attacker knows the exact data item that is corrupted (RAR defense), and the correct value to use for corruption (AAR or DSR defenses)"}),"\n",(0,t.jsx)(r.h5,{id:"absolute-address-randomization-aaraslr",children:"Absolute Address Randomization (AAR/ASLR)"}),"\n",(0,t.jsx)(r.p,{children:"Randomize base address of data and code."}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:"data: stack, heap, static memory"}),"\n",(0,t.jsx)(r.li,{children:"code: libraries and executable regions"}),"\n"]}),"\n",(0,t.jsx)(r.p,{children:"Limits:"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:"Incomplete implementations"}),"\n",(0,t.jsx)(r.li,{children:"Relative address data-only attacks"}),"\n",(0,t.jsx)(r.li,{children:"Information leakage attacks"}),"\n",(0,t.jsxs)(r.li,{children:["Brute-force in space domain using NOP padding or ",(0,t.jsx)(r.strong,{children:"Heap spray"})]}),"\n"]}),"\n",(0,t.jsx)(r.p,{children:"Heap spray exploits compromise an application by placing shellcode onto the heap then executing it through various vectors."}),"\n",(0,t.jsx)(r.h5,{id:"relative-address-randomization-rar",children:"Relative Address Randomization (RAR)"}),"\n",(0,t.jsxs)(r.p,{children:["Randomize distance between static objects. This is done in compile time. Randomize distance between stack objects. Since the entropy is limited if the number of variables is small, better option is ",(0,t.jsx)(r.strong,{children:"safe stack"}),". Heap allocations can be randomized without help from compilers."]}),"\n",(0,t.jsx)(r.h5,{id:"fine-grained-code-randomization-rar-for-code",children:"Fine-grained code randomization (RAR for code)"}),"\n",(0,t.jsxs)(r.p,{children:["To make ",(0,t.jsx)(r.strong,{children:"ROP (return oriented programming)"})," infeasible:"]}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:"Permute order of functions"}),"\n",(0,t.jsx)(r.li,{children:"Randomly rearrange instructions within a function"}),"\n"]}),"\n",(0,t.jsx)(r.p,{children:"Benefits of RAR:"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:"Defeats the overwrite step, as well the step that uses the overwritten pointer value."}),"\n",(0,t.jsx)(r.li,{children:"Provides higher entropy."}),"\n",(0,t.jsx)(r.li,{children:"Unlike AAR, a single information leak is insufficient to derandomize everything."}),"\n"]}),"\n",(0,t.jsx)(r.h5,{id:"data-space-randomization-dsr",children:"Data Space Randomization (DSR)"}),"\n",(0,t.jsx)(r.p,{children:"The basic idea is to randomize data representation. We XOR each data object with a distinct random mask. Therefore, effect of data corruption becomse non-deterministic. Unlike AAR, DSR protects all data, not just pointers. Effective against relative address as well as absolute address attacks. It also has a large entropy."})]})}function h(e={}){const{wrapper:r}={...(0,s.R)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,r,n)=>{n.d(r,{R:()=>a,x:()=>o});var t=n(6540);const s={},i=t.createContext(s);function a(e){const r=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function o(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),t.createElement(i.Provider,{value:r},e.children)}}}]);