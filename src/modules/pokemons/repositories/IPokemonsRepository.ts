import IPokemonDTO from '@modules/pokemons/dtos/IPokemonDTO';

import ICreatePokemonDTO from '@modules/pokemons/dtos/ICreatePokemonDTO';

interface IUsersRepository {
  create(user: ICreatePokemonDTO): Promise<IPokemonDTO>;
  delete(pokemon_id: string): Promise<void>;
  findAll(): Promise<IPokemonDTO[]>;
  findById(id: string): Promise<IPokemonDTO | undefined>;
  findByName(name: string): Promise<IPokemonDTO | undefined>;
  save(userData: IPokemonDTO): Promise<IPokemonDTO>;
}

export default IUsersRepository;
