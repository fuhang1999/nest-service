import { Prisma } from '@prisma/client';

export class Logger implements Prisma.LogCreateInput {
  ip: string;
  city: string;
  client: string;
  model: string;
  level: number;
  message: string;
}
