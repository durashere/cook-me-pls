import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import dbConnect from '@/backend/mongoose';
import Ingredient, { IIngredient } from '@/backend/models/ingredient';
import protect from '@/backend/middleware/protect';
import { IUser } from '@/backend/models/user';

interface NextApiRequestExtended extends NextApiRequest {
  body: IIngredient;
  user: IUser;
}

const handler = nextConnect();

handler.get<NextApiRequestExtended, NextApiResponse>(
  protect(),
  async (req, res) => {
    try {
      const {
        query: { ingredientId },
      } = req;

      const ingredient = await Ingredient.findById(ingredientId);

      return res.status(200).json(ingredient);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Unexpected internal server error.' });
    }
  }
);

handler.patch<NextApiRequestExtended, NextApiResponse>(
  protect(),
  async (req, res) => {
    try {
      const {
        body,
        query: { ingredientId },
      } = req;

      const updatedIngredient = await Ingredient.findByIdAndUpdate(
        ingredientId,
        body,
        {
          new: true,
        }
      );

      return res.status(200).json(updatedIngredient);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Unexpected internal server error.' });
    }
  }
);

handler.delete<NextApiRequestExtended, NextApiResponse>(
  protect(),
  async (req, res) => {
    try {
      const {
        query: { ingredientId },
      } = req;

      await Ingredient.findByIdAndDelete(ingredientId);

      return res.status(204).send({});
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Unexpected internal server error.' });
    }
  }
);

export default dbConnect(handler);
