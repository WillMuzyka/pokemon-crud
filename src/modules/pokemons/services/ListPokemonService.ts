import { inject, injectable } from 'tsyringe';

import IPokemon from '@modules/pokemons/dtos/IPokemonDTO';

import IPokemonsRepository from '@modules/pokemons/repositories/IPokemonsRepository';

@injectable()
export default class ListPokemonService {
  constructor(
    @inject('PokemonsRepository')
    private pokemonsRepository: IPokemonsRepository,
  ) {}

  async execute(): Promise<IPokemon[]> {
    const pokemons = await this.pokemonsRepository.findAll();
    return pokemons;
  }
}
