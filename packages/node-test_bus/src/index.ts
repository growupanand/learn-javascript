import { Bus, type BusInstance, handlerFor } from '@node-ts/bus-core'

import { Event } from '@node-ts/bus-messages'


class Balance {
  totalAmount = 0;
  constructor(amount?: number) {
    this.totalAmount = amount ?? 0;
  }

  get amount() {
    return this.totalAmount;
  }

  checkBalance() {
    console.log(`Balance: ${this.totalAmount}`);
  }

  deduct(amount: number) {
    this.totalAmount -= amount;
  }
}
const totalAmount = new Balance(1000);


export class MoneyPaid extends Event {

  $name = 'expenses/money-paid'


  $version = 0


  constructor(
    readonly amount: number,
  ) {
    super();
  }
}

export const moneyPaidHandler = handlerFor(
  MoneyPaid,
  async (event) => {
    console.log(`Money paid: ${event.amount}`);
    totalAmount.deduct(event.amount);
  }
)







const start = async () => {
  const bus = Bus.configure()
    .withHandler(moneyPaidHandler).build();
  console.log("initializing bus");
  await bus.initialize();
  console.log("starting bus");
  // Start the bus to commence processing messages
  await bus.start()
  await app(bus);
}

start();



async function app(bus: BusInstance) {
  totalAmount.checkBalance();
  await bus.publish(new MoneyPaid(100));
  // Add delay to allow event handling to complete
  await new Promise(resolve => setTimeout(resolve, 100));
  totalAmount.checkBalance();

}