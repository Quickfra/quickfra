import { z } from 'zod';

const configSchema = z.object({
  nodeEnv: z.enum(['development', 'production', 'test']).default('development'),
  port: z.coerce.number().default(3000),
  logLevel: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  databaseUrl: z.string().optional(),
  jwtSecret: z.string().optional(),
  nextAuthSecret: z.string().optional(),
  nextAuthUrl: z.string().url().optional(),
});

type Config = z.infer<typeof configSchema>;

function createConfig(): Config {
  const env = {
    nodeEnv: process.env['NODE_ENV'],
    port: process.env['PORT'],
    logLevel: process.env['LOG_LEVEL'],
    databaseUrl: process.env['DATABASE_URL'],
    jwtSecret: process.env['JWT_SECRET'],
    nextAuthSecret: process.env['NEXTAUTH_SECRET'],
    nextAuthUrl: process.env['NEXTAUTH_URL'],
  };

  const result = configSchema.safeParse(env);

  if (!result.success) {
    console.error('❌ Invalid environment configuration:');
    console.error(result.error.flatten().fieldErrors);
    throw new Error('Invalid environment configuration');
  }

  return result.data;
}

export const config = createConfig();
