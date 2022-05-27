import Joi from './objectId';

export const objectIdValidator = {
  schema: Joi.object({
    id: Joi.objectId(),
  }),
};

export const listPaginationValidator = {
  schema: Joi.object({
    page: Joi.number(),
  }),
};
