import cloudinary from 'cloudinary';
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

handler.get<NextApiRequest, NextApiResponse>(async (req, res) => {
  try {
    await dbConnect();

    const { query } = req;

    const recipe = await Recipe.findById(query.recipeId);

    res.status(200).json(JSON.parse(JSON.stringify(recipe)));
  } catch (error) {
    res.status(500).json({ message: 'Unexpected internal server error.' });
  }
});

handler.patch<NextApiRequestExtended, NextApiResponse>(
  protect(),
  async (req, res) => {
    try {
      await dbConnect();

      const { body, user, query } = req;

      if (user._id.toString() !== body?.author?.toString()) {
        return res
          .status(403)
          .send(
            'Your account is not authorized to access the requested resource.'
          );
      }

      const updatedRecipe = await Recipe.findByIdAndUpdate(
        query.recipeId,
        body,
        {
          new: true,
        }
      );

      return res.status(200).json(JSON.parse(JSON.stringify(updatedRecipe)));
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
      await dbConnect();

      const { user, query } = req;

      if (typeof query.recipeId !== 'string') {
        throw new Error('recipeId must be a string');
      }

      const currentRecipe = await Recipe.findById(query.recipeId);

      if (user._id.toString() !== currentRecipe?.author?.toString()) {
        return res
          .status(403)
          .send(
            'Your account is not authorized to access the requested resource.'
          );
      }

      await Recipe.findByIdAndDelete(query.recipeId);

      await cloudinary.v2.uploader.destroy(`cook-me-pls/${query.recipeId}`, {
        invalidate: true,
      });

      return res.status(204).end();
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Unexpected internal server error.' });
    }
  }
);

export default handler;
