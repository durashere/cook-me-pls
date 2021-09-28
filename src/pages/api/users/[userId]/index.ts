import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import dbConnect from '@/backend/mongoose';
import User from '@/backend/models/user';

const handler = nextConnect();

handler.get<NextApiRequest, NextApiResponse>(async (req, res) => {
  try {
    const {
      query: { userId },
    } = req;

    const user = await User.findById(userId);

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Unexpected internal server error.' });
  }
});

export default dbConnect(handler);
