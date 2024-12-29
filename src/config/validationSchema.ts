import joi from 'joi';

export const envVariablesSchema = joi.object({
  PORT: joi.number().port(),
  IS_DEV: joi.string(),
});
