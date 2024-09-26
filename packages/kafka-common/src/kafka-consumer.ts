import { Consumer, ConsumerSubscribeTopics, EachMessageHandler, Kafka } from "kafkajs"

export class KafkaConsumer {
  private consumer: Consumer
  private topic: ConsumerSubscribeTopics

  constructor(topic: string | RegExp, groupId: string) {
    this.consumer = this.createConsumer(groupId)
    this.topic = { topics: [topic], fromBeginning: false }
  }

  private createConsumer(groupId: string): Consumer {
    const kafka = new Kafka({
      clientId: 'kafka-samples-worker',
      brokers: ['localhost:9092'],
    })

    return kafka.consumer({ groupId, maxInFlightRequests: 1 })
  }

  public async run(handler: EachMessageHandler) {
    try {
      await this.consumer.connect()
      await this.consumer.subscribe(this.topic)
      await this.consumer.run({
        eachMessage: handler,
      })
    } catch (error) {
      console.error(error)
      await this.shutdown()
    }
  }

  public async shutdown(): Promise<void> {
    await this.consumer.disconnect()
  }
}