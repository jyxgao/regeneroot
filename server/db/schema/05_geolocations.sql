-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS geolocations
CASCADE;
CREATE TABLE geolocations
(
  id SERIAL PRIMARY KEY NOT NULL,
  lot_id INTEGER REFERENCES lots(id) ON DELETE CASCADE,
  lat DECIMAL(8,6),
  long DECIMAL(9,6)
);
