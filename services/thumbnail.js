const sharp = require('sharp');

module.exports.generateThumbnail = async (imageBuffer, width = 200, height = 200) => {
  return sharp(imageBuffer).resize(width, height).toBuffer();
};
