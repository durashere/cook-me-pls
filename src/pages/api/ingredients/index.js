// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from '@/backend/mongoose';

import Ingredient from '@/backend/models/ingredient';

const handler = async (req, res) => {
  const { body, method, query } = req;

  switch (method) {
    case 'GET':
      try {
        const regex = new RegExp(query.searchQuery, 'i');
        const ingredients = await Ingredient.find({
          $or: [{ name: regex }],
        }).sort({ name: 1 });
        res.status(200).json(ingredients);
      } catch (error) {
        res.status(500).json(error.message);
      }
      break;

    case 'POST':
      try {
        console.log(body);

        const newIngredient = await Ingredient.create(body);
        res.status(201).json(newIngredient);
      } catch (error) {
        res.status(500).json(error.message);
      }
      break;

    default:
      res.status(422).json('req_method_not_supported');
      break;
  }
};

export default dbConnect(handler);
