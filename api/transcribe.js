// Vercel Serverless Function (Node.js Runtime)
// Diktat-Fallback für die r1-Creation: nimmt Base64-Audio entgegen und
// transkribiert es über die OpenAI-Whisper-API. Der API-Key bleibt
// serverseitig — Umgebungsvariable OPENAI_API_KEY in Vercel setzen.
// Ohne Key antwortet die Funktion mit 501 und einer klaren Meldung.

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(204).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: { message: 'Method Not Allowed' } });
        return;
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        res.status(501).json({
            error: { message: 'Server: OPENAI_API_KEY ist nicht konfiguriert – Diktat inaktiv.' }
        });
        return;
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
        const { audio, mime } = body;

        if (!audio || typeof audio !== 'string') {
            res.status(400).json({ error: { message: 'Kein Audio übergeben.' } });
            return;
        }

        const buf = Buffer.from(audio, 'base64');
        if (buf.length < 1000) {
            res.status(200).json({ text: '' });
            return;
        }

        const form = new FormData();
        form.append('file', new Blob([buf], { type: mime || 'audio/webm' }), 'audio.webm');
        form.append('model', 'whisper-1');
        form.append('language', 'de');

        const openaiRes = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            method: 'POST',
            headers: { authorization: `Bearer ${apiKey}` },
            body: form
        });

        const data = await openaiRes.json();

        if (!openaiRes.ok) {
            res.status(openaiRes.status).json({
                error: { message: data.error?.message || 'Whisper API Fehler' }
            });
            return;
        }

        res.status(200).json({ text: data.text || '' });
    } catch (err) {
        res.status(500).json({ error: { message: err.message || 'Interner Serverfehler' } });
    }
};
