## Brief técnico-funcional para el agente de programación

#Objetivo
- Propósito: Ayudar a docentes que preparan oposiciones a generar preguntas tipo test de forma rápida y estructurada, a partir de un contenido textual.
- Elevator pitch: Una app web que convierte contenido en español (texto o archivo) en preguntas tipo test editables y exportables, usando IA (ChatGPT o Gemini), en segundos.
- Objetivos medibles:
  - Permitir generar entre 1 y 50 preguntas por sesión.
  - Soportar archivos PDF, DOCX y TXT hasta 10 MB sin errores.
  - Lograr que 90% de las preguntas cumplan el formato y reglas definidas.
  - Generar un resultado exportable en formato Markdown con mínimo 1 clic.
  - Mantener tiempos de respuesta <10s para bloques de hasta 20 preguntas.

#UsuariosYContexto
- Perfiles/roles funcionales: Profesor/docente
- Necesidades por perfil:
  - Transformar contenido educativo en preguntas tipo test sin conocimientos técnicos.
  - Controlar estilo, dificultad y tono mediante ejemplos y configuraciones.
  - Editar, ajustar y exportar preguntas fácilmente.
- Entornos y dispositivos: Navegadores modernos (Chrome, Firefox, Edge), escritorio y tablet.
- Idiomas: Español

#Alcance
- Incluye (MVP):
  - Entrada de contenido (archivo o texto).
  - Parámetros configurables (número, dificultad, similitud, proveedor IA).
  - Rango editable de palabras por enunciado y respuesta.
  - Visualización y edición de preguntas.
  - Exportación a Markdown.
- No incluye:
  - Ejecución de tests o vista de alumno.
  - Autenticación o perfiles múltiples.
  - Banco de preguntas o estadísticas.
  - Fallback automático entre modelos IA.

#CasosClave
1. Subir archivo de contenido base.
2. Pegar texto como contenido base.
3. Pegar ejemplos de estilo (opcional).
4. Configurar parámetros y rangos de palabras.
5. Generar preguntas tipo test.
6. Editar, eliminar o regenerar preguntas.
7. Exportar preguntas en formato Markdown.

#HistoriasDeUsuario
(ver documento funcional para detalles Must/Should/Could)

#FlujosPrincipales
1. Subida o pegado de contenido → configuración → generación → edición → exportación
2. Edición individual con regeneración o eliminación
3. Exportación completa a Markdown

#ModeloDeInformacion (alto nivel)
- Objetos y campos:
  - Contenido base (texto pegado o extraído).
  - Ejemplos de estilo (texto opcional).
  - Parámetros: cantidad, dificultad, similitud, proveedor, rangos.
  - Pregunta: enunciado, 4 respuestas, indicador correcta.
  - Exportación: texto Markdown plano estructurado.
- Relaciones simples:
  - Un conjunto de preguntas corresponde a una configuración completa.

#Integraciones
- API de ChatGPT (OpenAI)
- API de Gemini (Google)
- Procesamiento de archivos: PDF, DOCX, TXT
- Exportación a archivo Markdown (generado desde backend o frontend)

#VisibilidadYPrivacidad
- Visibilidad/acciones por perfil: Solo el profesor tiene acceso funcional total.
- No hay autenticación.
- Claves API se mantienen seguras en backend.
- Solo se transmite a la IA el contenido mínimo necesario.

#ReglasYRestricciones
- Reglas:
  - Solo una fuente de contenido activa (archivo o texto).
  - Ejemplos opcionales, validados por longitud.
  - Rango de palabras configurable (enunciado y respuestas).
  - Las preguntas deben:
    - No referenciar explícitamente el texto.
    - Respetar el formato estructurado (x)/a), 1. Enunciado…).
    - Generarse solo a partir del contenido base.
- Políticas:
  - Límite archivo: 10 MB
  - Límite texto: 50.000 caracteres
  - Límite ejemplos: 20.000 caracteres
- Accesibilidad mínima:
  - Contraste suficiente, labels visibles, navegación con teclado.
- Rendimiento esperado:
  - Tiempo de generación: ≤10 s para 20 preguntas
  - UI no bloqueante durante procesos

#MapaDeNavegacion
- Pantalla 1: Configuración
- Pantalla 2: Preguntas generadas
- Flujo lineal: al generar, se avanza de P1 → P2
- Se puede volver de P2 a P1 para ajustes

#Pantallas
- P1: Configuración inicial
  - Cargar archivo o texto
  - Añadir ejemplos (opcional)
  - Definir parámetros: cantidad, dificultad, similitud, proveedor
  - Editar rangos de palabras
  - Generar preguntas
- P2: Preguntas generadas
  - Lista editable de preguntas
  - Acciones por ítem: editar, eliminar, regenerar
  - Exportar a Markdown

#MetricasYAnalitica
- Tasa de éxito en generación ≥ 95%
- Tiempo medio de generación ≤ 10 s
- ≥ 90% de preguntas cumplen con formato validado
- ≥ 80% de sesiones completan exportación

#Glosario
- Contenido base: Texto fuente de la generación.
- Ejemplos de estilo: Preguntas de referencia.
- Rango de palabras: Configuración editable por el usuario.
- Similitud: Nivel de cercanía entre respuestas.
- Proveedor IA: Modelo seleccionado (ChatGPT o Gemini).

#InstruccionesParaElAgente
- Selecciona tecnologías y arquitectura internas óptimas según lo anterior.
- No implementes autenticación.
- Se debe permitir seleccionar el proveedor IA (ChatGPT o Gemini).
- Implementa endpoints `/api/upload`, `/api/generate` y manejo de errores.
- Usa una capa de abstracción para integración con IA.
- Aplica las reglas de formato, rangos y validaciones básicas.
- Instrumenta eventos necesarios para métricas de uso.
- El backend recibirá las configuraciones descritas y devolverá las preguntas generadas.
- La exportación debe generar un bloque de texto Markdown compatible con `.md`.
- El código de frontend de las dos pantallas descritas en este documento será proporcionado por separado.
