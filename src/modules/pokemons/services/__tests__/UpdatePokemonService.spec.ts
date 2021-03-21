import AppError from '@shared/errors/AppError';

import FakePokemonsRepository from '@modules/pokemons/repositories/fakes/FakePokemonsRepository';
import UpdatePokemonService from '../UpdatePokemonService';

let fakePokemonsRepository: FakePokemonsRepository;
let updatePokemon: UpdatePokemonService;

describe('UpdatePokemon', () => {
  beforeEach(() => {
    fakePokemonsRepository = new FakePokemonsRepository();

    updatePokemon = new UpdatePokemonService(
      fakePokemonsRepository,
    );
  });

  it('should be able to update the pokemon information', async () => {
    const pokemon = await fakePokemonsRepository.create({
      name: 'John',
      type: 'random',
    });

    const updatedPokemon = await updatePokemon.execute({
      pokemon_id: JSON.stringify(pokemon._id),
      name: 'John Evolution',
      type: 'random/human',
    });

    expect(updatedPokemon.name).toBe('John Evolution');
    expect(updatedPokemon.type).toBe('random/human');
  });

  it('should not be able to update the information of non-existing pokemon', async () => {
    await expect(
      updatePokemon.execute({
        pokemon_id: JSON.stringify('nonExistentID'),
        name: 'John Evolution',
        type: 'random/human',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update name to another existing pokemon name', async () => {
    await fakePokemonsRepository.create({
      name: 'John',
      type: 'random',
    });

    const pokemon = await fakePokemonsRepository.create({
      name: 'Alice',
      type: 'ghost',
    });

    await expect(
      updatePokemon.execute({
        pokemon_id: JSON.stringify(pokemon._id),
        name: 'John',
        type: 'ghost/random',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
