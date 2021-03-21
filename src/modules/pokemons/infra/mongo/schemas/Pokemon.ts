import mongoose, { Schema, Document } from 'mongoose';
import IPokemon from '@modules/pokemons/dtos/IPokemonDTO';

type IPokemonDocument = IPokemon & Document

const PokemonSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IPokemonDocument>('Pokemon', PokemonSchema);
