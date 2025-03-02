import EventEmitter from "node:events";

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

myEmitter.sayHello();