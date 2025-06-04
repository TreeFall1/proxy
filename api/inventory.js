const axios = require('axios');

module.exports = async (req, res) => {
  // CORS-заголовки
  res.setHeader('Access-Control-Allow-Origin', '*'); // или ограничь конкретным доменом
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // preflight
  }

  const { steamId, count = 1000 } = req.query;

  if (!steamId) {
    return res.status(400).json({ error: 'Missing steamId' });
  }

  const url = `https://steamcommunity.com/inventory/${steamId}/730/2?l=english&count=${count}`;

  try {
    const response = await axios.get(url);
    res.status(200).send(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch inventory from Steam' });
  }
};
