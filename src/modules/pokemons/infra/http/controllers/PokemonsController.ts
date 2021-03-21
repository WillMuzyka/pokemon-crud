import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePokemonService from '@modules/pokemons/services/CreatePokemonService';
import DeletePokemonService from '@modules/pokemons/services/DeletePokemonService';
import GetPokemonService from '@modules/pokemons/services/GetPokemonService';
import ListPokemonService from '@modules/pokemons/services/ListPokemonService';
import UpdatePokemonService from '@modules/pokemons/services/UpdatePokemonService';

export default class PokemonsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, type } = req.body;

    const createPokemon = container.resolve(CreatePokemonService);
    const pokemon = await createPokemon.execute({ name, type });

    return res.json({
      message: 'Pokemon created successfully',
      pokemon,
    });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deletePokemon = container.resolve(DeletePokemonService);
    await deletePokemon.execute(id);

    return res.json({
      message: 'Pokemon deleted successfully',
    });
  }

  public async get(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const getPokemon = container.resolve(GetPokemonService);
    const pokemon = await getPokemon.execute(id);

    return res.json({
      message: 'Pokemon retrieved successfully',
      pokemon,
    });
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const listPokemon = container.resolve(ListPokemonService);
    const pokemons = await listPokemon.execute();

    return res.json({
      message: 'Pokemons retrieved successfully',
      pokemons,
    });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      name, type, pokemon_id,
    } = req.body;

    const updatePokemon = container.resolve(UpdatePokemonService);
    const updatedPokemon = await updatePokemon.execute({
      pokemon_id,
      name,
      type,
    });

    return res.json(updatedPokemon);
  }
}
