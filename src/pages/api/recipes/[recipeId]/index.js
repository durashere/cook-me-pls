import cloudinary from 'cloudinary';
import nextConnect from 'next-connect';

import dbConnect from '@/backend/mongoose';
import protect from '@/backend/middleware/protect';
import Recipe from '@/backend/models/recipe';

const handler = nextConnect();

handler.get(async (req, res) => {
  try {
    const {
      query: { recipeId },
    } = req;

    const recipe = await Recipe.findById(recipeId).populate('author');

    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(500).json({ message: 'Unexpected internal server error.' });
  }
});

handler.patch(protect(), async (req, res) => {
  try {
    const {
      body,
      user,
      query: { recipeId },
    } = req;

    if (user._id.toString() !== body.author._id.toString()) {
      return res
        .status(403)
        .send('Your account is not authorized to access the requested resource.');
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, body, {
      new: true,
    });

    return res.status(200).json(updatedRecipe);
  } catch (error) {
    return res.status(500).json({ message: 'Unexpected internal server error.' });
  }
});

handler.delete(protect(), async (req, res) => {
  try {
    const {
      user,
      query: { recipeId },
    } = req;

    const currentRecipe = await Recipe.findById(recipeId).populate('author');

    if (user._id.toString() !== currentRecipe.author._id.toString()) {
      return res
        .status(403)
        .send('Your account is not authorized to access the requested resource.');
    }

    await Recipe.findByIdAndDelete(recipeId);

    await cloudinary.v2.uploader.destroy(`cook-me-pls/${recipeId}`, { invalidate: true });

    return res.status(204).json({ deleted: true });
  } catch (error) {
    return res.status(500).json({ message: 'Unexpected internal server error.' });
  }
});

export default dbConnect(handler);
