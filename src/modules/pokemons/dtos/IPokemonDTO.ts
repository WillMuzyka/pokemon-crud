import mongoose from 'mongoose';

interface IPokemon{
  _id: mongoose.Types.ObjectId;
  name: string;
  type: string;
}

export default IPokemon;
