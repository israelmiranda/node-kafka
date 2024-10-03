import { KafkaConsumer } from '@repo/kafka-common/kafka-consumer'

const kafkaConsumer = new KafkaConsumer(/^ecommerce.*/, 'logger-service')

kafkaConsumer.run(async (payload) => {
  const { topic, partition, message } = payload
  const logger = JSON.parse(message.value?.toString() || '')

  console.log(`LOG: ${topic}`)
  console.log(`[${partition} | ${message.offset} | ${message.key}]`)
  console.log(`${JSON.stringify(logger)}`)
})