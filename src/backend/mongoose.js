import mongoose from 'mongoose';
import '@/backend/models';

const dbConnect = (handler) => async (req, res) => {
  if (mongoose.connection.readyState >= 1) {
    return handler(req, res);
  }
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true,
    keepAlive: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  return handler(req, res);
};

export default dbConnect;
