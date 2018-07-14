# Single vs. Multithreading in Node.js

Node's Event loop is single threaded.
Some of Node Framework/Std Lib are not actually single threaded!
PBKDF2 uses 4 threads by default.

#### Can we use the threadpool for our own js code?

YES!

#### What functions in the node std library use the threadpool?

All 'f's module functions. Some crypto stuff

#### How does this threadloop stuff fit into the event loop?

Tasks running in the threadpool are `pendingOperations` in our code example
