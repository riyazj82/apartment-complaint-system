const express = require("express");
const {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaintStatus,
} = require("../controllers/complaintController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", protect, createComplaint);
router.get("/", protect, adminOnly, getComplaints);
router.get("/my", protect, getComplaints);
router.get("/:id", protect, getComplaintById);
router.put("/:id/status", protect, adminOnly, updateComplaintStatus);

module.exports = router;