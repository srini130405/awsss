const AWS = require('aws-sdk');
const jwt=require('jsonwebtoken');
const { Readable } = require('stream');

// Initialize AWS SDK with hardcoded credentials
AWS.config.update({
  accessKeyId: 'AKIAVY2PHDJFNQWD2MLE',
  secretAccessKey: '0u+cSoVM9xqhgX/Fz2ipjplSjSn+mXDCfjt3dBKD',
  region: 'us-east-1'  // Example: 'us-west-2'
});

// Initialize S3 client
const s3 = new AWS.S3();

// Define the S3 bucket and file key (CSV file name)
const BUCKET_NAME = 'awsrecom';
const CSV_FILE_KEY = 'dataset.csv';

// Function to append data to CSV in S3
const appendDataToCsv = async (user_id,test_id, resources_used, scores, ratings) => {
  try {
    console.log(test_id,resources_used,scores);
    // Get the existing CSV file from S3
    const response = await s3.getObject({ Bucket: BUCKET_NAME, Key: CSV_FILE_KEY }).promise();
    const csvContent = response.Body.toString('utf-8');

    // Convert arrays to comma-separated strings for single-cell entries
    const resourcesUsedString = Array.isArray(resources_used) ? resources_used.join(';') : resources_used;
    const ratingsString = Array.isArray(ratings) ? ratings.join(';') : ratings;

    // Append new data to the CSV content
    const newRow = `\n${user_id},${test_id},"${resourcesUsedString}","${scores}","${ratingsString}"`;
    const updatedCsvContent = csvContent + newRow;

    // Create a stream from the updated CSV content
    const updatedCsvStream = new Readable();
    updatedCsvStream.push(updatedCsvContent);
    updatedCsvStream.push(null); // End of stream

    // Upload the updated CSV file back to S3
    await s3
      .upload({
        Bucket: BUCKET_NAME,
        Key: CSV_FILE_KEY,
        Body: updatedCsvStream,
        ContentType: 'text/csv',
      })
      .promise();

    console.log('Data appended to CSV successfully.');
    return { status: 'success', message: 'Data appended to CSV in S3' };

  } catch (error) {
    console.error('Error appending data to CSV:', error);
    return { status: 'error', message: error.message };
  }
};

// Function to handle feedback submission
const submitFeedback = async (req, res) => {
  const { user_id,test_id, resources_used, scores, ratings } = req.body;
  
  try {
    // Call the function to append data to S3 CSV
    const result = await appendDataToCsv(user_id,test_id, resources_used, scores, ratings);
    res.json(result);

  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = { submitFeedback };
