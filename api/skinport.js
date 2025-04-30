const axios = require('axios');

module.exports = async (req, res) => {
  // CORS-заголовки
  res.setHeader('Access-Control-Allow-Origin', '*'); // или ограничь конкретным доменом
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // preflight
  }

  const { steamId = 11 } = req.query;

  if (!steamId) {
    return res.status(400).json({ error: 'Missing steamId' });
  }

  const url = `https://api.skinport.com/v1/items?app_id=730&currency=USD`;

  try {
    const response = await axios.get(url);
    res.status(200).send(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch inventory from Steam' });
  }
};
