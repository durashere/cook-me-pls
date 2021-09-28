import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import '@/backend/models';

const dbConnect =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (mongoose.connection.readyState >= 1) {
      return handler(req, res);
    }

    await mongoose.connect(process.env.MONGODB_URL as string);
    return handler(req, res);
  };

export default dbConnect;
