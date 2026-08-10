import dotenv from "dotenv";
dotenv.config();
import express from "express";
import OpenAI from "openai";

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY
});

// Predefined Questions & Answers
const predefinedReplies = [
  {
    keywords: ["hello", "hi", "hey"],
    reply: "Hello 👋 Welcome to Movers & Packers. How can I help you today?",
  },
  {
    keywords: ["contact", "phone", "mobile", "number"],
    reply: "You can contact us at +91-9876543210.",
  },
  {
    keywords: ["email", "mail"],
    reply: "You can email us at support@moverspackers.com.",
  },
  {
    keywords: ["timing", "hours", "office time"],
    reply: "Our working hours are 9:00 AM to 7:00 PM (Monday to Saturday).",
  },
  {
    keywords: ["address", "location", "office"],
    reply: "Our office is located in Indore, Madhya Pradesh.",
  },
  {
    keywords: ["services"],
    reply:
      "We provide House Shifting, Office Relocation, Vehicle Transport, Packing & Unpacking, Warehousing, and Logistics services.",
  },
  {
    keywords: ["booking", "book"],
    reply:
      "You can create a booking from the 'Book Now' page by filling in your pickup and delivery details.",
  },
  {
    keywords: ["payment", "pay"],
    reply:
      "We accept UPI, Debit/Credit Cards, Net Banking, and Cash (where applicable).",
  },
  {
    keywords: ["cancel", "cancellation"],
    reply:
      "To cancel a booking, please contact customer support or use the cancellation option from your account if available.",
  },
  {
    keywords: ["thank", "thanks"],
    reply: "You're welcome! 😊 Let me know if you need anything else.",
  },
];

const greetings = {
  "hi": "Hello! How can I help you?",
  "hello": "Hi! How can I assist you today?",
  "hey": "Hello! What can I do for you?",
  "good morning": "Good morning! How can I help?",
  "good afternoon": "Good afternoon! How can I help?",
  "good evening": "Good evening! How can I help?",
  "thanks": "You're welcome!",
  "thank you": "Happy to help!",
  "bye": "Goodbye! Have a great day!",
};

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const userMessage = message.toLowerCase().trim();

    // Check predefined replies first
    const matchedReply = predefinedReplies.find((item) =>
      item.keywords.some((keyword) => userMessage.includes(keyword))
    );

    if (matchedReply) {
      return res.json({
        source: "predefined",
        reply: matchedReply.reply,
      });
    }

    
        if (greetings[userMessage]) {
  return res.json({
    reply: greetings[userMessage],
  });
}

    const companyInfo = `
Company Name: Movers & Packers

Services:
- House Shifting
- Office Relocation
- Bike Transport
- Car Transport
- Packing & Unpacking
- Loading & Unloading

Working Hours:
Monday to Sunday: 8 AM - 8 PM

Support:
Email: support@movers.com
Phone: +91-9876543210

Rules:
- If the answer exists in company information, answer from here.
- If not, answer normally.
`;

const prompt = `
${companyInfo}

You are the AI assistant of Movers & Packers.

Rules:
- Reply in one or two short sentences.
- Maximum 30 words.
- Be professional.
- Don't explain unless asked.
- Answer only what the user asks.

User Question:
${message}
`;

    // OpenAI fallback
    const completion = await openai.chat.completions.create({
      model: "gpt-5.4-mini",
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return res.json({
      source: "openai",
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.log("AI ERROR:", error);

    return res.status(500).json({
      error: "Something went wrong. Please try again later.",
    });
  }
});

export default router;