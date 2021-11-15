import mongoose from 'mongoose';

const { MONGODB_URL } = process.env;

if (!MONGODB_URL) {
  throw new Error(
    'Please define the MONGODB_URL environment variable inside .env.local'
  );
}

const dbConnect = async (): Promise<typeof mongoose> => {
  const connection = await mongoose.connect(MONGODB_URL);

  return connection;
};

export default dbConnect;
