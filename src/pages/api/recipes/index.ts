import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import dbConnect from '@/backend/mongoose';
import protect from '@/backend/middleware/protect';
import Recipe from '@/backend/models/recipe';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get<NextApiRequest, NextApiResponse>(async (req, res) => {
  try {
    const { query } = req;

    const regex = new RegExp(query.searchQuery as string, 'i');

    const recipes = await Recipe.find({
      $or: [{ name: regex }, { difficulty: regex }, { cookTime: regex }],
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

handler.post<NextApiRequest, NextApiResponse>(protect(), async (req, res) => {
  try {
    const { body } = req;

    const newRecipe = await Recipe.create({ ...body, author: req.user._id });

    return res.status(201).json(newRecipe);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Unexpected internal server error.' });
  }
});

export default dbConnect(handler);
