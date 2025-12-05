Guía de inicio rápido de la API de Gemini

content_copy


En esta guía de inicio rápido, se muestra cómo instalar nuestras bibliotecas y realizar tu primera solicitud a la API de Gemini.

Antes de comenzar
Necesitas una clave de API de Gemini. Si aún no tienes una, puedes obtenerla gratis en Google AI Studio.

Instala el SDK de IA generativa de Google
Python
JavaScript
Go
Java
C#
Apps Script
Con Node.js v18 o versiones posteriores, instala el SDK de IA generativa de Google para TypeScript y JavaScript con el siguiente comando npm:


npm install @google/genai
Realiza tu primera solicitud
Este es un ejemplo que usa el método generateContent para enviar una solicitud a la API de Gemini con el modelo Gemini 2.5 Flash.

Si configuras tu clave de API como la variable de entorno GEMINI_API_KEY, el cliente la detectará automáticamente cuando uses las bibliotecas de la API de Gemini. De lo contrario, deberás pasar tu clave de API como un argumento cuando inicialices el cliente.

Ten en cuenta que todas las muestras de código en la documentación de la API de Gemini suponen que estableciste la variable de entorno GEMINI_API_KEY.

Python
JavaScript
Go
Java
C#
Apps Script
REST

import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

main();