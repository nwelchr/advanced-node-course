// node myFile.js

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// New timers, tasks, operations are recorded from myFile running;
myFile.runContents();

function shouldContinue() {
  // Check one: any pending setTimeout, setInterval, setImmediate?
  // Check two: any pending OS tasks? (Like server listening to port)
  // Check three: Any ending long running operations? (Like fs/file system module)
  return (
    pendingTimers.length || pendingOSTasks.length || pendingOperations.length
  );
}
̀
// entire body executes in one 'tick'
while (shouldContinue()) {
  // 1) Node looks at pendingTimers and sees if any functions are ready to be called. setTimeout, setInterval
  // 2) Node looks at pendingOSTasks and pendingOperations and calls relevant callbacks
  // 3) Pause execution temporarily. Continue when...
  // - a new pendingOSTask is done
  // - a new pendingOperation is done
  // - a time is about to complete
  // 4) Looks at pendingTimers registered with setImmediate
  // 5) Handle any 'close' events
}

// exit back to terminal
