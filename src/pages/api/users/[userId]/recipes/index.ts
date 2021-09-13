import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import dbConnect from '@/backend/mongoose';
import Recipe from '@/backend/models/recipe';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  try {
    const {
      query: { userId, searchQuery },
    } = req;

    const regex = new RegExp(searchQuery as string, 'i');

    const recipes = await Recipe.find({
      $and: [
        { $or: [{ name: regex }, { difficulty: regex }, { cookTime: regex }] },
        { author: userId },
      ],
    })
      .sort({ name: 1 })
      .populate('author');

    return res.status(200).json(recipes);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Unexpected internal server error.' });
  }
});

export default dbConnect(handler);
