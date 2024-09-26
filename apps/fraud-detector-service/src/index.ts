// import { EachMessagePayload, Kafka } from 'kafkajs'

// const kafka = new Kafka({
//   clientId: 'kafka-samples-worker',
//   brokers: ['localhost:9092'],
// })

// const NEW_ORDER_TOPIC = 'ecommerce-new-order'
// const consumer = kafka.consumer({ groupId: 'fraude-detector', maxInFlightRequests: 1 })

// async function startConsumer() {
//   await consumer.connect()
//   await consumer.subscribe({ topic: NEW_ORDER_TOPIC, fromBeginning: false })

//   await consumer.run({
//     eachMessage: async (payload: EachMessagePayload) => {
//       const { partition, message } = payload
//       const newOrder = JSON.parse(message.value?.toString() || '')

//       console.log(`[${partition} | ${message.offset} | ${message.key}]`)
//       console.log(`new order received: ${JSON.stringify(newOrder)}`)
//     },
//   })

//   await consumer.disconnect()
// }

// startConsumer()

import { KafkaConsumer } from '@repo/kafka-common/kafka-consumer'

const kafkaConsumer = new KafkaConsumer('ecommerce-new-order', 'fraude-detector')

kafkaConsumer.run(async (payload) => {
  const { partition, message } = payload
  const newOrder = JSON.parse(message.value?.toString() || '')

  console.log(`[${partition} | ${message.offset} | ${message.key}]`)
  console.log(`new order received: ${JSON.stringify(newOrder)}`)
})
