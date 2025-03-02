import { Bus, type BusInstance, handlerFor } from '@node-ts/bus-core'

import { Command, Event } from '@node-ts/bus-messages'


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

// ========= Events ===================
class MoneyPaid extends Event {
  $name = 'expenses/money-paid'
  $version = 0
  constructor(
    readonly amount: number,
    readonly bus: BusInstance
  ) {
    super();
  }
}

const moneyPaidHandler = handlerFor(
  MoneyPaid,
  async (event, bus) => {
    console.log(`Event Money paid: ${event.amount}`);
    totalAmount.deduct(event.amount);
    // Publish another event using the bus from context
    event.bus.publish(new BalanceUpdated(totalAmount.amount));
  }
)


class BalanceUpdated extends Event {
  $name = 'expenses/balance-updated'
  $version = 0
  constructor(
    readonly newBalance: number,
  ) {
    super();
  }
}

const balanceUpdatedHandler = handlerFor(
  BalanceUpdated,
  async (event) => {
    console.log(`Event Balance updated: ${event.newBalance}`);
  }
)




const start = async () => {
  const bus = Bus.configure()
    .withHandler(moneyPaidHandler)
    .withHandler(balanceUpdatedHandler)
    .build();
  console.log("initializing bus");
  await bus.initialize();
  console.log("starting bus");
  // Start the bus to commence processing messages
  await bus.start()
  console.log(`App initialized with money: ${totalAmount.amount}`);
  await app(bus);
}

start();



async function app(bus: BusInstance) {
  await bus.publish(new MoneyPaid(100, bus));

}