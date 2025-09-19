const Question = require("../models/Question");
const Session = require("../models/Session");

//@desc adding Additional questions to existing session
//@route POST /api/questions/add
//@access private

exports.addQuestionToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;
    if (!sessionId || !questions || !Array.isArray(questions))
      return res.status(400).json({ message: "invaild input data" });
    const session = await Session.findById(sessionId);
    if (!session) return res.status(400).json({ message: "session not found" });

    //added session id to all question
    // and inserting many to Questions Schema
    const createdQuestions = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      }))
    );

    //addeding to session

    session.questions.push(...createdQuestions.map((q) => q._id));

    //saving session
    await session.save();

    res.status(201).json(createdQuestions);
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
};

//@desc pinnig and unpinning Questions
//@route GET /api/questions/:id/pin
//access private

exports.togglePinQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question)
      return res
        .status(400)
        .json({ success: false, message: "question not found"});
    question.isPinned = !question.isPinned;
    await question.save();
    res.status(200).json({
      success: true,
      question,
    });
  } catch (err) {
    res.status(500).json({
        message: "server error", 
        error: err.message
    });
  }
};

//@desc update or create note for question
//@route POST /api/questions/:id/note
//access private
exports.updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body;
    const question = await Question.findById(req.params.id);

    if (!question)
      return res
        .status(400)
        .json({ success: false, message: "question not found" });
    question.note = note || "";
    await question.save();
    res.status(200).json({
      success: true,
      question,
    });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
};
