# Single vs. Multithreading in Node.js (`threads.js`)

Node's Event loop is single threaded.
Some of Node Framework/Std Lib are not actually single threaded!
PBKDF2 uses 4 threads by default.

#### Can we use the threadpool for our own js code?

YES!

#### What functions in the node std library use the threadpool?

All 'f's module functions. Some crypto stuff

#### How does this threadloop stuff fit into the event loop?

Tasks running in the threadpool are `pendingOperations` in our code example

# Stepping outside the event loop (`async.js`)

#### What functions in node std library use the OS's async features?

Almost everything around networking for all OS's. Some other stuff is OS specific

#### How does this OS async stuff fit into the event loop?

Tasks using the underlying OS are reflected in our 'pendingOSTasks' array

# What happens when you run a node file?

- Node immediately executes and processes all the code inside that file.
- ANDDDD any required files, they're all executed!
- Node says "do we have any timers, system tasks, pending threadpool tasks?"
  - If we don't, program instantly exits
  - If we do, we go through a series of a few steps.
- First check to see if there are setTimeouts/setIntervals
- Check to see if any callbacks are ready to be called, tied to OS tasks or threadpool (vast majority of code written in node applications)
- Node pauses and waits for stuff to happen (a task to complete, timeout to complete)
- Run any setImmediate functions
- Handle any close events (cleanup!!! <3)
- Go back to top and repeat the entire process
- One execution of this is a tick

# Improving Node Performance

- Use Node in 'cluster mode'
  - Start up multiple copies of node that are all running your server inside them
  - Kinda like multi-threading
- Use worker threads
  - Will use threadpool from libuv
