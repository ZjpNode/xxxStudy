const {app, mock, assert} = require('egg-mock/bootstrap');
describe('test/app/middleware/robot.test.js', () => {
  it('should block robot', () => {
    return app.httpRequest()
      .get('/')
      .set('User-Agent', "Baiduspider")
      .expect(403);
  })
  it('Content-Encoding is gzip', () => {
    return app.httpRequest()
      .get('/')
      .expect('Content-Encoding','gzip');
  })
})