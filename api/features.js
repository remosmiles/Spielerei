// Diese Datei läuft auf dem Server, nicht im Browser!
export default function handler(request, response) {
  const roadmap = [
    { id: 1, task: "KI-Chatbot Integration", difficulty: "Medium", tech: "OpenAI API" },
    { id: 2, task: "Echtzeit-Datenbank", difficulty: "Hard", tech: "Supabase / Firebase" },
    { id: 3, task: "Benutzer-Authentifizierung", difficulty: "Medium", tech: "NextAuth / Clerk" },
    { id: 4, task: "Automatisierte Bildverarbeitung", difficulty: "Easy", tech: "Cloudinary" }
  ];

  // Wir senden Daten als JSON zurück, genau wie eine echte Profi-API
  response.status(200).json(roadmap);
}
