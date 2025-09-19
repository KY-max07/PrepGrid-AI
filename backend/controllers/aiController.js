const { GoogleGenAI } = require("@google/genai");
const {
  questionAnswerPrompt,
  conceptExplainPrompt,
} = require("../utils/prompt");
const apiKeyGemini = process.env.GEMINI_API_KEY;
// Init AI client
const ai = new GoogleGenAI({
  apiKey: apiKeyGemini,
});

// Generate-Interview-Question

const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions)
      return res.status(400).json({ message: " missing required fields." });

    //getting prompt
    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    //generate response from ai with assigning model and prompt

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    let rawText = response.text;

    // now cleaning raw text
    const cleanedtext = rawText
      .replace(/^```json\S*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleanedtext);
    res.status(200).json(data);
  } catch (err) {
    res
      .status(500)
      .json({ message: "failed to generate questions", error: err.message });
  }
};


const generateExplaination = async(req,res)=>{
    try{
        const {question} = req.body;
        if(!question) return res.status(400).json({
            message : "missing required fields"
        })
        const prompt = conceptExplainPrompt(question);
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
          });
      
          let rawText = response.text;
      
          // now cleaning raw text
          const cleanedtext = rawText
            .replace(/^```json\S*/, "")
            .replace(/```$/, "")
            .trim();
      
          const data = JSON.parse(cleanedtext);
          res.status(200).json(data);
        

    } catch (err) {
    res
      .status(500)
      .json({ message: "failed to generate questions", error: err.message });
  }
}

module.exports = { generateInterviewQuestions , generateExplaination};
