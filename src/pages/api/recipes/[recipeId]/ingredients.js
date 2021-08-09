// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from '@/backend/mongoose';

import Recipe from '@/backend/models/recipe';

const handler = async (req, res) => {
  const {
    body,
    method,
    query: { recipeId },
  } = req;

  switch (method) {
    case 'GET':
      try {
        const recipe = await Recipe.findById(recipeId);
        const recipeIngredients = recipe.ingredients;
        res.status(200).json(recipeIngredients);
      } catch (error) {
        res.status(500).json(error);
      }
      break;

    case 'POST':
      try {
        const newRecipeIngredient = await Recipe.create(body);
        res.status(201).json(newRecipeIngredient);
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
