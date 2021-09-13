import mongoose, { Model } from 'mongoose';

import { UNITS } from '@/app/constants';

export interface IIngredient extends mongoose.Document {
  _id: string;
  name: string;
  quantity: number;
  unit: string;
}

const IngredientSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      unique: true,
    },
    quantity: {
      default: 1,
      required: true,
      type: Number,
    },
    unit: {
      enum: UNITS,
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

IngredientSchema.pre('save', async function () {
  // function capitalize(text) {
  //   return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  // }

  function lowercase(text) {
    return text.toLowerCase();
  }

  this.name = await lowercase(this.name);
});

const Ingredient: Model<IIngredient> =
  mongoose.models.Ingredient || mongoose.model('Ingredient', IngredientSchema);

export default Ingredient;
