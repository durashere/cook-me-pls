import { UNITS } from '@/app/constants';
import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  unit: {
    type: String,
    enum: UNITS,
    required: true,
  },
});

ingredientSchema.pre('save', async function () {
  // function capitalize(text) {
  //   return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  // }

  function lowercase(text) {
    return text.toLowerCase();
  }

  this.name = await lowercase(this.name);
});

const Ingredient = mongoose.models.Ingredient || mongoose.model('Ingredient', ingredientSchema);

export default Ingredient;
