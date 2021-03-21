import AppError from '@shared/errors/AppError';

import FakepokemonsRepository from '@modules/pokemons/repositories/fakes/FakePokemonsRepository';
import CreatePokemonService from '../CreatePokemonService';

let fakepokemonsRepository: FakepokemonsRepository;
let createPokemon: CreatePokemonService;

describe('Createpokemon', () => {
  beforeEach(() => {
    fakepokemonsRepository = new FakepokemonsRepository();

    createPokemon = new CreatePokemonService(
      fakepokemonsRepository,
    );
  });

  it('should be able to create a new pokemon', async () => {
    const pokemon = await createPokemon.execute({
      name: 'John',
      type: 'random',
    });

    expect(pokemon).toHaveProperty('_id');
    expect(pokemon.name).toBe('John');
  });

  it('should not be able to create two pokemons with the same email ', async () => {
    await createPokemon.execute({
      name: 'John',
      type: 'random',
    });

    await expect(
      createPokemon.execute({
        name: 'John',
        type: 'random',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
