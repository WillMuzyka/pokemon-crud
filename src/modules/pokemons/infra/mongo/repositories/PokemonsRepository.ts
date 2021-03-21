import mongoose from 'mongoose';

import AppError from '@shared/errors/AppError';
import IPokemonsRepository from '@modules/pokemons/repositories/IPokemonsRepository';
import ICreatePokemonDTO from '@modules/pokemons/dtos/ICreatePokemonDTO';
import IPokemon from '@modules/pokemons/dtos/IPokemonDTO';
import PokemonModel from '../schemas/Pokemon';

export default class UsersRepository implements IPokemonsRepository {
  public async create(pokemonData: ICreatePokemonDTO): Promise<IPokemon> {
    const newPokemon = await PokemonModel.create({
      ...pokemonData,
      _id: mongoose.Types.ObjectId(),
    }).catch((err) => {
      throw new AppError(`Error creating pokemon: ${err}`);
    });
    return newPokemon.toObject();
  }

  public async findById(id: string): Promise<IPokemon | undefined> {
    const pokemon = await PokemonModel.findById(id).catch((err) => {
      throw new AppError(`Error finding pokemon by ID: ${err}`);
    });
    return pokemon === null ? undefined : pokemon.toObject();
  }

  public async findByName(name: string): Promise<IPokemon | undefined> {
    const pokemon = await PokemonModel.findOne({ name }).catch((err) => {
      throw new AppError(`Error finding pokemon by name: ${err}`);
    });
    return pokemon === null ? undefined : pokemon.toObject();
  }

  public async save(pokemonData: IPokemon): Promise<IPokemon> {
    const { name, type } = pokemonData;
    const pokemon = await PokemonModel.findOneAndUpdate(
      { _id: pokemonData._id },
      {
        name,
        type,
      },
    );

    if (pokemon === null) throw new AppError('User ID not present on DB');
    return {
      ...pokemon.toObject(),
      name,
      type,
    };
  }
}
