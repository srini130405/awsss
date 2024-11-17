const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); // Import the uuid library

AWS.config.update({
  accessKeyId: 'AKIAVY2PHDJFNQWD2MLE',
  secretAccessKey: '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',
  region: 'us-east-1',
});

// DynamoDB Client
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const postsTable = 'posts'; // Your DynamoDB table name

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  console.log('Authorization Header:', req.headers['authorization']);

  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send('Token is required');
  }

  console.log('Token Received:', token);

  // Remove "Bearer " prefix from the token
  var newToken = token.substring(7);  // Removing "Bearer " (7 characters) from the token string

  // Decode the token to check its contents (useful for debugging)
  var decoded = jwt.decode(newToken, { complete: true });
  console.log('Decoded Token:', decoded);

  // Verify the token using the secret key
  jwt.verify(newToken, '123', (err, decoded) => {
    if (err) {
      return res.status(403).send('Invalid token');
    }
    req.username = decoded.username; // Add username to the request object
    next();
  });
};

// Route to post a message
const postMessage = async (req, res) => {
  const { message } = req.body;
  const username = req.username;

  const params = {
    TableName: postsTable,
    Item: {
      id: uuidv4(),            // Generate a unique ID for each post
      username: username,
      message: message,
      createdAt: new Date().toISOString(),
    },
  };

  try {
    await dynamoDB.put(params).promise();
    res.status(201).send('Post created successfully');
  } catch (error) {
    console.error('Error posting message:', error);
    res.status(500).send('Error posting message');
  }
};

// Route to get all posts
const getPosts = async (req, res) => {
  const params = {
    TableName: postsTable,
  };

  try {
    const result = await dynamoDB.scan(params).promise();
    res.status(200).json(result.Items);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Error fetching posts');
  }
};

// Exporting the functions and middleware
module.exports = { verifyToken, postMessage, getPosts };
