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

const filter = function (isStrict = false, values) {
  const schema = Joi.array()
    .items(
      Joi.object({
        key: Joi.string()
          .valid(...values)
          .required(),
        value: Joi.string().required(),
      })
    )
    .required();

  if (isStrict) {
    schema.length(values.length);
  }

  return schema;
};

export const filterValidator = function (isStrict = false, ...validFilterKeys: string[]) {
  return {
    schema: Joi.object({
      filters: filter(isStrict, validFilterKeys),
      sort: Joi.object(),
      page: Joi.number(),
      limit: Joi.number(),
    }),
  };
};

export const searchValidator = function (isStrict = true, ...validValues: string[]) {
  const key = isStrict ? Joi.string().valid(...validValues) : Joi.string().allow(...validValues);
  return {
    schema: Joi.object({
      key: key.required(),
      value: Joi.string().required(),
    }),
  };
};

export const searchFilterValidator = function ({
  validSearchKeys = [''],
  validFilterKeys = [''],
  isStrict = false,
}: {
  validSearchKeys: string[];
  validFilterKeys: string[];
  isStrict?: boolean;
}) {
  return {
    schema: Joi.object({
      key: Joi.string()
        .allow(...validSearchKeys)
        .required(),
      value: Joi.string().required(),
      filters: filter(isStrict, validFilterKeys),
    }),
  };
};
