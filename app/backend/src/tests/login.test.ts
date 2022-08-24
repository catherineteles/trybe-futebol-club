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
import JwtService from '../services/JWTservice';

chai.use(chaiHttp);

const { expect } = chai;

const bodyMock: ILogin = {
  email: 'projeto@trybe.com',
  password: 'no-hash',
}

const wrongBodyMock: ILogin = {
  email: '',
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
  
  afterEach(() => {
    sinon.restore();
  })

  it('should return status 200', async () => {
    sinon.stub(User, "findOne").resolves(userMock as User);
    sinon.stub(passwordService, 'checkPassword').resolves(true);
    const response = await chai.request(app)
        .post('/login')
        .send(bodyMock);

      expect(response.status).to.equal(200);
  });

  it('should return a token', async () => {
    sinon.stub(User, "findOne").resolves(userMock as User);
    sinon.stub(passwordService, 'checkPassword').resolves(true);
    const response = await chai.request(app)
        .post('/login')
        .send(bodyMock);

      expect(response.body).to.haveOwnProperty('token');
  });

  it('should throw an error if email is empty', async () => {
    const response = await chai.request(app)
        .post('/login')
        .send(wrongBodyMock);
      expect(response.status).to.equal(400);
  })

  it('should be called with status 400 if email is empty', async () => {
    const response = await chai.request(app)
        .post('/login')
        .send(wrongBodyMock);
      expect(response.body).to.haveOwnProperty('message');
      expect(response.body.message).to.equal('All fields must be filled');
  })

  it('should throw an error if password is empty', async () => {
    const response = await chai.request(app)
        .post('/login')
        .send({ email: 'project@test.com' });
      expect(response.status).to.equal(400);
  })

  it('should be called with status 400 if password is empty', async () => {
    const response = await chai.request(app)
        .post('/login')
        .send({ email: 'project@test.com' });
      expect(response.body).to.haveOwnProperty('message');
      expect(response.body.message).to.equal('All fields must be filled');
  })
});
