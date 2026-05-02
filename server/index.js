const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", (req, res) => {
  const mode = req.body.mode || "simple";
  const input = (req.body.prompt || "").toLowerCase();

  let topic = "general";

  // 🧠 INTENT DETECTION
  if (input.includes("process") || input.includes("how") || input.includes("work")) {
    topic = "process";
  } 
 else if (
  input.includes("eligible") ||
  input.includes("eligibility") ||
  input.includes("who can vote") ||
  input.includes("can i vote") ||
  input.includes("vote age") ||
  input.includes("voting age") ||
  input.includes("age to vote") ||
  input.includes("18") ||
  input.includes("citizen")
) {
  topic = "eligibility";
}
  else if (input.includes("evm") || input.includes("machine")) {
    topic = "evm";
  } 
  else if (input.includes("commission") || input.includes("eci")) {
    topic = "eci";
  } 
  else if (input.includes("types") || input.includes("kind")) {
    topic = "types";
  }

  // ✅ NEW: SELF INTRO (ADDED)
  if (
    input.includes("your name") ||
    input.includes("who are you") ||
    input.includes("what are you")
  ) {
    let response = "";

    if (mode === "simple") {
      response = "Hi! I'm Voxify 🤖 — your assistant for understanding elections.";
    } 
    
    else if (mode === "detailed") {
      response = `
👋 Hi, I'm Voxify!

I am an AI assistant designed to help you understand elections in a simple and clear way.

You can ask me about:
- Election process  
- Voting eligibility  
- EVM machines  
- Types of elections  
- Election Commission  
`;
    } 
    
    else if (mode === "steps") {
      response = `
👋 About Me:

1️⃣ I am Voxify  
2️⃣ I explain elections  
3️⃣ I simplify concepts  
4️⃣ I help you learn fast  
`;
    }

    return res.json({ text: response });
  }

  // ✅ HANDLE GREETINGS FIRST
  if (
    input.includes("hi") ||
    input.includes("hello") ||
    input.includes("hey")
  ) {
    let response = "";

    if (mode === "simple") {
      response = "Hey! 👋 Ask me anything about elections.";
    } 
    
    else if (mode === "detailed") {
      response = `
👋 Hello!

I can help you understand elections in detail.

You can ask about:
- Election process  
- Voting eligibility  
- EVM machines  
- Types of elections  
`;
    } 
    
    else if (mode === "steps") {
      response = `
👋 Getting Started:

1️⃣ Ask a question  
2️⃣ Choose a mode  
3️⃣ Get your answer  
`;
    }

    return res.json({ text: response });
  }

  let response = "";

  // =========================
  // PROCESS
  // =========================
  if (topic === "process") {
    if (mode === "simple") {
      response = `Elections in India are a process where people vote to choose their leaders through a structured system managed by the Election Commission.`;
    }

    else if (mode === "detailed") {
      response = `
📘 Election Process in India:

1. Election Commission announces elections  
2. Candidates file nominations  
3. Campaigning begins  
4. Voting takes place using EVMs  
5. Votes are counted  
6. Results are declared  

This ensures free and fair democratic governance.
`;
    }

    else if (mode === "steps") {
      response = `
📊 Step-by-Step:

1️⃣ Announcement  
2️⃣ Nomination  
3️⃣ Campaigning  
4️⃣ Voting  
5️⃣ Counting  
6️⃣ Results  
`;
    }
  }

  // =========================
  // ELIGIBILITY
  // =========================
  else if (topic === "eligibility") {
    if (mode === "simple") {
      response = `Any Indian citizen who is 18 years or older can vote in elections.`;
    }

    else if (mode === "detailed") {
      response = `
📘 Voting Eligibility in India:

- Must be an Indian citizen  
- Must be 18 years or older  
- Must be registered as a voter  
- Must have a valid voter ID  

These rules ensure fair participation.
`;
    }

    else if (mode === "steps") {
      response = `
📊 Steps to be eligible:

1️⃣ Turn 18  
2️⃣ Register as voter  
3️⃣ Get voter ID  
4️⃣ Vote in elections  
`;
    }
  }

  // =========================
  // EVM
  // =========================
  else if (topic === "evm") {
    if (mode === "simple") {
      response = `EVMs are electronic machines used to record votes in Indian elections.`;
    }

    else if (mode === "detailed") {
      response = `
📘 Electronic Voting Machines (EVM):

- Used in Indian elections  
- Replace paper ballots  
- Faster counting  
- Secure and reliable  

They improve efficiency and transparency.
`;
    }

    else if (mode === "steps") {
      response = `
📊 How EVM works:

1️⃣ Voter presses button  
2️⃣ Vote is recorded  
3️⃣ Machine stores data  
4️⃣ Votes counted later  
`;
    }
  }

  // =========================
  // ECI
  // =========================
  else if (topic === "eci") {
    if (mode === "simple") {
      response = `The Election Commission of India conducts and manages elections.`;
    }

    else if (mode === "detailed") {
      response = `
📘 Election Commission of India:

- Independent authority  
- Conducts elections  
- Ensures fairness  
- Monitors political parties  

It plays a crucial role in democracy.
`;
    }

    else if (mode === "steps") {
      response = `
📊 Role of ECI:

1️⃣ Announces elections  
2️⃣ Manages voting  
3️⃣ Ensures fairness  
4️⃣ Declares results  
`;
    }
  }

  // =========================
  // TYPES
  // =========================
  else if (topic === "types") {
    if (mode === "simple") {
      response = `India has different types of elections like Lok Sabha, Rajya Sabha, and State elections.`;
    }

    else if (mode === "detailed") {
      response = `
📘 Types of Elections in India:

- Lok Sabha (General Elections)  
- Rajya Sabha Elections  
- State Assembly Elections  
- Local Body Elections  

Each serves different levels of governance.
`;
    }

    else if (mode === "steps") {
      response = `
📊 Types:

1️⃣ Lok Sabha  
2️⃣ Rajya Sabha  
3️⃣ State Assembly  
4️⃣ Local Elections  
`;
    }
  }

  // =========================
  // ❌ UPDATED DEFAULT (STRICT)
  // =========================
  else {
    if (mode === "simple") {
      response = `⚠️ Sorry, I can only answer questions related to elections.`;
    }

    else if (mode === "detailed") {
      response = `
⚠️ I am designed only for election-related queries.

Please ask about:
- Election process  
- Voting  
- EVM  
- Eligibility  
- Election types  
`;
    }

    else if (mode === "steps") {
      response = `
⚠️ Try asking:

1️⃣ Election process  
2️⃣ Voting rules  
3️⃣ EVM  
4️⃣ Types of elections  
`;
    }
  }

  res.json({ text: response });
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));