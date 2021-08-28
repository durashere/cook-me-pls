import { TIMES, DIFFICULTIES, UNITS } from '@/app/constants';
import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    cookTime: { type: String, enum: TIMES, required: true },
    servings: { type: Number, required: true },
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
  },
  { timestamps: true }
);

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);

export default Recipe;
