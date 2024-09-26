import { CompressionTypes, Kafka } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'kafka-samples-worker',
  brokers: ['localhost:9092'],
})

const admin = kafka.admin()

async function startAdmin() {
  await admin.connect()

  // delete topic
  // await admin.deleteTopics({
  //   topics: ['__consumer_offsets', 'kafka-samples', 'ecommerce-new-order', 'ecommerce-send-email'],
  // })

  // create topic
  // await admin.createTopics({
  //   topics: [
  //     {
  //       topic: 'ecommerce-new-order',
  //       numPartitions: 3,
  //       replicationFactor: 1,
  //     },
  //     {
  //       topic: 'ecommerce-send-email',
  //       numPartitions: 3,
  //       replicationFactor: 1,
  //     },
  //   ],
  // })

  // list topics
  const topics = await admin.listTopics()
  console.log(topics)

  await admin.disconnect()
}

startAdmin()
