import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPokemonsRepository from '../repositories/IPokemonsRepository';
import IPokemon from '../dtos/IPokemonDTO';

interface IRequest {
  pokemon_id: string;
  name: string;
  type: string;
}

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('PokemonsRepository')
    private pokemonsRepository: IPokemonsRepository,
  ) {}

  public async execute({
    pokemon_id,
    name,
    type,
  }: IRequest): Promise<IPokemon> {
    const pokemon = await this.pokemonsRepository.findById(pokemon_id);
    if (!pokemon) throw new AppError('Pokemon not found');

    const pokemonWithSameName = await this.pokemonsRepository.findByName(name);
    const samePokemon = JSON.stringify(pokemonWithSameName?._id) === JSON.stringify(pokemon._id);
    if (pokemonWithSameName && !samePokemon) {
      throw new AppError('Name already being used by other pokemon');
    }

    pokemon.name = name;
    pokemon.type = type;

    return this.pokemonsRepository.save(pokemon);
  }
}
