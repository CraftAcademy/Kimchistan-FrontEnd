import { AppPage } from './app.po';

describe('kimchistan-front-end App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  xit('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });

  // it('should find dropdown for Bibimbap', () => {
  //   page.navigateTo();
  //   element(by.model())
  // });
});


