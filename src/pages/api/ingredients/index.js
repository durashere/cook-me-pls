import nextConnect from 'next-connect';

import dbConnect from '@/backend/mongoose';
import Ingredient from '@/backend/models/ingredient';
import protect from '@/backend/middleware/protect';

const handler = nextConnect();

handler.get(protect(), async (req, res) => {
  try {
    const { query } = req;

    const regex = new RegExp(query.searchQuery, 'i');

    const ingredients = await Ingredient.find({
      $or: [{ name: regex }],
    }).sort({ name: 1 });

    return res.status(200).json(ingredients);
  } catch (error) {
    return res.status(500).json({ message: 'Unexpected internal server error.' });
  }
});

handler.post(protect(), async (req, res) => {
  try {
    const { body } = req;

    const newIngredient = await Ingredient.create(body);

    return res.status(201).json(newIngredient);
  } catch (error) {
    return res.status(500).json({ message: 'Unexpected internal server error.' });
  }
});

export default dbConnect(handler);
