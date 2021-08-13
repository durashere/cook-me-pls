// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from '@/backend/mongoose';

import Ingredient from '@/backend/models/ingredient';

const handler = async (req, res) => {
  const {
    body,
    method,
    query: { ingredientId },
  } = req;

  switch (method) {
    case 'GET':
      try {
        const ingredient = await Ingredient.findById(ingredientId);
        res.status(200).json(ingredient);
      } catch (error) {
        res.status(500).json(error);
      }
      break;

    case 'PATCH':
      try {
        const updatedIngredient = await Ingredient.findByIdAndUpdate(ingredientId, body, {
          new: true,
        });
        res.status(200).json(updatedIngredient);
      } catch (error) {
        res.status(500).json(error);
      }
      break;

    case 'DELETE':
      try {
        await Ingredient.findByIdAndDelete(ingredientId);
        res.status(204);
      } catch (error) {
        res.status(500).json(error);
      }
      break;

    default:
      res.status(422).json('req_method_not_supported');
      break;
  }
};

export default dbConnect(handler);
