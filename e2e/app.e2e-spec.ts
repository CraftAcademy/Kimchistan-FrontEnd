import {AppPage} from './app.po';
import {by, browser, element} from 'protractor';

describe('kimchistan-front-end App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should find dropdown for Bibimbap', () => {
    page.navigateTo();
    browser.wait(function () {
      return element(by.id('dropdown_Bibimbap')).isPresent();
    }, 5000);
    element(by.id('dropdown_Bibimbap')).click();
    element(by.id('dropdown_salad')).click();
    element(by.id('dropdown_drinks')).click();
  });

  it('should verify that dropdown is working', function () {
    browser.waitForAngular();
    var dropdownCategories = element(by.id('dropdown_Bibimbap'));
    expect(dropdownCategories.getText()).toBe('Välj Protein');
    dropdownCategories.click().then(function () {
      browser.waitForAngular();
      browser.sleep(1000).then(function () {
        element(by.id('Bibimbap_Chicken')).click();
      });
    });
  });
});


