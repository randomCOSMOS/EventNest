const pool = require('../db');

exports.createUser = async ({ name, email, password, is_admin = false }) => {
  const res = await pool.query(
    'INSERT INTO users (name, email, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, password, is_admin]
  );
  return res.rows[0];
};

exports.findUserByEmail = async (email) => {
  const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return res.rows[0];
};

exports.findUserById = async (id) => {
  const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return res.rows[0];
};
