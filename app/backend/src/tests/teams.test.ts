import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Team from '../database/models/TeamModel';
import { ITeam } from '../interfaces/ITeam';

chai.use(chaiHttp);

const { expect } = chai;

const teamMock: ITeam = {
  id: 1,
  teamName: 'AFC Richmond'
}


describe('Teams', () => {
  
  afterEach(() => {
    sinon.restore();
  })

  it('should return status 200', async () => {
    sinon.stub(Team, "findAll").resolves([teamMock as Team]);
    
    const response = await chai.request(app)
        .get('/teams')

      expect(response.status).to.equal(200);
  });

  it('should return a teams', async () => {
    sinon.stub(Team, "findAll").resolves([teamMock as Team]);
    
    const response = await chai.request(app)
        .get('/teams')

      expect(response.body).to.deep.equal([teamMock]);
  });

  it('should return status 200 when find team', async () => {
    sinon.stub(Team, "findByPk").resolves(teamMock as Team);
    
    const response = await chai.request(app)
        .get('/teams/1')

      expect(response.status).to.equal(200);
  });

  it('should return the correct team', async () => {
    sinon.stub(Team, "findByPk").resolves(teamMock as Team);
    
    const response = await chai.request(app)
        .get('/teams/1')

      expect(response.body).to.deep.equal(teamMock);
  });
});
