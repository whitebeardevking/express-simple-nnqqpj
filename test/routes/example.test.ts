import { createServer } from '../../src/server';
import * as request from 'supertest';
const app = createServer();

describe('example', function () {
  it('should respond to GET on /', (done) => {
    request(app)
      .get('/')
      .expect(200, { foo: 'bar' }, (err) => done(err));
  });
});
