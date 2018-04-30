const path = require('path');
const { mock } = require('egg-mock/bootstrap');

describe('test/framework.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'test-app',
      framework: true,
      //framework: path.join(__dirname, '../node_modules/base-framework'),
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .set('user-agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1')
      .expect(200)
      .expect('Content-Encoding', 'gzip')
      .expect('framework: example-framework, isIOS: true');
  });
});