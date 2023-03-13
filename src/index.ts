import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3001;
const API_KEY = process.env.API_KEY;

app.use(cors());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳');
});

app.get('/weather/:latlon', async (req, res) => {
  const latlon = req.params.latlon.split(',');
  const lat: string = latlon[0];
  const lon: string = latlon[1];

  const config = {
    method: 'GET',
    url: `https://api.weather.yandex.ru/v2/forecast?lat=${lat}&lon=${lon}&limit=6`,
    headers: {
      'X-Yandex-API-Key': API_KEY,
    },
  };

  try {
    const axiosResp = await axios(config);
    res.send(axiosResp.data);
  } catch (error) {
    res.send('Something wrong. Reload');
  }
});
