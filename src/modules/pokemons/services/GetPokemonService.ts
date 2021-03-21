import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPokemonsRepository from '../repositories/IPokemonsRepository';
import IPokemon from '../dtos/IPokemonDTO';

@injectable()
export default class UpdatePokemonService {
  constructor(
    @inject('PokemonsRepository')
    private pokemonsRepository: IPokemonsRepository,
  ) {}

  public async execute(pokemon_id: string): Promise<IPokemon> {
    const pokemon = await this.pokemonsRepository.findById(pokemon_id);
    if (!pokemon) throw new AppError('Pokemon not found');

    return pokemon;
  }
}
