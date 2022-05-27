import { validateSchemaId } from './validator';
import Joi from './objectId';
import { objectIdValidator } from './core.validator';

export const objectIdValidatorRequired = {
  schema: Joi.object({
    sellerId: Joi.objectId().required(),
  }),
};
export const StringSchema = {
  schema: Joi.object({
    firstName: Joi.string().required(),
  }),
};

const ArraySchema = {
  schema: Joi.object({
    list: Joi.array()
      .min(1)
      .items({
        keywords: Joi.string().required(),
        fallbackUrl: Joi.string().uri().required(),
        weight: Joi.number().required(),
      })
      .required(),
  }),
};

describe('Ark Error Handler Tests', () => {
  test('INVALID object ID - should return error if objectID is invalid', () => {
    expect(validateSchemaId(objectIdValidator, { id: '000' })).toMatchSnapshot();
  });

  test('NO object ID - should return error if objectID is invalid', () => {
    expect(validateSchemaId(objectIdValidatorRequired, { notAnId: '000' })).toMatchSnapshot();
  });

  test('INVALID object ID - should return error if sellerId is invalid', () => {
    expect(validateSchemaId(objectIdValidatorRequired, { sellerId: '0' })).toMatchSnapshot();
  });

  test('VALID object ID - should return error if objectID is invalid', () => {
    expect(validateSchemaId(objectIdValidatorRequired, { sellerId: '0'.repeat(24) })).toMatchSnapshot();
  });

  test('VALID String - should return error friendly message', () => {
    expect(validateSchemaId(StringSchema, {})).toMatchSnapshot();
  });

  test('INVALID Array with no values- should return error friendly message', () => {
    expect(validateSchemaId(ArraySchema, {})).toMatchSnapshot();
  });

  test('INVALID Array - should return error friendly message', () => {
    expect(
      validateSchemaId(ArraySchema, {
        list: [
          {
            keywords: 'keywords',
            fallbackUrl: 'http://aaa.com',
          },
        ],
      })
    ).toMatchSnapshot();
  });

  test('INVALID Array with missing item value - should return error friendly message', () => {
    expect(
      validateSchemaId(ArraySchema, {
        list: [
          {
            keywords: '',
            fallbackUrl: 'http://aaa.com',
          },
        ],
      })
    ).toMatchSnapshot();
  });

  test('INVALID Array with missing item value at index 1 - should return error friendly message', () => {
    expect(
      validateSchemaId(ArraySchema, {
        list: [
          {
            keywords: 'keyword',
            fallbackUrl: 'http://aaa.com',
            weight: 1,
          },
          {
            keywords: '',
            fallbackUrl: '',
            weight: null,
          },
        ],
      })
    ).toMatchSnapshot();
  });
});
