const Session = require("../models/Session");
const Question = require("../models/Question");

//create session

// @desc  create a new session & linked Question
// @route POST /api/sessions/create
// @access Private

const createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } =
      req.body;

    const userId = req.user.id;
    //middleware attaches the logged-in user's info to req.user

    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    });
    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const question = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        return question._id;
      })
    );

    session.questions = questionDocs;
    await session.save();
    res.status(201).json({ success: true, session });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
};

// getSession by ID

// @desc  get a session by ID
// @route GET /api/sessions/:id
// @access Private

const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: 1 } },
      })
      .exec();
    if (!session)
      return res
        .status(404)
        .json({ suceess: false, message: "Session Not Found" });
    res.status(200).json({ success: true, session });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
};

//getMySessions

//@desc get all sessions
//@route GET /api/sessions/my-sessions
//@access Private
const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("questions");

    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
};

const deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) return res.status(400).json({ message: "session not found" });

    if (session.user.toString() !== req.user.id)
      return res
        .status(401)
        .json({ message: "not authorized to delete this session" });
    await Question.deleteMany({ session: session._id });

    await session.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "session deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
};

module.exports = {
  createSession,
  getSessionById,
  getMySessions,
  deleteSession,
};
