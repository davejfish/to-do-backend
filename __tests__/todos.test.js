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
    const [agent] = registerAndSignIn();
    const response = agent.post('api/v1/todo').send({
      content: 'finish this app'
    });
    expect(response.status).toBe(200);
  });
  
  afterAll(() => {
    pool.end();
  });
});
