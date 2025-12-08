// init-db/index.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Crear usuario administrador por defecto
  await prisma.usuario.upsert({
    where: { email: 'admin@monedaflow.com' },
    update: {},
    create: {
      nombre: 'Administrador',
      email: 'admin@monedaflow.com',
    },
  });

  console.log('Base de datos inicializada correctamente');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });