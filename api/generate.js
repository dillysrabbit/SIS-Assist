// Vercel Serverless Function (Node.js Runtime)
// Proxy für die Anthropic Claude API – der API-Key bleibt serverseitig
// und verlässt nie den Browser. Setze die Umgebungsvariable ANTHROPIC_API_KEY
// in den Vercel-Projekteinstellungen.

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: { message: 'Method Not Allowed' } });
        return;
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        res.status(500).json({
            error: { message: 'Server: ANTHROPIC_API_KEY ist nicht konfiguriert.' }
        });
        return;
    }

    try {
        // Vercel parst JSON-Bodies automatisch in req.body.
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
        const { system, message } = body;

        if (!message || typeof message !== 'string') {
            res.status(400).json({ error: { message: 'Kein Inhalt zum Generieren übergeben.' } });
            return;
        }

        const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-opus-4-8',
                max_tokens: 4000,
                system: system || undefined,
                messages: [{ role: 'user', content: message }]
            })
        });

        const data = await anthropicRes.json();

        if (!anthropicRes.ok) {
            res.status(anthropicRes.status).json({
                error: { message: data.error?.message || 'Anthropic API Fehler' }
            });
            return;
        }

        res.status(200).json({ text: data.content?.[0]?.text || '' });
    } catch (err) {
        res.status(500).json({ error: { message: err.message || 'Interner Serverfehler' } });
    }
};
