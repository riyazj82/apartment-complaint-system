const { pool } = require("./dbconn");

const createComplaint = async (userId, title, description, category, priority) => {
  const result = await pool.query(
    `INSERT INTO complaints (user_id, title, description, category, priority)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [userId, title, description, category, priority]
  );

  return result.rows[0];
};

const getComplaintsByUser = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM complaints
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );

  return result.rows;
};

const getAllComplaints = async () => {
  const result = await pool.query(
    `SELECT complaints.*, users.name AS user_name, users.email AS user_email
     FROM complaints
     JOIN users ON complaints.user_id = users.id
     ORDER BY complaints.created_at DESC`
  );

  return result.rows;
};

const updateComplaintStatus = async (complaintId, status) => {
  const result = await pool.query(
    `UPDATE complaints
     SET status = $1, updated_at = CURRENT_TIMESTAMP
     WHERE id = $2
     RETURNING *`,
    [status, complaintId]
  );

  return result.rows[0];
};

const deleteComplaint = async (complaintId) => {
  const result = await pool.query(
    `DELETE FROM complaints
     WHERE id = $1
     RETURNING *`,
    [complaintId]
  );

  return result.rows[0];
};

module.exports = {
  createComplaint,
  getComplaintsByUser,
  getAllComplaints,
  updateComplaintStatus,
  deleteComplaint,
};