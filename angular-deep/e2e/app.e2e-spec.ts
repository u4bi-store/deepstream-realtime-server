import { AngularDeepPage } from './app.po';

describe('angular-deep App', () => {
  let page: AngularDeepPage;

  beforeEach(() => {
    page = new AngularDeepPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
