import { AplikacjaPage } from './app.po';

describe('aplikacja App', function() {
  let page: AplikacjaPage;

  beforeEach(() => {
    page = new AplikacjaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
