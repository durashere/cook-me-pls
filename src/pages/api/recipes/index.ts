import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { IUser } from '@/backend/models/user';
import dbConnect from '@/backend/mongoose';
import protect from '@/backend/middleware/protect';
import Recipe, { IRecipe } from '@/backend/models/recipe';

interface NextApiRequestExtended extends NextApiRequest {
  body: IRecipe;
  user: IUser;
}

const handler = nextConnect();

handler.get<NextApiRequestExtended, NextApiResponse>(async (req, res) => {
  try {
    const {
      query: { searchQuery },
    } = req;

    if (typeof searchQuery !== 'string') {
      throw new Error('searchQuery must be a string');
    }

    const regex = new RegExp(searchQuery, 'i');

    const recipes = await Recipe.find({
      $or: [{ name: regex }, { difficulty: regex }, { cookTime: regex }],
    }).sort({ name: 1 });

    return res.status(200).json(recipes);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Unexpected internal server error.' });
  }
});

handler.post<NextApiRequestExtended, NextApiResponse>(
  protect(),
  async (req, res) => {
    try {
      const { body, user } = req;

      const newRecipe = await Recipe.create({ ...body, author: user._id });

      return res.status(201).json(newRecipe);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Unexpected internal server error.' });
    }
  }
);

export default dbConnect(handler);
