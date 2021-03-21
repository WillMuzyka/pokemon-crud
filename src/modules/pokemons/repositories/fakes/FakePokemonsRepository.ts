import { uuid } from 'uuidv4';

import IPokemon from '@modules/pokemons/dtos/IPokemonDTO';
import ICreatePokemonDTO from '@modules/pokemons/dtos/ICreatePokemonDTO';
import IPokemonsRepository from '../IPokemonsRepository';

class PokemonsRepository implements IPokemonsRepository {
  private pokemons: IPokemon[] = [];

  public async create(pokemonData: ICreatePokemonDTO): Promise<IPokemon> {
    const pokemon = {} as IPokemon;

    Object.assign(
      pokemon,
      {
        _id: uuid(),
        ...pokemonData,
      },
    );

    this.pokemons.push(pokemon);
    return pokemon;
  }

  public async findAll(): Promise<IPokemon[]> {
    return this.pokemons;
  }

  public async findById(id: string): Promise<IPokemon | undefined> {
    const findPokemon = this.pokemons.find((pokemon) => JSON.stringify(pokemon._id) === id);

    return findPokemon;
  }

  public async findByName(name: string): Promise<IPokemon | undefined> {
    const findPokemon = this.pokemons.find((pokemon) => pokemon.name === name);

    return findPokemon;
  }

  public async save(pokemon: IPokemon): Promise<IPokemon> {
    const pokemonIndex = this.pokemons.findIndex((findPokemon) => pokemon._id === findPokemon._id);
    this.pokemons[pokemonIndex] = pokemon;

    return this.pokemons[pokemonIndex];
  }
}

export default PokemonsRepository;
