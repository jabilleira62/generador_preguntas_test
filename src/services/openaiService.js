const OpenAI = require("openai");

class OpenAIService {
    constructor() {
        this.client = new OpenAI(); // Automatically uses OPENAI_API_KEY from env
    }

    async generateQuestions(prompt) {
        try {
            const response = await this.client.chat.completions.create({
                model: "gpt-4o",
                messages: [{ role: "user", content: prompt }],
            });

            return response.choices[0].message.content;
        } catch (error) {
            console.error("OpenAI API Error:", error);
            throw new Error("Failed to generate questions with ChatGPT");
        }
    }
}

module.exports = OpenAIService;
