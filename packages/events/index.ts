import EventEmitter, { errorMonitor } from "node:events";

// const emitter = new EventEmitter();

// emitter.on("event", (...eventName) => {
//   console.log("event fired:", eventName);
// });

// emitter.once("event", (...eventName) => {
//   console.log("event fired once:", eventName);
// });

// emitter.prependListener("event", (...eventName) => {
//   console.log("event fired prepend:", eventName);
// });

// emitter.emit("event", "hello");
// emitter.emit("event", "world", "again");
// emitter.emit("event");





class MyEmitter extends EventEmitter {

  constructor() {
    super();


    this.prependListener("event:hello", (...eventName) => {
      console.log("my event fired prepend:", eventName);
    });


    this.on("event:hello", (...eventName) => {
      console.log("called inside class event:hello fired:", eventName);
    })
  }

  sayHello() {
    this.emit("event:hello", { name: "utkarsh" }, "hello", "world");
  }

}
const myEmitter = new MyEmitter();


/**
 * This will return an array of all the event names,
 * including those inherited from parent classes and also outside of the current class
 */
// myEmitter.on("event:hello1", console.log)
// console.log(myEmitter.eventNames())


// =====================================================================



// myEmitter.on("event:hello", console.log);
// myEmitter.on("event:hello", console.log);
// myEmitter.on("event:hello", console.log);
// myEmitter.on("event:hello", console.log);
// myEmitter.on("event:hello", console.log);
// myEmitter.on("event:hello", console.log);
// myEmitter.on("event:hello", console.log);
// myEmitter.on("event:hello", console.log);
// myEmitter.on("event:hello", console.log);
// myEmitter.on("event:hello", console.log);
// myEmitter.on("event:hello", console.log);
// myEmitter.on("event:hello", console.log);
// myEmitter.on("event:hello", console.log);
// myEmitter.on("event:hello", console.log);


/**
 * .getMaxListeners() = 10 , by default
 * But its not an hard limit which will prevent you from adding more listeners
 * it will just warn you that you are about to exceed the limit
 */
// console.log("max listeners count:", myEmitter.getMaxListeners()) // <-- 10
// console.log("actual listeners count:", myEmitter.listenerCount("event:hello")) // <-- 15


// =====================================================================


/**
 * To you .off() you need to pass the listener function reference
 */

// const eventHelloListener = (...eventName: any[]) => {
//   console.log("called outside class event:hello fired:", eventName);
// }
// myEmitter.on("event:hello", eventHelloListener);
// myEmitter.off("event:hello", eventHelloListener);


// =====================================================================

/**
 * you can modify the event data (object like) inside .prependListener()
 */

// myEmitter.prependListener("event:hello", (...eventName) => {
//   console.log("modify the event data:", eventName);
//   eventName[0].name = "anand";
// });


// =====================================================================
/**
 * .removeAllListeners() will remove all the listeners
 */
// myEmitter.removeAllListeners();


// =====================================================================

/**
 * async events
 * you can use await inside async events
 * but all the async events will be executed in parallel
 * 
 * log:
 * [nodemon] restarting due to changes...
[nodemon] starting `ts-node index.ts`
my event fired prepend: [ { name: 'utkarsh' }, 'hello', 'world' ]
called inside class event:hello fired: [ { name: 'utkarsh' }, 'hello', 'world' ]
async event fired 2: [ 'async hello' ]
async event fired 2: [ 'async hello' ]
async event fired: [ 'async hello' ]
async event fired: [ 'async hello' ]
[nodemon] clean exit - waiting for changes before restart
 */

// myEmitter.on("async:call", async (...eventName) => {
//   await new Promise(resolve => setTimeout(resolve, 4000));
//   console.log("async event fired:", eventName);
// })

// myEmitter.on("async:call", async (...eventName) => {
//   await new Promise(resolve => setTimeout(resolve, 1000));
//   console.log("async event fired 2:", eventName);
// })

// myEmitter.emit("async:call", "async hello");
// myEmitter.emit("async:call", "async hello");


// =====================================================================


// myEmitter.on(
//   errorMonitor, // <-- equivalent to .on("error", ...) but this will crash the Node.js process
//   (...eventParams) => {
//     console.log("error event fired:", eventParams);
//   });

// myEmitter.on(
//   "error", // this will not crash the Node.js process
//   (...eventParams) => {
//     console.log("error event fired:", eventParams);
//   });

// myEmitter.on("test:error", (...eventParams) => {
//   // throw new Error("error throw inside event"); // <-- this will crash the Node.js process
//   myEmitter.emit("error", new Error("custom error message")); // <-- this will not crash the Node.js process, if you listen .on("error")
// })



// myEmitter.emit("test:error", "error data");


myEmitter.sayHello();