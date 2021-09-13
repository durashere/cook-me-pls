import mongoose, { Model } from 'mongoose';

import { TIMES, DIFFICULTIES, UNITS } from '@/app/constants';
import { IUser } from './user';
import { IIngredient } from './ingredient';

export interface IStep extends mongoose.Document {
  _id: string;
  instruction: string;
}

export interface IRecipe extends mongoose.Document {
  _id: string;
  author: IUser;
  cookTime: string;
  difficulty: string;
  image: string;
  ingredients: IIngredient[];
  name: string;
  servings: number;
  steps: IStep[];
}

const RecipeSchema = new mongoose.Schema(
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

const Recipe: Model<IRecipe> =
  mongoose.models.Recipe || mongoose.model<IRecipe>('Recipe', RecipeSchema);

export default Recipe;
