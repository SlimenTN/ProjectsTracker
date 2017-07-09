import { ProjectsStalkerPage } from './app.po';

describe('projects-stalker App', () => {
  let page: ProjectsStalkerPage;

  beforeEach(() => {
    page = new ProjectsStalkerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
