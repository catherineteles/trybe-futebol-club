import * as Joi from 'joi';
import { ILogin } from '../interfaces/ILogin';

const validateBody = (data: ILogin) => {
  const schema = Joi.object({
    email: Joi.string().required().messages({
      'string.empty': 'All fields must be filled',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'All fields must be filled',
    }),
  });

  const { error, value } = schema.validate(data);

  if (error) {
    throw error;
  }
  return value;
};

export default validateBody;
