import 'dotenv/config';
import cloudinary from 'cloudinary';
import connectDB from './db';
import { app } from './app';
import { createServer } from 'http';
import { setupSocket } from './config/socket';

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLIENT_NAME as string,
      api_key: process.env.CLOUDINARY_API_KEY as string,
      api_secret: process.env.CLOUDINARY_API_SECRET as string,
    });

    const httpServer = createServer(app);

    // Setup Socket
    setupSocket(httpServer, app);

    httpServer.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('MONGO db connection failed !!!', err);
    throw err;
  });
