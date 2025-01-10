import { post } from 'axios';
require('dotenv').config();

export async function uploadToVultr(fileName, fileBuffer) {
  const url = process.env.VULTR_API_URL;
  const headers = {
    'Content-Type': 'multipart/form-data',
    'API-Key': process.env.VULTR_API_KEY,
  };

  const formData = new FormData();
  formData.append('file', fileBuffer, fileName);

  return post(url, formData, { headers });
}
