// import { EachMessagePayload, Kafka } from 'kafkajs'

// const kafka = new Kafka({
//   clientId: 'kafka-samples-worker',
//   brokers: ['localhost:9092'],
// })

// const consumer = kafka.consumer({ groupId: 'logger-service', maxInFlightRequests: 1 })

// async function startConsumer() {
//   await consumer.connect()
//   await consumer.subscribe({ topic: /^ecommerce.*/, fromBeginning: false })

//   await consumer.run({
//     eachMessage: async (payload: EachMessagePayload) => {
//       const { topic, partition, message } = payload
//       const logger = JSON.parse(message.value?.toString() || '')

//       console.log(`LOG: ${topic}`)
//       console.log(`[${partition} | ${message.offset} | ${message.key}]`)
//       console.log(`${JSON.stringify(logger)}`)
//     },
//   })
// }

// startConsumer()

import { KafkaConsumer } from '@repo/kafka-common/kafka-consumer'

const kafkaConsumer = new KafkaConsumer(/^ecommerce.*/, 'logger-service')

kafkaConsumer.run(async (payload) => {
  const { topic, partition, message } = payload
  const logger = JSON.parse(message.value?.toString() || '')

  console.log(`LOG: ${topic}`)
  console.log(`[${partition} | ${message.offset} | ${message.key}]`)
  console.log(`${JSON.stringify(logger)}`)
})