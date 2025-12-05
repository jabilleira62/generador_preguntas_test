const pdf = require('pdf-parse');
const mammoth = require('mammoth');

/**
 * Extracts text from a file buffer based on mimetype.
 * @param {Buffer} buffer - File buffer
 * @param {string} mimetype - Mimetype of the file
 * @returns {Promise<string>} - Extracted text
 */
async function extractText(buffer, mimetype) {
    if (mimetype === 'application/pdf') {
        const data = await pdf(buffer);
        return data.text;
    } else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const result = await mammoth.extractRawText({ buffer: buffer });
        return result.value;
    } else if (mimetype === 'text/plain') {
        return buffer.toString('utf-8');
    } else {
        throw new Error('Unsupported file type');
    }
}

module.exports = { extractText };
