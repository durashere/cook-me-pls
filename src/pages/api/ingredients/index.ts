import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import dbConnect from '@/backend/mongoose';
import Ingredient, { IIngredient } from '@/backend/models/ingredient';
import protect from '@/backend/middleware/protect';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get<NextApiRequest, NextApiResponse>(
  protect(),
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const {
        query: { searchQuery },
      } = req;

      const regex = new RegExp(searchQuery as string, 'i');

      const ingredients = await Ingredient.find({
        $or: [{ name: regex }],
      }).sort({ name: 1 });

      return res.status(200).json(ingredients);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Unexpected internal server error.' });
    }
  }
);

handler.post<NextApiRequest, NextApiResponse>(
  protect(),
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { body } = req;

      const newIngredient = await Ingredient.create(body as IIngredient);

      return res.status(201).json(newIngredient);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Unexpected internal server error.' });
    }
  }
);

export default dbConnect(handler);
