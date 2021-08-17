import { getSession } from 'next-auth/client';

import dbConnect from '@/backend/mongoose';

import Ingredient from '@/backend/models/ingredient';

const handler = async (req, res) => {
  const {
    body,
    method,
    query: { ingredientId },
  } = req;
  const session = await getSession({ req });

  switch (method) {
    case 'GET':
      try {
        if (!session) {
          res
            .status(401)
            .send('You are unauthorized to access the requested resource. Please log in.');
        }

        if (session) {
          const ingredient = await Ingredient.findById(ingredientId);
          res.status(200).json(ingredient);
        }
      } catch (error) {
        res.status(500).json(error);
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
          const updatedIngredient = await Ingredient.findByIdAndUpdate(ingredientId, body, {
            new: true,
          });
          res.status(200).json(updatedIngredient);
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
          await Ingredient.findByIdAndDelete(ingredientId);
          res.status(204);
        }
      } catch (error) {
        res.status(500).json(error);
      }
      break;

    default:
      res.status(405).json('This method type is not currently supported.');
      break;
  }
};

export default dbConnect(handler);
