-- Script para ejecutar todas las migraciones pendientes
-- Base de datos: postgres-jdbc-19af310efed-72dd52af19f60904
-- Creado: sáb 06 dic 2025 19:08:54 -03

-- Crear tabla de control si no existe
CREATE TABLE IF NOT EXISTS schema_migrations (
    version VARCHAR(255) PRIMARY KEY,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Verificar si la migración 20251206063643 ya fue aplicada
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE version = '20251206063643') THEN
        RAISE NOTICE 'Ejecutando migración: 20251206063643';
        
        -- Ejecutar migración
        \i migrations/20251206063643_moneytok.sql
        
        -- Registrar migración
        INSERT INTO schema_migrations (version) VALUES ('20251206063643');
    ELSE
        RAISE NOTICE 'Migración 20251206063643 ya fue aplicada. Omitiendo.';
    END IF;
END
$$;

-- Verificar si la migración 20251206072220 ya fue aplicada
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE version = '20251206072220') THEN
        RAISE NOTICE 'Ejecutando migración: 20251206072220';
        
        -- Ejecutar migración
        \i migrations/20251206072220_Evalfinal.sql
        
        -- Registrar migración
        INSERT INTO schema_migrations (version) VALUES ('20251206072220');
    ELSE
        RAISE NOTICE 'Migración 20251206072220 ya fue aplicada. Omitiendo.';
    END IF;
END
$$;

-- Mostrar todas las migraciones aplicadas
SELECT * FROM schema_migrations ORDER BY applied_at;
