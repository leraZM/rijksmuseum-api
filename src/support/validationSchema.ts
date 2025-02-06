import { ZodSchema } from 'zod';

export function validateResponse<T>(schema: ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    console.error('Validation failed:', JSON.stringify(error, null, 2));
    throw error;
  }
}
