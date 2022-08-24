import * as Joi from 'joi';
import { ILogin } from '../interfaces/ILogin';

const message = 'All fields must be filled';

const validateBody = (data: ILogin) => {
  const schema = Joi.object({
    email: Joi.string().required().messages({
      'string.empty': message,
      'any.required': message,
    }),
    password: Joi.string().required().messages({
      'string.empty': message,
    }),
  });

  const { error, value } = schema.validate(data);

  if (error) {
    throw error;
  }
  return value;
};

export default validateBody;
