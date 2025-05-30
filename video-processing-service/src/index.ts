import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Video Processing Service is running!');
});

app.listen(PORT, () => {
  console.log(`Video Processing Service is running on port ${PORT}`);
});