// 🔥 Number Info Lookup API
// Tabbo API se number check

const API_KEY = "Sahil";
const API_BASE = "https://ethicaltabbo.in/api/lookup";

module.exports = async (req, res) => {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    // 🔥 Variable se number lo
    let number = req.query.number || req.query.mobile;
    if (req.method === 'POST' && req.body) {
        number = req.body.number || req.body.mobile || number;
    }

    if (!number) {
        return res.status(400).json({
            status: false,
            error: 'Missing number parameter',
            usage: '/api/number?number=9876543210'
        });
    }

    try {
        const url = `${API_BASE}?key=${API_KEY}&mobile=${number}`;
        const response = await fetch(url, { timeout: 15000 });
        const data = await response.json();

        return res.status(200).json({
            status: true,
            number: number,
            result: data,
            provider: "TabboAPI",
            developer: "@Hackerwibes2"
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message.substring(0, 200)
        });
    }
};
