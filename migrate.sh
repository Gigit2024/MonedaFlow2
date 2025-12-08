#!/bin/bash

# Script para crear y gestionar migraciones para la base de datos postgres-jdbc-19af310efed-72dd52af19f60904

# Colores para mensajes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar si existe la carpeta de migraciones
if [ ! -d "migrations" ]; then
    log "Creando directorio de migraciones..."
    mkdir -p migrations
fi

# Preguntar al usuario qué acción desea realizar
echo "¿Qué acción deseas realizar?"
echo "1) Crear una nueva migración"
echo "2) Ver migraciones existentes"
echo "3) Generar script para tabla de control de migraciones"
echo "4) Ejecutar todas las migraciones pendientes"
read -p "Selecciona una opción [1-4]: " action_option

case $action_option in
    1)
        read -p "Introduce el nombre de la migración (ej: create_users_table): " migration_name
        if [ -z "$migration_name" ]; then
            error "El nombre de la migración no puede estar vacío."
            exit 1
        fi
        
        # Crear archivo de migración
        timestamp=$(date +%Y%m%d%H%M%S)
        filename="migrations/${timestamp}_${migration_name}.sql"
        
        log "Creando archivo de migración: $filename"
        
        # Contenido básico de la migración
        cat > "$filename" << EOF
-- Migración: $migration_name
-- Base de datos: postgres-jdbc-19af310efed-72dd52af19f60904
-- Creada: $(date)
-- Versión: $timestamp

-- Escribir aquí las sentencias SQL para la migración (hacia adelante)

-- Ejemplo para crear una tabla:
-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     username VARCHAR(50) NOT NULL UNIQUE,
--     email VARCHAR(100) NOT NULL UNIQUE,
--     password_hash VARCHAR(255) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- Escribir aquí las sentencias SQL para revertir la migración (hacia atrás)
-- DROP TABLE IF EXISTS users;

-- Registrar la migración (ejecutar después de aplicar la migración)
-- INSERT INTO schema_migrations (version) VALUES ('$timestamp');
EOF
        
        log "Migración creada exitosamente en: $filename"
        log "Edita el archivo para agregar tus sentencias SQL."
        log "Después de editar, ejecuta el script en DBeaver en tu base de datos postgres-jdbc-19af310efed-72dd52af19f60904."
        ;;
    2)
        log "Migraciones existentes:"
        if [ ! -d "migrations" ] || [ -z "$(ls -A migrations/)" ]; then
            warn "No hay migraciones creadas."
        else
            ls -la migrations/
        fi
        ;;
    3)
        log "Generando script para crear tabla de control de migraciones..."
        
        cat > "migrations/create_schema_migrations_table.sql" << EOF
-- Crear tabla para controlar migraciones
-- Base de datos: postgres-jdbc-19af310efed-72dd52af19f60904
-- Creada: $(date)

CREATE TABLE IF NOT EXISTS schema_migrations (
    version VARCHAR(255) PRIMARY KEY,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Comprobar si la tabla se creó correctamente
SELECT * FROM schema_migrations LIMIT 1;
EOF
        
        log "Script generado en: migrations/create_schema_migrations_table.sql"
        log "Ejecuta este script en DBeaver para crear la tabla de control de migraciones."
        ;;
    4)
        log "Generando script para ejecutar todas las migraciones pendientes..."
        
        # Verificar si hay migraciones
        if [ ! -d "migrations" ] || [ -z "$(ls -A migrations/)" ]; then
            warn "No hay migraciones creadas."
            exit 0
        fi
        
        # Crear script de ejecución
        cat > "migrations/run_all_migrations.sql" << EOF
-- Script para ejecutar todas las migraciones pendientes
-- Base de datos: postgres-jdbc-19af310efed-72dd52af19f60904
-- Creado: $(date)

-- Crear tabla de control si no existe
CREATE TABLE IF NOT EXISTS schema_migrations (
    version VARCHAR(255) PRIMARY KEY,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

EOF
        
        # Agregar cada migración al script
        for file in migrations/*.sql; do
            if [[ "$file" != *"create_schema_migrations_table.sql" && "$file" != *"run_all_migrations.sql" ]]; then
                # Extraer versión del nombre del archivo
                version=$(basename "$file" | cut -d'_' -f1)
                
                # Agregar verificación y ejecución de la migración
                cat >> "migrations/run_all_migrations.sql" << EOF
-- Verificar si la migración $version ya fue aplicada
DO \$\$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE version = '$version') THEN
        RAISE NOTICE 'Ejecutando migración: $version';
        
        -- Ejecutar migración
        \i $file
        
        -- Registrar migración
        INSERT INTO schema_migrations (version) VALUES ('$version');
    ELSE
        RAISE NOTICE 'Migración $version ya fue aplicada. Omitiendo.';
    END IF;
END
\$\$;

EOF
            fi
        done
        
        # Agregar consulta final para mostrar migraciones aplicadas
        cat >> "migrations/run_all_migrations.sql" << EOF
-- Mostrar todas las migraciones aplicadas
SELECT * FROM schema_migrations ORDER BY applied_at;
EOF
        
        log "Script generado en: migrations/run_all_migrations.sql"
        log "Ejecuta este script en DBeaver para aplicar todas las migraciones pendientes."
        ;;
    *)
        error "Opción no válida. Saliendo..."
        exit 1
        ;;
esac