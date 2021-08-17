import { getSession } from 'next-auth/client';

import dbConnect from '@/backend/mongoose';

import Ingredient from '@/backend/models/ingredient';

const handler = async (req, res) => {
  const { body, method, query } = req;
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
          const regex = new RegExp(query.searchQuery, 'i');

          const ingredients = await Ingredient.find({
            $or: [{ name: regex }],
          }).sort({ name: 1 });

          res.status(200).json(ingredients);
        }
      } catch (error) {
        res.status(500).json(error);
      }
      break;

    case 'POST':
      try {
        if (!session) {
          res
            .status(401)
            .send('You are unauthorized to access the requested resource. Please log in.');
        }

        if (session) {
          const newIngredient = await Ingredient.create(body);
          res.status(201).json(newIngredient);
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
