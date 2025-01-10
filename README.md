# s3_img_to_vultr
## Project setup
```
npm install
```

## Create Table Image on mysql db
```
CREATE TABLE images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  key VARCHAR(255) NOT NULL,
  original_url VARCHAR(255) NOT NULL,
  thumbnail_url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

## Run batch
```
node app.js
```