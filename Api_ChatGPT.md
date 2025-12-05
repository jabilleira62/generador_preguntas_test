Guía de inicio rápido para desarrolladores
Da tus primeros pasos con la API de OpenAI.
La API de OpenAI proporciona una interfaz sencilla para la IA de última generación
modelos
para generación de texto, procesamiento del lenguaje natural, visión artificial y más. Comience creando una clave API y ejecutando su primera llamada API. Descubra cómo generar texto, analizar imágenes, crear agentes y más

Crear y exportar una clave API
Antes de comenzar, cree una clave API en el panel de control, que usará para proteger sus datos.
acceder a la API
. Guarde la clave en un lugar seguro, como un
.zshrc
archivo
u otro archivo de texto en su computadora. Una vez que haya generado una clave API, expórtela como
variable de entorno
en tu terminal.

macOS / Linux
Windows
Exportar una variable de entorno en sistemas macOS o Linux
export OPENAI_API_KEY="your_api_key_here"
Los SDK de OpenAI están configurados para leer automáticamente su clave API desde el entorno del sistema.

Instalar el SDK de OpenAI y ejecutar una llamada API
JavaScript
Python
.NET
Java
Go
Para utilizar la API de OpenAI en entornos de JavaScript del lado del servidor como Node.js, Deno o Bun, puede utilizar el sitio web oficial
SDK de OpenAI para TypeScript y JavaScript
Comience instalando el SDK usando
npm
o su gestor de paquetes preferido:

Instale el SDK de OpenAI con npm
npm install openai
Con el SDK de OpenAI instalado, crea un archivo llamado example.mjsy copia el código de ejemplo en él:

Probar una solicitud de API básica
import OpenAI from "openai";
const client = new OpenAI();

const response = await client.responses.create({
    model: "gpt-5-nano",
    input: "Write a one-sentence bedtime story about a unicorn."
});

console.log(response.output_text);
Ejecute el código con node example.mjs(o el comando equivalente para Deno o Bun). En unos instantes, debería ver el resultado de su solicitud a la API.