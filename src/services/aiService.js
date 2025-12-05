const GeminiService = require('./geminiService');
const OpenAIService = require('./openaiService');

class AIServiceFactory {
    static getService(provider) {
        if (provider === 'gemini') {
            return new GeminiService();
        } else if (provider === 'chatgpt') {
            return new OpenAIService();
        } else {
            throw new Error('Invalid AI provider');
        }
    }
}

module.exports = AIServiceFactory;
