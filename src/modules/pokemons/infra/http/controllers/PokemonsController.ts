import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePokemonService from '@modules/pokemons/services/CreatePokemonService';

export default class PokemonsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, type } = req.body;

    const createPokemon = container.resolve(CreatePokemonService);
    const newPokemon = await createPokemon.execute({ name, type });

    return res.json({
      message: 'Pokemon created successfully',
      newPokemon,
    });
  }
}
