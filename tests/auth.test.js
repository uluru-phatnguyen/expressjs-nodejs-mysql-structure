const httpStatus = require('http-status');
const chai = require('chai');
const request = require('supertest');
const server = require('../app');
const { expect } = chai;

describe('SignUp', async () => {
  it('SignUp Success', async () => {
    const signUpSuccessData = {
      firstName: 'Firstname',
      lastName: 'Lastname',
      password: '123@123',
      email: 'test1@gmail.com',
    };

    const { status, body } = await request(server).post('/api/auth/signup').send(signUpSuccessData);
    const { token, user } = body?.data ?? {};

    expect(status).to.equal(httpStatus.CREATED);
    expect(user).to.have.property('firstName').equal(signUpSuccessData.firstName);
    expect(user).to.have.property('lastName').equal(signUpSuccessData.lastName);
    expect(user).to.have.property('email').equal(signUpSuccessData.email);
    expect(token).to.have.lengthOf.at.least(100);
  });

  it('SignUp Validation', async () => {
    const signUpData = {
      firstName: 'Firstname',
      lastName: 'Lastname',
      password: '',
      email: 'test2@gmail.com',
    };

    const { status, body } = await request(server).post('/api/auth/signup').send(signUpData);
    const { keys = [] } = body?.validation?.body ?? {};

    expect(status).to.equal(httpStatus.BAD_REQUEST);
    expect(keys).to.lengthOf(1);
    expect(keys).to.have.members(['password']);
  });
});
