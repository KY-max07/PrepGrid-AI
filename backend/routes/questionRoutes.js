const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {addQuestionToSession, updateQuestionNote, togglePinQuestion} = require("../controllers/questionController");


const router =  express.Router();


router.post('/add', protect, addQuestionToSession);
router.post('/:id/note', protect, updateQuestionNote);
router.get('/:id/pin', protect, togglePinQuestion);


module.exports = router;