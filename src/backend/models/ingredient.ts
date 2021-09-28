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

IngredientSchema.pre('save', function (this: IIngredient) {
  function lowercase(text: string): string {
    return text.toLowerCase();
  }

  this.name = lowercase(this.name);
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const Ingredient: Model<IIngredient> =
  mongoose.models.Ingredient || mongoose.model('Ingredient', IngredientSchema);

export default Ingredient;
