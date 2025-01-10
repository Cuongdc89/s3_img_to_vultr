const AWS = require('aws-sdk');
require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

module.exports.downloadImage = async (key) => {
  const params = { Bucket: process.env.S3_BUCKET, Key: key };
  return s3.getObject(params).promise();
};
