import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePokemonService from '@modules/pokemons/services/CreatePokemonService';
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
