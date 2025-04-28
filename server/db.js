const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'eventnest',
  password: process.env.DB_PASS || '',
  port: process.env.DB_PORT || 5432,
});

// Auto-create tables if not exist
const createTables = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      is_admin BOOLEAN DEFAULT FALSE
    );
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title VARCHAR(200),
      description TEXT,
      location VARCHAR(200),
      date TIMESTAMP,
      price NUMERIC(10,2),
      created_by INTEGER REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      event_id INTEGER REFERENCES events(id),
      booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      paid BOOLEAN DEFAULT FALSE
    );
  `);
  console.log("Tables ensured/created.");
};

createTables().catch(err => {
  console.error("Error creating tables:", err);
  process.exit(1);
});

module.exports = pool;
