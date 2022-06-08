import mongoose from 'mongoose';

import Joi, { CustomHelpers } from '@keithics/sideway-joi';

// don't uncomment, joi/_ is needed even though it is not used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const joiObjectIdExtension = Joi.extend((_) => ({
  type: 'objectId',
  messages: {
    invalid: '{{#label}} is an invalid ObjectId with a value of - {{#value}}',
    required: '{{#label}} is required',
  },
  coerce(value: string, helpers: CustomHelpers) {
    if (mongoose.isValidObjectId(value)) {
      return { value };
    }
    if (!value) {
      return { value, errors: [helpers.error('required')] };
    }

    return { value, errors: [helpers.error('invalid')] };
  },
}));

export default joiObjectIdExtension;
