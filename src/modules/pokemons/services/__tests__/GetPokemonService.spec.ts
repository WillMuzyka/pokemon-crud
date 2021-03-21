import AppError from '@shared/errors/AppError';

import FakePokemonsRepository from '@modules/pokemons/repositories/fakes/FakePokemonsRepository';
import GetPokemonService from '../GetPokemonService';

let fakePokemonsRepository: FakePokemonsRepository;
let getPokemon: GetPokemonService;

describe('DeletePokemon', () => {
  beforeEach(() => {
    fakePokemonsRepository = new FakePokemonsRepository();

    getPokemon = new GetPokemonService(
      fakePokemonsRepository,
    );
  });

  it('should be able to get the pokemon by ID', async () => {
    const pokemon = await fakePokemonsRepository.create({
      name: 'John',
      type: 'random',
    });

    const foundPokemon = await getPokemon.execute(JSON.stringify(pokemon._id));

    expect(foundPokemon).toHaveProperty('_id');
    expect(foundPokemon.name).toBe('John');
    expect(foundPokemon.type).toBe('random');
  });

  it('should not be able to get a non-existing pokemon', async () => {
    await expect(getPokemon.execute('nonExistentID')).rejects.toBeInstanceOf(AppError);
  });
});
