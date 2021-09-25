const handler = async (req, res) => {
    const response = await fetch(`https://garbage-tree-api.azurewebsites.net/api/GetInformation?act=${req.query.id}`);
    const payload = await response.json();
    res.status(200).json(payload);
};

export default handler;
