const index = require('../../../data/detail/search_index.json');

const handler = (req, res) => {
    const query = req.query.query.toLowerCase();

    const results = index.filter((i) => 
        i.name?.toLowerCase().includes(query) ||
        i.substance?.toLowerCase().includes(query) ||
        i.atc?.toLowerCase().includes(query)
    );

    res.status(200).json(results || []);
};

export default handler;
