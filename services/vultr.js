const axios = require('axios');
require('dotenv').config();

module.exports.uploadToVultr = async (fileName, fileBuffer) => {
  const url = process.env.VULTR_API_URL;
  const headers = {
    'Content-Type': 'multipart/form-data',
    'API-Key': process.env.VULTR_API_KEY,
  };

  const formData = new FormData();
  formData.append('file', fileBuffer, fileName);

  return axios.post(url, formData, { headers });
};
