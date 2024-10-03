import { KafkaConsumer } from "@repo/kafka-common/kafka-consumer"

const kafkaConsumer = new KafkaConsumer('ecommerce-new-order', 'fraude-detector')

kafkaConsumer.run(async (payload) => {
  const { partition, message } = payload
  const newOrder = JSON.parse(message.value?.toString() || '')

  console.log(`[${partition} | ${message.offset} | ${message.key}]`)
  console.log(`new order received: ${JSON.stringify(newOrder)}`)
})
