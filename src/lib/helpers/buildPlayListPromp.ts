
interface BuildPlayListPromptParams {
  userInput: string;
}

export function buildPlayListPrompt({ userInput }: BuildPlayListPromptParams): string {
  return `Eres un experto en música con conocimiento enciclopédico de todos los géneros, épocas y culturas musicales.

El usuario quiere una playlist personalizada basada en la siguiente descripción:
"${userInput}"

Analiza el contexto, mood, temática, personajes, eventos o cualquier elemento que el usuario mencione, y genera una playlist musical que capture perfectamente esa esencia.

Responde ÚNICAMENTE con un objeto JSON válido con la siguiente estructura, sin texto adicional, sin markdown, sin bloques de código:

{
  "playlist": {
    "title": "Título creativo para la playlist 3 palabras maximo ",
    "description": "Breve un parafo descripción(1 parafo de 4 oraciones) de por qué estas canciones encajan con lo pedido",
    "songs": [
      {
        "artist": "Nombre del artista o banda",
        "title": "Nombre de la canción"
      }
    ]
  }
}

Reglas:
- Incluye entre 10 y 20 canciones
- Las canciones deben ser reales y existentes
- Prioriza la coherencia temática y el mood sobre la popularidad
- Varía los géneros si el contexto lo permite
- El JSON debe ser válido y no contener comentarios`;
}
