import { snakeToCapitalize } from '@keithics/core/lib/helpers';

interface ValidateSchemaInterface {
  error: string;
  value?: unknown;
}

export function validateSchemaId(data, val): ValidateSchemaInterface {
  const { error, value } = data.schema.validate(val, {
    stripUnknown: true,
    abortEarly: false,
    label: false,
    errors: {
      wrap: { label: false, array: '', string: '' },
      segment: false,
    },
  });
  const valid = error == null;

  if (valid) {
    return { error: null, value };
  } else {
    const { details } = error;
    const { message, path } = details[0];

    // get custom error if exists else use joi errors
    // eslint-disable-next-line no-prototype-builtins
    return { error: data.errors?.hasOwnProperty(path[0]) ? data.errors[path[0]] : snakeToCapitalize(message) };
  }
}
/**
 * Validate express body or query
 * This will strip all non defined fields
 * @param data Schema
 * @param query true if /:id GET queries, otherwise req.body
 */

const validator = (data, query = false) => {
  return function (req, res, next) {
    const val = query ? req.params : req.body;
    const { error: errorMessage, value } = validateSchemaId(data, val);

    if (value) {
      req.body = value;
      next(null, value);
    } else {
      res.status(422).json({ message: errorMessage });
    }
  };
};

export default validator;
