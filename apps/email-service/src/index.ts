import { KafkaConsumer } from '@repo/kafka-common/kafka-consumer'

const kafkaConsumer = new KafkaConsumer('ecommerce-send-email', 'email-processor')

kafkaConsumer.run(async (payload) => {
  const { partition, message } = payload
  const email = JSON.parse(message.value?.toString() || '')

  console.log(`[${partition} | ${message.offset} | ${message.key}]`)
  console.log(`email received: ${JSON.stringify(email)}`)
})