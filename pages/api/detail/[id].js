const fs = require("fs");

const handler = (req, res) => {
    let file = fs.readFileSync(`data/detail/${req.query.id}.json`);
    let detail = JSON.parse(file);
    res.status(200).json(detail);
};

export default handler;
