import { COOK_TIMES, DIFFICULTIES, UNITS } from '@/app/constants';
import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  cookTime: { type: String, enum: COOK_TIMES, required: true },
  difficulty: {
    type: String,
    enum: DIFFICULTIES,
    required: true,
  },
  ingredients: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        enum: UNITS,
        required: true,
      },
      _id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Ingredient',
        required: true,
      },
    },
  ],
  steps: [
    {
      instruction: {
        type: String,
        required: true,
      },
    },
  ],
});

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);

export default Recipe;
