const mm = require('egg-mock');
const assert = require('assert');
describe('test/gzip.test.js', () => {
  let app;

  before(() => {
    app = mm.app({
      baseDir: 'test-app',
    });

    return app.ready();
  });

  after(() => app.close());
  afterEach(mm.restore);

  it('should GET /isGzip with gzip', () => {
    return app.httpRequest()
      .get('/isGzip')
      .set('user-agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1')
      .expect(200)
      .expect('Content-Encoding', 'gzip');
  })

  it('should GET /isNotGzip with non gzip', () => {
    return app.httpRequest()
      .get('/isNotGzip')
      .expect(200)
      .expect(function (res) {
        if (res.headers['content-encoding'] && res.headers['content-encoding'] === 'gzip') {
          throw new Error('expected "Content-Encoding" of undefined, got "gzip"');
        }
      });
  });

})