import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';
import nextConnect from 'next-connect';

import { IUser } from '@/backend/models/user';
import dbConnect from '@/backend/dbConnect';
import protect from '@/backend/middleware/protect';
import Recipe, { IRecipe } from '@/backend/models/recipe';

interface NextApiRequestExtended extends NextApiRequest {
  body: IRecipe;
  user: IUser;
}

const handler = nextConnect();

handler.get<NextApiRequest, NextApiResponse>(async (req, res) => {
  try {
    await dbConnect();

    const {
      query: { recipeId },
    } = req;

    const recipe = await Recipe.findById(recipeId);

    return res.status(200).json(recipe);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Unexpected internal server error.' });
  }
});

handler.patch<NextApiRequestExtended, NextApiResponse>(
  protect(),
  async (req, res) => {
    try {
      await dbConnect();

      const {
        body,
        user,
        query: { recipeId },
      } = req;

      if (user._id.toString() !== body?.author?.toString()) {
        return res
          .status(403)
          .send(
            'Your account is not authorized to access the requested resource.'
          );
      }

      const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, body, {
        new: true,
      });

      return res.status(200).json(updatedRecipe);
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

      const {
        user,
        query: { recipeId },
      } = req;

      if (typeof recipeId !== 'string') {
        throw new Error('recipeId must be a string');
      }

      const currentRecipe = await Recipe.findById(recipeId);

      if (user._id.toString() !== currentRecipe?.author?.toString()) {
        return res
          .status(403)
          .send(
            'Your account is not authorized to access the requested resource.'
          );
      }

      await Recipe.findByIdAndDelete(recipeId);

      await cloudinary.v2.uploader.destroy(`cook-me-pls/${recipeId}`, {
        invalidate: true,
      });

      return res.status(204).send({});
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Unexpected internal server error.' });
    }
  }
);

export default handler;
