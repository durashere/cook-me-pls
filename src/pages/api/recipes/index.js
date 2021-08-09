// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from '@/backend/mongoose';

import Recipe from '@/backend/models/recipe';

const handler = async (req, res) => {
  const { body, method, query } = req;

  switch (method) {
    case 'GET':
      try {
        const regex = new RegExp(query.searchQuery, 'i');

        const recipes = await Recipe.find({
          $or: [{ name: regex }, { difficulty: regex }, { cookTime: regex }],
        }).sort({ name: 1 });
        res.status(200).json(recipes);
      } catch (error) {
        res.status(500).json(error);
      }
      break;

    case 'POST':
      try {
        const newRecipe = await Recipe.create(body);
        res.status(201).json(newRecipe);
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
