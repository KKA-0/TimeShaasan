const client = require('./../settings.service');

exports.getSettings = async (req, res) => {
    try {
        const value = await client.get(req.params.user_id);
        res.status(202).json(JSON.parse(value));
    } catch (err) {
        console.error('Error adding settings:', err);
        res.status(500).json({ error: err.message });
    }
}

exports.addSettings = async (req, res) => {
    try {
        await client.set(req.params.user_id, JSON.stringify(req.body));
        res.status(201).json({ message: "Settings added successfully" });
    } catch (err) {
        console.error('Error adding settings:', err);
        res.status(500).json({ error: err.message });
    }
};
