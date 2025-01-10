const { downloadImage } = require('./services/awsS3');
const { generateThumbnail } = require('./services/thumbnail');
const { uploadToVultr } = require('./services/vultr');
const db = require('./config/db');

(async () => {
  try {
    const imageKey = 'example-image.jpg'; // Key của ảnh trên S3

    // 1. Tải ảnh gốc từ S3
    console.log('Downloading image from S3...');
    const s3Object = await downloadImage(imageKey);
    const originalImage = s3Object.Body;

    // 2. Tạo thumbnail
    console.log('Generating thumbnail...');
    const thumbnailImage = await generateThumbnail(originalImage);

    // 3. Upload ảnh gốc và thumbnail lên Vultr
    console.log('Uploading original image to Vultr...');
    const originalUploadResponse = await uploadToVultr('original-' + imageKey, originalImage);

    console.log('Uploading thumbnail to Vultr...');
    const thumbnailUploadResponse = await uploadToVultr('thumbnail-' + imageKey, thumbnailImage);

    // 4. Lưu thông tin ảnh vào database
    console.log('Saving image info to database...');
    const connection = await db.getConnection();
    await connection.execute(
      'INSERT INTO images (key, original_url, thumbnail_url) VALUES (?, ?, ?)',
      [
        imageKey,
        originalUploadResponse.data.url, // URL trả về từ Vultr
        thumbnailUploadResponse.data.url,
      ]
    );
    connection.release();

    console.log('Batch completed successfully!');
  } catch (error) {
    console.error('Error in batch:', error.message);
  }
})();
