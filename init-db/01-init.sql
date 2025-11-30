-SELECT * FROM monedaflow.conversions;

- Crear esquema y extensiones necesarias
CREATE SCHEMA IF NOT EXISTS monedaflow;

-- Extensión para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Otorgar permisos
GRANT ALL PRIVILEGES ON SCHEMA monedaflow TO monedaflow;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA monedaflow TO monedaflow;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA monedaflow TO monedaflow;

INSERT INTO monedaflow.conversions (type, fromValue, fromUnit, toValue, toUnit, result)
VALUES 
  ('currency', 1.0, 'USD', 0.86, 'EUR', 0.86),
  ('distance', 1.0, 'km', 0.62, 'mi', 0.62);