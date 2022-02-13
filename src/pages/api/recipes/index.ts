import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import dbConnect from '@/backend/dbConnect';
import protect from '@/backend/middleware/protect';
import Recipe, { IRecipe } from '@/backend/models/recipe';
import { IUser } from '@/backend/models/user';

interface NextApiRequestExtended extends NextApiRequest {
  body: IRecipe;
  user: IUser;
}

const handler = nextConnect();

handler.get<NextApiRequestExtended, NextApiResponse>(async (req, res) => {
  try {
    await dbConnect();

    const { query } = req;

    const recipes = await Recipe.find({
      ...(query.author && { author: query.author }),
      ...(query.name && { name: { $regex: query.name, $options: 'i' } }),
      ...(query.difficulty && {
        difficulty: query.difficulty,
      }),
      ...(query.cookTime && { cookTime: query.cookTime }),
    })
      .sort({ updatedAt: -1 })
      .limit(Number(query.limit) || 10);

    return res.status(200).json(JSON.parse(JSON.stringify(recipes)));
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
      await dbConnect();

      const { body, user } = req;

      const createdRecipe = await Recipe.create({ ...body, author: user._id });

      return res.status(201).json(JSON.parse(JSON.stringify(createdRecipe)));
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Unexpected internal server error.' });
    }
  }
);

export default handler;
