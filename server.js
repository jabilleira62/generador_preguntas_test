const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'UI')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'UI', 'configuracion_inicial.html'));
});

app.get('/results', (req, res) => {
    res.sendFile(path.join(__dirname, 'UI', 'preguntas_generadas.html'));
});

const multer = require('multer');
const { extractText } = require('./src/utils/textExtractor');
const AIServiceFactory = require('./src/services/aiService');

// Configure Multer for memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

app.post('/api/generate', upload.single('file'), async (req, res) => {
    try {
        const { text, provider, count, difficulty, similarity, examples, ranges } = req.body;
        let contentToProcess = text;

        // Handle file upload if present
        if (req.file) {
            console.log('Processing file:', req.file.originalname, req.file.mimetype);
            try {
                contentToProcess = await extractText(req.file.buffer, req.file.mimetype);
            } catch (error) {
                return res.status(400).json({ error: 'Error processing file: ' + error.message });
            }
        }

        if (!contentToProcess) {
            return res.status(400).json({ error: 'No content provided (text or file)' });
        }

        // Construct Prompt based on prompt_tecnico.md requirements
        const prompt = `
            Actúa como un profesor experto y genera ${count || 10} preguntas tipo test a partir del siguiente contenido.
            
            Reglas:
            - Dificultad: ${difficulty || 'Media'}
            - Similitud de respuestas incorrectas: ${similarity || 'Media'}
            - Formato de salida: JSON estricto con la siguiente estructura:
            [
              {
                "question": "Enunciado de la pregunta",
                "options": ["Opción A", "Opción B", "Opción C", "Opción D"],
                "correctAnswer": 0 // Índice de la respuesta correcta (0-3)
              }
            ]
            - Las preguntas no deben referenciar explícitamente el texto (ej: evitar "según el texto").
            - ${examples ? `Usa este estilo de preguntas como guía: ${examples}` : ''}
            
            Contenido base:
            ${contentToProcess.substring(0, 50000)} // Truncate to safe limit
        `;

        // Get AI Service
        const aiService = AIServiceFactory.getService(provider || 'gemini');

        console.log(`Generating questions with ${provider}...`);
        const result = await aiService.generateQuestions(prompt);

        // Robust JSON extraction
        let cleanResult = result;
        const jsonStartIndex = cleanResult.indexOf('[');
        const jsonEndIndex = cleanResult.lastIndexOf(']');

        if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
            cleanResult = cleanResult.substring(jsonStartIndex, jsonEndIndex + 1);
        } else {
            // Fallback: try to strip markdown if no array found (though prompt asks for array)
            cleanResult = cleanResult.replace(/```json/g, '').replace(/```/g, '').trim();
        }

        const questions = JSON.parse(cleanResult);

        res.json({ questions });

    } catch (error) {
        console.error('Generation Error:', error);
        res.status(500).json({ error: 'Failed to generate questions', details: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
