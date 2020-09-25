-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS lots
CASCADE;
CREATE TABLE lots
(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL DEFAULT "(No Title)",
  size INTEGER NOT NULL,
  cost_per_month NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  is_irrigated BOOLEAN NOT NULL DEFAULT FALSE,
  suggested_term INTEGER NOT NULL DEFAULT 12,
  condition_rating INTEGER,
  available_date DATE NOT NULL DEFAULT NOW(),
  lot_description VARCHAR(MAX) NOT NULL DEFAULT "(No Description)",
  is_leased BOOLEAN NOT NULL DEFAULT FALSE,
  street_address VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  post_code VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);
