import { KafkaDispatcher } from "@repo/kafka-common/kafka-dispatcher"
import { v4 as uuid } from 'uuid'

async function main() {
  const kafkaDispatcher = new KafkaDispatcher()

  const orders = Array.from({ length: 10 }, () => ({
    id: uuid(),
    createdAt: new Date(),
    items: [
      {
        id: uuid(),
        quantity: 1,
      },
    ],
  }))

  await kafkaDispatcher.sendBatch('ecommerce-new-order', orders.map((order) => ({
    key: order.id,
    value: JSON.stringify(order),
  })))

  console.log(`${orders.length} orders sent to topic ecommerce-new-order`)

  const SEND_EMAIL_TOPIC = 'ecommerce-send-email'

  await kafkaDispatcher.sendBatch(SEND_EMAIL_TOPIC, orders.map((order) => ({
    key: order.id,
    value: JSON.stringify({
      to: 'test@test.com',
      subject: `New order ${order.id}`,
      body: 'Thank you for your order! We are processing it.',
    }),
  })))

  console.log(`${orders.length} emails sent to topic ecommerce-send-email`)

  await kafkaDispatcher.shutdown()
}

main()