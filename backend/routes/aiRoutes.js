const express = require("express");
const { generateInterviewQuestions , generateExplaination} = require("../controllers/aiController");
const {protect} = require("../middlewares/authMiddleware");

const router = express.Router();



router.post("/generate-questions", protect, generateInterviewQuestions);
router.post("/generate-explanation", protect, generateExplaination);

module.exports = router;
