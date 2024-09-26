// import { Kafka, Partitioners } from 'kafkajs'
// import { v4 as uuid } from 'uuid'

// const kafka = new Kafka({
//   clientId: 'kafka-samples-worker',
//   brokers: ['localhost:9092'],
// })

// const NEW_ORDER_TOPIC = 'ecommerce-new-order'
// const newOrder = {
//   id: uuid(),
//   createdAt: new Date(),
//   items: [
//     {
//       id: uuid(),
//       quantity: 1,
//     },
//   ],
// }

// const SEND_EMAIL_TOPIC = 'ecommerce-send-email'
// const email = {
//   to: 'test@test.com',
//   subject: `New order ${newOrder.id}`,
//   body: 'Thank you for your order! We are processing it.',
// }

// const producer = kafka.producer({
//   createPartitioner: Partitioners.LegacyPartitioner,
// })

// async function startProducer() {
//   await producer.connect()

//   for (let i = 0; i < 10; i++) {
//     newOrder.id = uuid()
//     newOrder.createdAt = new Date()

//     const metadata = await producer.send({
//       topic: NEW_ORDER_TOPIC,
//       messages: [
//         {
//           key: uuid(),
//           value: JSON.stringify(newOrder),
//         },
//       ],
//     })

//     console.log(
//       `new order: ${newOrder.id} sent to topic ${NEW_ORDER_TOPIC} - ${metadata.find((m) => m.topicName === NEW_ORDER_TOPIC)?.partition}`
//     )

//     email.subject = `New order ${newOrder.id}`

//     await producer.send({
//       topic: SEND_EMAIL_TOPIC,
//       messages: [
//         {
//           key: uuid(),
//           value: JSON.stringify(email),
//         },
//       ],
//     })

//     console.log(`email: ${email.subject} sent to topic ${SEND_EMAIL_TOPIC}`)
//   }

//   await producer.disconnect()
// }

// startProducer()

// import { KafkaDispatcher } from "./kafka-dispatcher"
// import { v4 as uuid } from 'uuid'

// async function main() {
//   const kafkaDispatcher = new KafkaDispatcher()

//   const NEW_ORDER_TOPIC = 'ecommerce-new-order'
//   const newOrder = {
//     id: uuid(),
//     createdAt: new Date(),
//     items: [
//       {
//         id: uuid(),
//         quantity: 1,
//       },
//     ],
//   }

//   await kafkaDispatcher.send(NEW_ORDER_TOPIC, {
//     key: uuid(),
//     value: JSON.stringify(newOrder),
//   })

//   console.log(`new order: ${newOrder.id} sent to topic ${NEW_ORDER_TOPIC}`)

//   const SEND_EMAIL_TOPIC = 'ecommerce-send-email'
//   const email = {
//     to: 'test@test.com',
//     subject: `New order ${newOrder.id}`,
//     body: 'Thank you for your order! We are processing it.',
//   }

//   await kafkaDispatcher.send(SEND_EMAIL_TOPIC, {
//     key: uuid(),
//     value: JSON.stringify(email),
//   })

//   console.log(`email: ${email.subject} sent to topic ${SEND_EMAIL_TOPIC}`)

//   await kafkaDispatcher.shutdown()
// }

// main()


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