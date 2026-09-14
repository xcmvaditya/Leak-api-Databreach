// 🔥 Email Info Lookup API
// DataBreach.com se email breach check

const TELEFUNC_URL = "https://databreach.com/_telefunc";

module.exports = async (req, res) => {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    // 🔥 Variable se email lo
    let email = req.query.mail || req.query.email;
    if (req.method === 'POST' && req.body) {
        email = req.body.mail || req.body.email || email;
    }

    if (!email) {
        return res.status(400).json({
            status: false,
            error: 'Missing mail parameter',
            usage: '/api/email?mail=email@example.com'
        });
    }

    const payload = {
        file: "/app/rpc/search.telefunc.ts",
        name: "public_search",
        args: [{
            piis: [{ type: "email", value: email, pii_id: "1" }],
            main_breach_id: "!undefined"
        }]
    };

    const headers = {
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36",
        "Content-Type": "text/plain",
        "Origin": "https://databreach.com",
        "Referer": "https://databreach.com/"
    };

    try {
        const response = await fetch(TELEFUNC_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            return res.status(response.status).json({
                status: false,
                error: `DataBreach API error: ${response.status}`,
                hint: response.status === 403 ? 'Cloudflare blocked' : 'Try again later'
            });
        }

        const data = await response.json();

        return res.status(200).json({
            status: true,
            email: email,
            result: data,
            provider: "DataBreach.com",
            developer: "@Hackerwibes2"
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message.substring(0, 200)
        });
    }
};
