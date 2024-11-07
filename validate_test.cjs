// Puppeteer Server (index.js or server.js)
const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const cors=require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.post('/run-test', async (req, res) => {
  const { html, css, js, validationScript } = req.body;

  const fullHtml = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${css}</style>
  </head>
  <body>
      ${html}
      <script>${js}</script>
  </body>
  </html>
  `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(fullHtml);

  // Convert validation script from string back to function
  const validate = eval(`(${validationScript})`);

  // Run the validation script
  const message = await validate(page);
  res.json({ message });

  await browser.close();
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
