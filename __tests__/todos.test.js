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

describe('tests for todo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('#POST should create a todo for the current user', async () => {
    const [agent, user] = await registerAndSignIn();
    const response = await agent.post('/api/v1/todos').send({
      content: 'finish this app'
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      user_id: user.id,
      content: 'finish this app',
      finished: false,
    });
  });

  it('#GET /api/v1/todos should get all todos for a user', async () => {
    const [agent, user] = await registerAndSignIn();
    await agent.post('/api/v1/todos').send({
      content: 'test',
    });

    const response = await agent.get('/api/v1/todos');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      user_id: user.id,
      content: 'test',
      finished: false,
    });

  });
  
  afterAll(() => {
    pool.end();
  });
});
