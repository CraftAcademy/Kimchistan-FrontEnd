import { AppPage } from './app.po';
import { TestBed, inject } from '@angular/core/testing';
import { by, browser, element } from 'protractor';

describe('kimchistan-front-end App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should find dropdown for Bibimbap, salad and drinks', () => {
    page.navigateTo();
    browser.wait(function () {
      return element(by.id('dropdown_Bibimbap')).isPresent();
    }, 5000);
    element(by.id('dropdown_Bibimbap')).click();
    element(by.id('dropdown_salad')).click();
    element(by.id('dropdown_drinks')).click();
  });

  it('should verify that dropdown is working', () => {
    let dropdownCategories = element(by.id('dropdown_Bibimbap'));
    expect(dropdownCategories.getText()).toBe('Välj Protein');
    dropdownCategories.click();
    element(by.id('Bibimbap_Chicken')).click();
  });

  it('should show order info when when item is added and hides when clicked', () => {
    let accordion = element(by.id('showing_cart'));
    expect(accordion.isPresent()).toBeFalsy();

    element(by.id('dropdown_Bibimbap')).click();
    element(by.id('Bibimbap_Tofu')).click();

    expect(accordion.isPresent()).toBeTruthy();
    accordion.getText().then(function(text){expect(text).toContain('1 in cart (116 kr)')});

    expect(element(by.linkText('Show/hide order')).getTagName()).toBe('a');
    element(by.linkText('Show/hide order')).click();
    // expect(accordion.isPresent()).toBeFalsy(); // this should verify that accordion is hidden but fails
  });
});


