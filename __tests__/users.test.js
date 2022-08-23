const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const testUser = {
  email: 'test@exmaple.com',
  password: '123456'
};

const registerAndSignIn = async (props = {}) => {
  const mockUser = {
    ...testUser,
    ...props
  };

  const agent = request.agent(app);

  const response = await agent
    .post('/api/v1/user/sessions')
    .send(mockUser);
  
  const user = response.body;
  
  return [agent, user];
};

describe('tests for user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('#POST api/v1/user/sessions should create and sign in a new user', async () => {
    const response = await request(app).post('/api/v1/user/sessions').send(testUser);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      email: 'test@exmaple.com',
    });
  });

  it('#GET api/v1/user/me should return the current user', async () => {
    const [agent, user] = await registerAndSignIn();
    const response = await agent.get('/api/v1/user/me');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ...user,
      exp: expect.any(Number),
      iat: expect.any(Number),
    });
  });

  it('#DELETE /api/v1/user/session should delete a cookie', async () => {
    const [agent] = registerAndSignIn();
    let response = await agent.delete('/api/v1/user/sessions');
    expect(response.status).toBe(200);
    response = await agent.get('/api/v1/user/me');
    expect(response.status).toBe(401);
  });
  
  afterAll(() => {
    pool.end();
  });
});
