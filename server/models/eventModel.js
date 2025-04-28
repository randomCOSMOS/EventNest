const pool = require('../db');

exports.createEvent = async ({ title, description, location, date, price, created_by }) => {
  const res = await pool.query(
    'INSERT INTO events (title, description, location, date, price, created_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [title, description, location, date, price, created_by]
  );
  return res.rows[0];
};

exports.getAllEvents = async () => {
  const res = await pool.query('SELECT * FROM events ORDER BY date DESC');
  return res.rows;
};

exports.getEventById = async (id) => {
  const res = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
  return res.rows[0];
};

exports.updateEvent = async (id, data) => {
  const fields = [];
  const values = [];
  let idx = 1;
  for (let key in data) {
    fields.push(`${key} = $${idx++}`);
    values.push(data[key]);
  }
  values.push(id);
  const res = await pool.query(
    `UPDATE events SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
    values
  );
  return res.rows[0];
};

exports.deleteEvent = async (id) => {
  await pool.query('DELETE FROM events WHERE id = $1', [id]);
};
