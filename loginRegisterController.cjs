const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');

// Initialize AWS SDK
AWS.config.update({
  accessKeyId: '',
  secretAccessKey: '',
  region: 'us-east-1',
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'userr-info'; // DynamoDB table name

// Function to handle user registration
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists based on username
    const params = {
      TableName: TABLE_NAME,
      Key: { username }, // Using username as the unique identifier
    };

    const existingUser = await dynamoDB.get(params).promise();

    if (existingUser.Item) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Store user data in DynamoDB
    const putParams = {
      TableName: TABLE_NAME,
      Item: {
        username, // Partition key
        email,    // Secondary attribute
        password, // Store plain text password
      },
    };

    await dynamoDB.put(putParams).promise();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Function to handle user login
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Fetch user from DynamoDB based on username
    const params = {
      TableName: TABLE_NAME,
      Key: { username }, // Query by username (partition key)
    };

    const user = await dynamoDB.get(params).promise();

    if (!user.Item) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored password (plain text comparison)
    if (password !== user.Item.password) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ username }, '123', {
      expiresIn: '1h',
    });
    console.log('Generated Token:',token);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Error logging in user' });
  }
};

module.exports = { registerUser, loginUser };
