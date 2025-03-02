import { createMachine, assign, createActor } from 'xstate';

// const countMachine = createMachine({
//   /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAYgEkA5AYQG0AGAXUVAAcB7WXAF1zf2ZAAPRACYA7ADoArABYAbAA4xUgDQgAnqLoyJATjpyRUgL7G1aLHkKkAIgFFajAe048+A4QnHT5S1RsQARjoFCRkpAGZAo1NzDBwCYhIAZTsAFXomJBAXbl5+bM9vWUVlNU0EaNMzEHw2CDgBCwTrZw4890KgsXLECIMJCKldCOVq4yA */
//   context: {
//     count: 0,
//   },
//   on: {
//     INC: {
//       actions: assign({
//         count: ({ context, event }) => context.count + (event.value ?? 1),
//       }),
//     },
//     DEC: {
//       actions: assign({
//         count: ({ context }) => context.count - 1,
//       }),
//     },
//     SET: {
//       actions: assign({
//         count: ({ event }) => event.value,
//       }),
//     },
//   },
// });

// const countActor = createActor(countMachine).start();

// countActor.subscribe((state) => {
//   console.log(state.context.count);
// });

// countActor.send({ type: 'INC', value: 10 });
// // logs 1
// countActor.send({ type: 'DEC' });
// // logs 0
// countActor.send({ type: 'SET', value: 10 });
// // logs 10




const textMachine = createMachine({
  context: {
    committedValue: '',
    value: '',
  },
  initial: 'reading',
  states: {
    reading: {
      on: {
        'text.edit': { target: 'editing' },
      },
    },
    editing: {
      on: {
        'text.change': {
          actions: assign({
            value: ({ event }) => event.value,
          }),
        },
        'text.commit': {
          actions: assign({
            committedValue: ({ context }) => context.value,
          }),
          target: 'reading',
        },
        'text.cancel': {
          actions: assign({
            value: ({ context }) => context.committedValue,
          }),
          target: 'reading',
        },
      },
    },
  },
});

const textActor = createActor(textMachine).start();

textActor.subscribe((state) => {
  console.log(state.context);
});

textActor.send({ type: 'text.edit' });
// logs ''
textActor.send({ type: 'text.change', value: 'Hello' });
// logs 'Hello'
textActor.send({ type: 'text.commit' });
// logs 'Hello'
textActor.send({ type: 'text.edit' });
// logs 'Hello'
textActor.send({ type: 'text.change', value: 'Hello world' });
// logs 'Hello world'
textActor.send({ type: 'text.cancel' });
// logs 'Hello'

/**
 * logs:
 * { committedValue: '', value: '' }
{ committedValue: '', value: 'Hello' }
{ committedValue: 'Hello', value: 'Hello' }
{ committedValue: 'Hello', value: 'Hello' }
{ committedValue: 'Hello', value: 'Hello world' }
{ committedValue: 'Hello', value: 'Hello' }
 */