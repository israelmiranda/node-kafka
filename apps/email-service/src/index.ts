// import { EachMessagePayload, Kafka } from 'kafkajs'

// const kafka = new Kafka({
//   clientId: 'kafka-samples-worker',
//   brokers: ['localhost:9092'],
// })

// const SEND_EMAIL_TOPIC = 'ecommerce-send-email'
// const consumer = kafka.consumer({ groupId: 'email-processor', maxInFlightRequests: 1 })

// async function startConsumer() {
//   await consumer.connect()
//   await consumer.subscribe({ topic: SEND_EMAIL_TOPIC, fromBeginning: false })

//   await consumer.run({
//     eachMessage: async (payload: EachMessagePayload) => {
//       const { partition, message } = payload
//       const email = JSON.parse(message.value?.toString() || '')

//       console.log(`[${partition} | ${message.offset} | ${message.key}]`)
//       console.log(`email received: ${JSON.stringify(email)}`)
//     },
//   })
// }

// startConsumer()

import { KafkaConsumer } from '@repo/kafka-common/kafka-consumer'

const kafkaConsumer = new KafkaConsumer('ecommerce-send-email', 'email-processor')

kafkaConsumer.run(async (payload) => {
  const { partition, message } = payload
  const email = JSON.parse(message.value?.toString() || '')

  console.log(`[${partition} | ${message.offset} | ${message.key}]`)
  console.log(`email received: ${JSON.stringify(email)}`)
})