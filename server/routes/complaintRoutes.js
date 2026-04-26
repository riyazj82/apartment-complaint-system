const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/roleMiddleware");

const {
  createComplaint,
  getComplaintsByUser,
  getAllComplaints,
  updateComplaintStatus,
  deleteComplaint,
} = require("../db/complaintQueries");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;

    const complaint = await createComplaint(
      req.user.id,
      title,
      description,
      category,
      priority
    );

    res.status(201).json({
      message: "Complaint created successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create complaint" });
  }
});

router.get("/my", authMiddleware, async (req, res) => {
  try {
    const complaints = await getComplaintsByUser(req.user.id);
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch complaints" });
  }
});

router.get("/", authMiddleware, adminOnly, async (req, res) => {
  try {
    const complaints = await getAllComplaints();
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all complaints" });
  }
});

router.put("/:id/status", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;

    const updatedComplaint = await updateComplaintStatus(
      req.params.id,
      status
    );

    res.json({
      message: "Complaint status updated",
      complaint: updatedComplaint,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update complaint" });
  }
});

router.delete("/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    const deletedComplaint = await deleteComplaint(req.params.id);

    res.json({
      message: "Complaint deleted successfully",
      complaint: deletedComplaint,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete complaint" });
  }
});

module.exports = router;