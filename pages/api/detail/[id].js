const handler = (req, res) => {
    res.status(200).json({ name: "John Doe", id: req.query.id });
};

export default handler;
