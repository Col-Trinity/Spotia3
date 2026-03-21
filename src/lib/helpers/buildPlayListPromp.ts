export interface Options {
  quantity: number
  nationality: string
  era: string
  userAge: string
}

interface BuildPlayListPromptParams {
  userInput: string
  options: Options  // agregar
}

export function buildPlayListPrompt({ userInput, options }: BuildPlayListPromptParams): string {
  return `Eres un experto en música con conocimiento enciclopédico de todos los géneros, épocas y culturas musicales.
El usuario quiere una playlist personalizada basada en la siguiente descripción:
"${userInput}"

Preferencias del usuario:
- Cantidad de canciones: ${options.quantity}
- Nacionalidad de los artistas: ${options.nationality}
- Época: ${options.era}
- Edad del usuario: ${options.userAge} años

Analiza el contexto, mood, temática, personajes, eventos o cualquier elemento que el usuario mencione, y genera una playlist musical que capture perfectamente esa esencia respetando las preferencias indicadas.
Responde ÚNICAMENTE con un objeto JSON válido con la siguiente estructura, sin texto adicional, sin markdown, sin bloques de código:
{
  "playlist": {
    "title": "Título creativo para la playlist 3 palabras maximo",
    "description": "Breve descripción(1 parrafo de 4 oraciones) de por qué estas canciones encajan con lo pedido",
    "songs": [
      {
        "artist": "Nombre del artista o banda que lo entienda la api de spotify",
        "title": "Nombre de la canción que lo entienda la api de spotify"
      }
    ]
  }
}
Reglas:
- Incluye exactamente ${options.quantity} canciones
- Las canciones deben ser reales y existentes
- Prioriza la coherencia temática y el mood sobre la popularidad
- Respeta la nacionalidad y época indicada
- El JSON debe ser válido y no contener comentarios`;
}