const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.all('*', async (req, res) => {
  try {
    
    const fullPath = req.path.substring(1);
    const targetUrl = decodeURIComponent(fullPath);
    
    const response = await axios({
      method: req.method,
      url: targetUrl,
      data: req.body,
      headers: {
        ...req.headers,
        host: new URL(targetUrl).host
      },
      params: req.query,
      responseType: 'stream'
    });

    res.status(response.status);
    response.data.pipe(res);
  } catch (error) {
    res.status(error.response?.status || 500).send(error.message);
  }
});
console.log("listening on port 8005")
app.listen(8005);