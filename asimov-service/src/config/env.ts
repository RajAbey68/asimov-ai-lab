import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
    PORT: z.string().default('3000'),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    SUPABASE_URL: z.string().url().describe('Supabase URL'),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).describe('Supabase Service Role Key')
});

const envParse = envSchema.safeParse(process.env);

if (!envParse.success) {
    console.error('❌ Invalid environment variables:', envParse.error.format());
    process.exit(1);
}

export const env = envParse.data;
