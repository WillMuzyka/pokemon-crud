import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPokemonsRepository from '../repositories/IPokemonsRepository';

@injectable()
export default class DeletePokemonService {
  constructor(
    @inject('PokemonsRepository')
    private pokemonsRepository: IPokemonsRepository,
  ) {}

  public async execute(pokemon_id: string): Promise<void> {
    const pokemon = await this.pokemonsRepository.findById(pokemon_id);
    if (!pokemon) throw new AppError('Pokemon not found');

    return this.pokemonsRepository.delete(pokemon_id);
  }
}
