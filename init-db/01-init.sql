-SELECT * FROM monedaflow.conversions;

- Crear esquema y extensiones necesarias
CREATE SCHEMA IF NOT EXISTS monedaflow;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    account_type VARCHAR(20) NOT NULL CHECK (account_type IN ('savings', 'checking', 'credit', 'investment')),
    balance DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    account_type VARCHAR(20) NOT NULL CHECK (account_type IN ('savings', 'checking', 'credit', 'investment')),
    balance DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE budgets (
    id SERIAL PRIMARY KEY,
    amount DECIMAL(15,2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (user_id, category, month, year)
);

 Extensión para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Otorgar permisos
GRANT ALL PRIVILEGES ON SCHEMA monedaflow TO monedaflow;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA monedaflow TO monedaflow;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA monedaflow TO monedaflow;

INSERT INTO monedaflow.conversions (type, fromValue, fromUnit, toValue, toUnit, result)
VALUES 
  ('currency', 1.0, 'USD', 0.86, 'EUR', 0.86),
  ('distance', 1.0, 'km', 0.62, 'mi', 0.62);