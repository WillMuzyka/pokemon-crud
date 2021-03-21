import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPokemon from '@modules/pokemons/dtos/IPokemonDTO';

import IPokemonsRepository from '@modules/pokemons/repositories/IPokemonsRepository';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('PokemonsRepository')
    private pokemonsRepository: IPokemonsRepository,
  ) {}

  async execute({ name, type }: Omit<IPokemon, '_id'>): Promise<IPokemon> {
    const checkPokemonExists = await this.pokemonsRepository.findByName(name);
    if (checkPokemonExists) {
      throw new AppError('Pokemon name already used.');
    }

    const pokemon = await this.pokemonsRepository.create({
      name,
      type,
    });
    return pokemon;
  }
}
