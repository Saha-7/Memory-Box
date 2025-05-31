import express from 'express';
import { Request, Response } from 'express'; // ✅ correct type imports
const ffmpeg = require('fluent-ffmpeg'); // ✅ commonjs import

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/processed-video', (req: Request, res: Response): void => {
  const inputFilepath = req.body.inputFilePath;
  const outputFilepath = req.body.outputFilePath;

  if (!inputFilepath || !outputFilepath) {
    res.status(400).send('Bad request: Missing file path');
    return;
  }

  ffmpeg(inputFilepath)
    .outputOptions('-vf', 'scale=-2:360')
    .on('end', function () {
      console.log('Process finished successfully');
      res.status(200).send('Video processed successfully');
    })
    .on('error', function (err: any) {
      console.error('An error occurred: ' + err.message);
      res.status(500).send('Error processing video: ' + err.message);
    })
    .save(outputFilepath);
});

app.listen(PORT, () => {
  console.log(`Video Processing Service is running on port ${PORT}`);
});