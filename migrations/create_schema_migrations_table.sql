-- Crear tabla para controlar migraciones
-- Base de datos: postgres-jdbc-19af310efed-72dd52af19f60904
-- Creada: sáb 06 dic 2025 19:08:32 -03

CREATE TABLE IF NOT EXISTS schema_migrations (
    version VARCHAR(255) PRIMARY KEY,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Comprobar si la tabla se creó correctamente
SELECT * FROM schema_migrations LIMIT 1;
