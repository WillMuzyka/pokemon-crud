import FakepokemonsRepository from '@modules/pokemons/repositories/fakes/FakePokemonsRepository';
import ListPokemonService from '../ListPokemonService';

let fakepokemonsRepository: FakepokemonsRepository;
let listPokemon: ListPokemonService;

describe('ListPokemons', () => {
  beforeEach(() => {
    fakepokemonsRepository = new FakepokemonsRepository();

    listPokemon = new ListPokemonService(
      fakepokemonsRepository,
    );
  });

  it('should be able to list all pokemons', async () => {
    const pokemons = await listPokemon.execute();
    expect(pokemons).toMatchObject([]);
  });
});
