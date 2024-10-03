import { Admin, ITopicConfig, Kafka } from 'kafkajs'

export class KafkaAdmin {
  private admin: Admin

  constructor() {
    this.admin = this.createAdmin()
  }

  private createAdmin(): Admin {
    const kafka = new Kafka({
      clientId: 'kafka-samples-worker',
      brokers: ['localhost:9092'],
    })

    return kafka.admin()
  }

  public async listTopics(): Promise<string[]> {    
    await this.admin.connect()
    const topics = await this.admin.listTopics()
    await this.shutdown()

    return topics
  }

  public async createTopics(topicNames: string[]): Promise<void> {
    const topics: ITopicConfig[] = topicNames.map(n => 
      {
        return {
          topic: n,
          numPartitions: 3,
          replicationFactor: 1,
        }
      }
    )
    
    await this.admin.connect()
    await this.admin.createTopics({ topics })
    await this.shutdown()
  }

  public async deleteTopics(topics: string[]): Promise<void> {
    await this.admin.connect()
    await this.admin.deleteTopics({ topics })
    await this.shutdown()
  }

  public async shutdown(): Promise<void> {
    await this.admin.disconnect()
  }
}