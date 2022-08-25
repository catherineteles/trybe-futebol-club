import * as Joi from 'joi';
import { IBodyMatch } from '../interfaces/IMatches';
import { ILogin } from '../interfaces/ILogin';
import TeamService from './teamService';

const message = 'All fields must be filled';

const validateBody = (data: ILogin) => {
  const schema = Joi.object({
    email: Joi.string().required().messages({
      'string.empty': message,
      'any.required': message,
    }),
    password: Joi.string().required().messages({
      'string.empty': message,
      'any.required': message,
    }),
  });

  const { error, value } = schema.validate(data);

  if (error) {
    throw error;
  }
  return value;
};

export const validateMatch = async (data: IBodyMatch) => {
  const { awayTeam, homeTeam } = data;
  if (awayTeam === homeTeam) {
    const error = new Error('It is not possible to create a match with two equal teams');
    error.name = 'UnauthorizedError';
    throw error;
  }
  await TeamService.checkIfExist(awayTeam);
  await TeamService.checkIfExist(homeTeam);
};

export default validateBody;
