import sharp from 'sharp';

export async function generateThumbnail(imageBuffer, width = 200, height = 200) {
  return sharp(imageBuffer).resize(width, height).toBuffer();
}
