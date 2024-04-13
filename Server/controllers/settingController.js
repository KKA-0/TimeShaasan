const client = require('./../server');

exports.getSettings = async (req, res) => {
    try {
        const value = await client.get(req.body.id);
        res.status(202).json(value);
    } catch (err) {
        console.error('Error adding settings:', err);
        res.status(500).json({ error: err.message });
    }
}

exports.addSettings = async (req, res) => {
    try {
        await client.set(req.body.id, 'default');
        res.status(201).json({ message: "Settings added successfully" });
    } catch (err) {
        console.error('Error adding settings:', err);
        res.status(500).json({ error: err.message });
    }
};
