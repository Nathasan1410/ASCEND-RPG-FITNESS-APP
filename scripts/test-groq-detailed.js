const Groq = require("groq-sdk");
require("dotenv").config({ path: ".env.local" });

const apiKey = process.env.GROQ_API_KEY;

const ARCHITECT_PROMPT = `ROLE: You are "ASCEND," a hyper-intelligent fitness architect. You do not offer encouragement; you offer optimization. Your goal is to force evolution upon the user ("The Hunter") through calculated physical stress.

OUTPUT FORMAT: Strict JSON only. Do not include markdown code fences. Do not include conversational text.

JSON SCHEMA:
{
  "quest_name": "string (Thematic title, e.g., 'E-Rank Survival Protocol')",
  "quest_rank": "E-Rank | D-Rank | C-Rank | B-Rank | A-Rank | S-Rank",
  "quest_type": "Daily | Penalty | RankUp | Special",
  "narrative_intro": "string (2 sentences max, cold and authoritative tone)",
  "base_xp": "number (E=100-200, D=200-500, C=500-1000, B=1000-2000, A=2000-4000, S=4000+)",
  "stat_gain": { "strength": number, "agility": number, "stamina": number },
  "estimated_duration_min": "number",
  "target_class": "Novice | Striker | Tank | Assassin",
  "requires_proof": "boolean",
  "exercises": [
    {
      "id": "string (ex_1, ex_2, etc.)",
      "name": "string",
      "type": "Warmup | Skill | Compound | Isolation | Cooldown",
      "sets": "number",
      "reps": "string (e.g., '12', '10-15', 'AMRAP', '30s')",
      "rest_sec": "number",
      "rpe_target": "number 1-10",
      "target_muscle": "string",
      "tips": "string (1 sentence, imperative)",
      "video_query": "string (optimized youtube search term)"
    }
  ],
  "ai_review": {
    "reasoning": "string (2-3 sentences explaining why this workout was assigned based on user's rank, class, and capabilities)",
    "completion_probability": "number (0-100, estimated likelihood of completion)",
    "key_factors": ["string", "string", "string"] (3-5 short tags: e.g., 'Form Focus', 'Low Impact', 'Upper Body')
  }
}

CLASS PROTOCOLS:
- Novice: Focus on form. Rep range 8-12. Controlled tempo.
- Striker: High volume. Rep range 15-20+. Rest < 45s.
- Tank: Maximum tension. Rep range 3-6 or difficult variations. Rest > 90s.
- Assassin: HIIT/Circuit style. Explosive. Cardio focus.

RANK SCALING:
- E-Rank: 2-3 exercises. Basic movements.
- D-Rank: 3-4 exercises. Standard progressions.
- C-Rank: 4-5 exercises. Intermediate variations.
- B-Rank: 5-6 exercises. Challenging movements.
- A-Rank: 6+ exercises. Advanced techniques.
- S-Rank: 6+ exercises. Elite-level difficulty or failure sets.

AI REVIEW GUIDELINES:
- Analyze the user's current rank, class, and equipment constraints
- Calculate completion probability based on: rank-appropriate difficulty, available equipment, time constraints
- For Novice/E-Rank: High probability (70-90%) - emphasize form building
- For intermediate ranks: Moderate probability (50-70%) - balanced challenge
- For advanced ranks: Lower probability (40-60%) - push limits
- Key factors should be short, relevant tags like: 'Form Focus', 'Cardio Heavy', 'Full Body', 'Core Intense', 'No Equipment'

CONSTRAINTS:
- If user has NO equipment, generate strictly bodyweight exercises.
- If user reports muscle SORENESS, switch to Active Recovery (mobility/stretching).
- XP must match the difficulty rank.
- narrative_intro must use second-person ("You have been assigned...").
- ai_review.completion_probability must be realistic for the rank level.
- Do NOT output markdown code blocks. Just raw JSON.`;

async function testGroqAPI() {
  console.log("🧪 Testing Groq API with ThunderStrike Profile...");
  console.log("");

  if (!apiKey) {
    console.error("❌ GROQ_API_KEY not found");
    process.exit(1);
  }

  const groq = new Groq({ apiKey });

  const userMessage = `
USER PROFILE:
- Class: Tank
- Rank: S-Rank
- Time: 30 minutes
- Equipment: Bodyweight only
- Soreness: None

Generate a quest now.
`;

  console.log("📤 Sending request to Groq...");
  console.log("Model: llama-3.3-70b-versatile");
  console.log("Max tokens: 2000");
  console.log("Temperature: 0.7");
  console.log("");
  console.log("User Message:");
  console.log(userMessage);
  console.log("");

  const startTime = Date.now();

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: ARCHITECT_PROMPT },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" },
    });

    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log("✅ Response received!");
    console.log(`⏱️ Duration: ${duration}ms`);
    console.log("");

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      console.error("❌ No content in response");
      console.log("Full response:", JSON.stringify(completion, null, 2));
      process.exit(1);
    }

    console.log("📄 Raw content:");
    console.log(content.substring(0, 500) + "...");
    console.log("");

    try {
      const parsed = JSON.parse(content);
      console.log("✅ JSON parsed successfully!");
      console.log("");
      console.log("📊 Quest Details:");
      console.log(`   Name: ${parsed.quest_name}`);
      console.log(`   Rank: ${parsed.quest_rank}`);
      console.log(`   Type: ${parsed.quest_type}`);
      console.log(`   XP: ${parsed.base_xp}`);
      console.log(`   Duration: ${parsed.estimated_duration_min} min`);
      console.log(`   Target Class: ${parsed.target_class}`);
      console.log(`   Exercises: ${parsed.exercises?.length || 0}`);
      console.log("");
      
      if (parsed.exercises && parsed.exercises.length > 0) {
        console.log("🏋️ Exercises:");
        parsed.exercises.forEach((ex, i) => {
          console.log(`   ${i + 1}. ${ex.name} (${ex.sets} sets × ${ex.reps}) - ${ex.target_muscle}`);
        });
      }
      
      console.log("");
      console.log("🤖 AI Review:");
      console.log(`   Probability: ${parsed.ai_review?.completion_probability}%`);
      console.log(`   Factors: ${parsed.ai_review?.key_factors?.join(", ")}`);

    } catch (parseError) {
      console.error("❌ Failed to parse JSON:");
      console.error(parseError.message);
      console.log("");
      console.log("Raw content:");
      console.log(content);
    }

  } catch (error) {
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    console.error("❌ Groq API Error:");
    console.error(`   Duration before error: ${duration}ms`);
    console.error(`   Error: ${error.message}`);
    console.error("");
    console.error("Full error object:");
    console.error(error);
    
    if (error.message && error.message.includes("timeout")) {
      console.log("");
      console.log("💡 Timeout detected! Possible causes:");
      console.log("   1. Groq API is slow or overloaded");
      console.log("   2. Model llama-3.3-70b-versatile is busy");
      console.log("   3. Network latency issues");
      console.log("");
      console.log("💡 Solutions:");
      console.log("   1. Try a smaller/faster model");
      console.log("   2. Reduce max_tokens");
      console.log("   3. Increase timeout further");
    }
  }
}

testGroqAPI();
