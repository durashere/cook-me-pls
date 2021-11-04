import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import '@/backend/models';

const dbConnect =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (mongoose.connection.readyState >= 1) {
      return handler(req, res);
    }
    if (!process.env.MONGODB_URL) {
      console.log('MONGODB_URL is not set');
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGODB_URL);
    return handler(req, res);
  };

export default dbConnect;
