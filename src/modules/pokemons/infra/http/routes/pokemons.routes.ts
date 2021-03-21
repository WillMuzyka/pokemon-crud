import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PokemonsController from '../controllers/PokemonsController';

const pokemonsRouter = Router();

const pokemonsController = new PokemonsController();

pokemonsRouter.use(ensureAuthenticated);

pokemonsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      type: Joi.string().required(),
    },
  }),
  pokemonsController.create,
);

export default pokemonsRouter;
