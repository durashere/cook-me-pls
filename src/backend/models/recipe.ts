import mongoose, { Model, PopulatedDoc } from 'mongoose';

import { IUser } from '@/backend/models/user';
import { TIMES, DIFFICULTIES, UNITS } from '@/app/constants';

export interface IStep extends mongoose.Document {
  _id: string;
  instruction: string;
}

export interface IIngredient extends mongoose.Document {
  _id: string;
  name: string;
  quantity: number;
  unit: string;
}

export interface IRecipe extends mongoose.Document {
  _id: string;
  author: PopulatedDoc<IUser & mongoose.Document>;
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
          required: true,
          type: String,
          unique: true,
        },
        quantity: {
          required: true,
          type: Number,
        },
        unit: {
          enum: UNITS,
          required: true,
          type: String,
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

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const Recipe: Model<IRecipe> =
  mongoose.models.Recipe || mongoose.model<IRecipe>('Recipe', RecipeSchema);

export default Recipe;
