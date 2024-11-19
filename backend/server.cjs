const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import controller functions
const { registerUser, loginUser } = require('./controllers/loginRegisterController.cjs');
const { verifyToken, postMessage, getPosts } = require('./controllers/postController.cjs');
const { runTest } = require('./controllers/puppeteerController.cjs');
const { submitFeedback } = require('./controllers/feedbackController.cjs')
const app = express();
const port = 5000;

// Middleware
app.use(cors());

app.use(bodyParser.json());

// Routes for registration and login
app.post('/register', registerUser);
app.post('/login', loginUser);

// Routes for posting and getting posts (Forum)
app.post('/post', verifyToken, postMessage); // Posting a message
app.get('/posts', getPosts); // Getting all posts

// Route for running the Puppeteer test (Task page in second project)
app.post('/run-test', runTest);
app.post('/submit-feedback', submitFeedback);
// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
