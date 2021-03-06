import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PokemonsController from '../controllers/PokemonsController';

const pokemonsRouter = Router();

const pokemonsController = new PokemonsController();

pokemonsRouter.use(ensureAuthenticated);

pokemonsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  pokemonsController.get,
);

pokemonsRouter.get(
  '/',
  pokemonsController.list,
);

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

pokemonsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      type: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  pokemonsController.update,
);

pokemonsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  pokemonsController.delete,
);

export default pokemonsRouter;
