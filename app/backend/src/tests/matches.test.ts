import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { IMatches } from '../interfaces/IMatches';
import Match from '../database/models/MatchesModel';

chai.use(chaiHttp);

const { expect } = chai;

const matchMock: IMatches = {
  id: 1,
  homeTeam: 1,
  homeTeamGoals: 2,
  awayTeam: 2,
  awayTeamGoals: 1,
  inProgress: true,
}


describe('Matches', () => {
  beforeEach(() => {
    sinon.stub(Match, "findAll").resolves([matchMock as Match]);
  })
  afterEach(() => {
    sinon.restore();
  })

  it('should return status 200 when calls /matches', async () => {
    const response = await chai.request(app)
        .get('/matches')

      expect(response.status).to.equal(200);
  });

});