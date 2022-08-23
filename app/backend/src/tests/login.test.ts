import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import { ILogin, IUserWithPassword } from '../interfaces/ILogin';
import User from '../database/models/UserModel';
import passwordService from '../services/passwordService';
import LoginController from '../controllers/loginController';
import JwtService from '../services/JWTservice';

chai.use(chaiHttp);

const { expect } = chai;

const bodyMock: ILogin = {
  email: 'projeto@trybe.com',
  password: 'no-hash',
}

const userMock: IUserWithPassword = {
  id: 1,
  username: 'Catherine',
  email: 'projeto@trybe.com',
  role: 'admin',
  password: 'hash-password',
}

describe('Login', () => {
  beforeEach(() => {
    sinon.stub(User, "findOne").resolves(userMock as User);
    sinon.stub(passwordService, 'checkPassword').resolves(true);
  })

  afterEach(() => {
    sinon.restore();
  })

  it('should return status 200', async () => {
    const response = await chai.request(app)
        .post('/login')
        .send(bodyMock);

      expect(response.status).to.equal(200);
  });
});
