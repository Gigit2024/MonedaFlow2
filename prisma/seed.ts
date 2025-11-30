// prisma/seed.ts

import { PrismaClient } from '@prisma/client'

// Inicializa el Prisma Client
const prisma = new PrismaClient()

async function main() {
  console.log(`\nComenzando la siembra de datos... 🌱`)

  // --- Ejemplo: Insertar un Usuario de Prueba ---
  const user = await prisma.user.upsert({
    where: { email: 'dev@monedaflow.com' },
    update: {}, // No actualiza nada si ya existe
    create: {
      email: 'dev@monedaflow.com',
      name: 'Usuario Desarrollador',
      passwordHash: 'hashed_password_for_dev', // ¡Usar un hash real en producción!
      // ... otros campos requeridos por tu modelo User
    },
  })

  // --- Puedes agregar más datos aquí (ej. Cuentas, Transacciones iniciales) ---
  // Ejemplo:
  // await prisma.account.createMany({ ... })

  console.log(`\nUsuario creado/actualizado: ${user.name} (${user.email})`)
  console.log(`Siembra finalizada. ✅\n`)
}

main()
  .catch((e) => {
    console.error(`\nError durante la siembra:`)
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.disconnect()
  })