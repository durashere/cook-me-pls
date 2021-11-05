import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import dbConnect from '@/backend/mongoose';
import Recipe from '@/backend/models/recipe';

const handler = nextConnect();

handler.get<NextApiRequest, NextApiResponse>(async (req, res) => {
  try {
    const {
      query: { userId },
    } = req;

    const recipes = await Recipe.find({
      author: userId,
    }).sort({ name: 1 });

    return res.status(200).json(recipes);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Unexpected internal server error.' });
  }
});

export default dbConnect(handler);
