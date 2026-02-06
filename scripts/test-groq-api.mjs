const Groq = require("groq-sdk");
require("dotenv").config({ path: ".env.local" });

const apiKey = process.env.GROQ_API_KEY;

console.log("🧪 Testing Groq API connection...");
console.log("");

if (!apiKey) {
  console.error("❌ GROQ_API_KEY not found in .env.local");
  process.exit(1);
}

const groq = new Groq({ apiKey });

console.log("📡 API Key:", apiKey.substring(0, 20) + "...");
console.log("");

(async () => {
  try {
    console.log("📤 Sending simple test request...");
    const startTime = Date.now();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are a fitness quest generator. Respond with a JSON object with a test message." },
        { role: "user", content: "Test connection" }
      ],
      max_tokens: 100,
      timeout: 10000,
    });

    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log("⏱️ Response time: " + duration + "ms");
    console.log("");

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      console.error("❌ No content in response");
      console.log("Response structure:", JSON.stringify(completion, null, 2));
      process.exit(1);
    }

    console.log("✅ Response received:");
    console.log(content);
    console.log("");
    console.log("📊 Full response:");
    console.log(JSON.stringify(completion, null, 2));

    console.log("");
    console.log("✅ Groq API is working!");

  } catch (error) {
    console.error("❌ Groq API Error:");
    console.error("Message:", error.message);
    console.error("Details:", error);

    const errMsg = error.message || "";
    
    if (errMsg.includes("timeout") || errMsg.includes("Timeout")) {
      console.log("");
      console.log("💡 Possible causes:");
      console.log("   1. API timeout (default 10000ms may be too short for your network)");
      console.log("   2. Groq service may be experiencing delays");
      console.log("   3. Request queue congestion");
    }

    process.exit(1);
  }
})();
