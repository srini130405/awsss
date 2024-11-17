// puppeteerController.js
const puppeteer = require('puppeteer');

const runTest = async (req, res) => {
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

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(fullHtml);

    // Convert validation script from string back to function
    const validate = eval(`(${validationScript})`);

    // Run the validation script
    const message = await validate(page);
    res.json({ message });

    await browser.close();
  } catch (error) {
    res.status(500).json({ message: 'Error running test', error: error.message });
  }
};

module.exports = { runTest };
