const fs = require('fs');

const handler = (req, res) => {
    let file = fs.readFileSync('data/detail/search_index.json');
    let index = JSON.parse(file);
    const query = req.query.query.toLowerCase();

    const results = index.filter(
        (i) => i.name?.toLowerCase().includes(query)|| i.substance?.toLowerCase().includes(query)|| i.atc?.toLowerCase().includes(query)
    );

    res.status(200).json(results || []);
};

export default handler;
