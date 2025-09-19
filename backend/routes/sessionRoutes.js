const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { createSession, getSessionById, getMySessions, deleteSession } = require("../controllers/sessionController");
const router = express.Router();


router.post('/create', protect, createSession);
router.get('/my-sessions', protect, getMySessions);
router.get('/:id', protect, getSessionById);

router.delete('/:id', protect, deleteSession);

module.exports = router;

/**
 * Fix:

Make sure specific routes come before dynamic ones:

// ✅ Put this BEFORE the :id route
router.get("/my-sessions", protect, getMySessions);

// Dynamic route last
router.get("/:id", protect, getSessionById);

Why this fixes it:

Express matches routes top to bottom.

If /:id is written before /my-sessions, "my-sessions" gets caught as an id.

Reordering ensures /my-sessions matches the correct controller.
 */