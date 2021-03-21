import IPokemonDTO from '@modules/pokemons/dtos/IPokemonDTO';

import ICreatePokemonDTO from '@modules/pokemons/dtos/ICreatePokemonDTO';

interface IUsersRepository {
  create(user: ICreatePokemonDTO): Promise<IPokemonDTO>;
  // delete(id: string): Promise<void>;
  findById(id: string): Promise<IPokemonDTO | undefined>;
  findByName(name: string): Promise<IPokemonDTO | undefined>;
  // list(): Promise<IPokemonDTO[]>;
  save(userData: IPokemonDTO): Promise<IPokemonDTO>;
  // show(id: string): Promise<IPokemonDTO | undefined>;
}

export default IUsersRepository;
