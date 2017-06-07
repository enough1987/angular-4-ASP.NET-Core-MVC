import { AngTestPage } from './app.po';

describe('ang-test App', () => {
  let page: AngTestPage;

  beforeEach(() => {
    page = new AngTestPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
