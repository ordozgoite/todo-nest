import { z } from 'zod';

const supabaseSchema = z.object({
  projectUrl: z.string(),
  anonKey: z.string()
});

const kafkaSchema = z.object({
  brokersUrl: z.array(z.string()),
  clientId: z.string(),
  taskTopic: z.string(),
});

const configSchema = z.object({
  supabase: supabaseSchema,
  kafka: kafkaSchema,
});

export type TConfiguration = z.infer<typeof configSchema>;
export type TSupabaseConfig = z.infer<typeof supabaseSchema>;
export type TKafkaConfig = z.infer<typeof kafkaSchema>;
export default (): TConfiguration => {
  const brokersUrl = process.env.KAFKA_BROKERS_URL?.split(',');
  const config = {
    supabase: {
      projectUrl: process.env.SUPABASE_URL,
      anonKey: process.env.SUPABASE_KEY
    },
    kafka: {
      brokersUrl: brokersUrl,
      clientId: process.env.KAFKA_CLIENT_ID,
      taskTopic: process.env.KAFKA_TASK_TOPIC
    },
  };

  return configSchema.parse(config);
};