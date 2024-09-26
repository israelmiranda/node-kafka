import { Kafka, Partitioners, Producer, ProducerBatch, ProducerRecord } from "kafkajs"

export class KafkaDispatcher {
  private producer: Producer

  constructor() {
    this.producer = this.createProducer()
  }

  private createProducer(): Producer {
    const kafka = new Kafka({
      clientId: 'kafka-samples-worker',
      brokers: ['localhost:9092'],
    })

    return kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })
  }

  public async send(topic: string, message: { key: string, value: string }): Promise<void> {
    try {
      await this.producer.connect()
      const record: ProducerRecord = {
        topic,
        messages: [message],
      }
      await this.producer.send(record)
    } catch (error) {
      console.error(error)
      await this.shutdown()
    }
  }

  public async sendBatch(topic: string, messages: Array<{ key: string, value: string }>): Promise<void> {
    try {
      await this.producer.connect()
      const batch: ProducerBatch = {
        topicMessages: [
          {
            topic,
            messages,
          },
        ],
      }
      await this.producer.sendBatch(batch)
    } catch (error) {
      console.error(error)
      await this.shutdown()
    }
  }
  

  public async shutdown(): Promise<void> {
    await this.producer.disconnect()
  }
}