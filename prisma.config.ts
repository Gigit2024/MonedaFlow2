import dotenv from 'dotenv';
dotenv.config();

export default {
  schema: './prisma/schema.prisma',
  out: './prisma/migrations'
} ;
export default config;