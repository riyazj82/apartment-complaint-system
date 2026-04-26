const { pool } = require("../db/dbconn");

const createComplaint = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;

    if (!title || !description || !category || !priority) {
      return res.status(400).json({
        message: "Title, description, category, and priority are required",
      });
    }

    const userId = req.user.id;

    const newComplaint = await pool.query(
      `INSERT INTO complaints (user_id, title, description, category, priority)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [userId, title, description, category, priority]
    );

    return res.status(201).json({
      message: "Complaint created successfully",
      complaint: newComplaint.rows[0],
    });
  } catch (error) {
    console.error("Create complaint error:", error.message);
    return res.status(500).json({
      message: "Server error while creating complaint",
    });
  }
};

const getComplaints = async (req, res) => {
  try {
    const { status, category } = req.query;

    let query = "";
    let values = [];

    if (req.user.role === "admin") {
      query = `
        SELECT complaints.*, users.name AS user_name, users.email AS user_email
        FROM complaints
        JOIN users ON complaints.user_id = users.id
        WHERE 1=1
      `;

      if (status) {
        values.push(status);
        query += ` AND complaints.status = $${values.length}`;
      }

      if (category) {
        values.push(category);
        query += ` AND complaints.category = $${values.length}`;
      }

      query += ` ORDER BY complaints.created_at DESC`;
    } else {
      values.push(req.user.id);

      query = `
        SELECT * FROM complaints
        WHERE user_id = $1
      `;

      if (status) {
        values.push(status);
        query += ` AND status = $${values.length}`;
      }

      if (category) {
        values.push(category);
        query += ` AND category = $${values.length}`;
      }

      query += ` ORDER BY created_at DESC`;
    }

    const complaints = await pool.query(query, values);

    return res.status(200).json({
      message: "Complaints fetched successfully",
      complaints: complaints.rows,
    });
  } catch (error) {
    console.error("Get complaints error:", error.message);
    return res.status(500).json({
      message: "Server error while fetching complaints",
    });
  }
};
const getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;

    const complaintResult = await pool.query(
      `SELECT complaints.*, users.name AS user_name, users.email AS user_email
       FROM complaints
       JOIN users ON complaints.user_id = users.id
       WHERE complaints.id = $1`,
      [id]
    );

    if (complaintResult.rows.length === 0) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    const complaint = complaintResult.rows[0];

    if (req.user.role !== "admin" && complaint.user_id !== req.user.id) {
      return res.status(403).json({
        message: "Access denied. You can only view your own complaint",
      });
    }

    return res.status(200).json({
      message: "Complaint fetched successfully",
      complaint,
    });
  } catch (error) {
    console.error("Get complaint by id error:", error.message);
    return res.status(500).json({
      message: "Server error while fetching complaint",
    });
  }
};

const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = ["Open", "In Progress", "Resolved"];

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const complaintResult = await pool.query(
      "SELECT * FROM complaints WHERE id = $1",
      [id]
    );

    if (complaintResult.rows.length === 0) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    const updatedComplaint = await pool.query(
      `UPDATE complaints
       SET status = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );

    return res.status(200).json({
      message: "Complaint status updated successfully",
      complaint: updatedComplaint.rows[0],
    });
  } catch (error) {
    console.error("Update complaint status error:", error.message);
    return res.status(500).json({
      message: "Server error while updating complaint",
    });
  }
};

module.exports = {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaintStatus,
};