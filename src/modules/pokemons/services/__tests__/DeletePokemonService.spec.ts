import AppError from '@shared/errors/AppError';

import FakePokemonsRepository from '@modules/pokemons/repositories/fakes/FakePokemonsRepository';
import DeletePokemonService from '../DeletePokemonService';

let fakePokemonsRepository: FakePokemonsRepository;
let deletePokemon: DeletePokemonService;

describe('DeletePokemon', () => {
  beforeEach(() => {
    fakePokemonsRepository = new FakePokemonsRepository();

    deletePokemon = new DeletePokemonService(
      fakePokemonsRepository,
    );
  });

  it('should be able to delete the pokemon by ID', async () => {
    const pokemon = await fakePokemonsRepository.create({
      name: 'John',
      type: 'random',
    });

    await expect(deletePokemon.execute(JSON.stringify(pokemon._id))).resolves;
  });

  it('should not be able to delete a non-existing pokemon', async () => {
    await expect(deletePokemon.execute('nonExistentID')).rejects.toBeInstanceOf(AppError);
  });
});
