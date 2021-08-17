import { getSession } from 'next-auth/client';
import cloudinary from 'cloudinary';

import dbConnect from '@/backend/mongoose';

import Recipe from '@/backend/models/recipe';

const handler = async (req, res) => {
  const {
    body,
    method,
    query: { recipeId },
  } = req;
  const session = await getSession({ req });

  switch (method) {
    case 'GET':
      try {
        const recipe = await Recipe.findById(recipeId);
        res.status(200).json(recipe);
      } catch (error) {
        res.status(500).send(error);
      }
      break;

    case 'PATCH':
      try {
        if (!session) {
          res
            .status(401)
            .send('You are unauthorized to access the requested resource. Please log in.');
        }

        if (session) {
          const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, body, {
            new: true,
          });
          res.status(200).json(updatedRecipe);
        }
      } catch (error) {
        res.status(500).json(error);
      }
      break;

    case 'DELETE':
      try {
        if (!session) {
          res
            .status(401)
            .send('You are unauthorized to access the requested resource. Please log in.');
        }

        if (session) {
          await Recipe.findByIdAndDelete(recipeId);
          await cloudinary.v2.uploader.destroy(`cook-me-pls/${recipeId}`, { invalidate: true });
          res.status(204);
        }
      } catch (error) {
        res.status(500).json(error);
      }
      break;

    default:
      res.status(422).json('This method type is not currently supported.');
      break;
  }
};

export default dbConnect(handler);
