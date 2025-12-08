import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Maneja diferentes métodos HTTP
    switch (req.method) {
      case 'GET':
        const users = await prisma.user.findMany();
        return res.status(200).json(users);
        
      case 'POST':
        const { name, email } = req.body;
        const newUser = await prisma.user.create({
          data: { name, email }
        });
        return res.status(201).json(newUser);
        
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}