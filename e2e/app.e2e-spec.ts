import { AppPage } from './app.po';
import { TestBed, inject } from '@angular/core/testing';
import { by, browser, element } from 'protractor';

describe('kimchistan-front-end App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  afterEach(function () {
    browser.get('/');
    browser.executeScript('localStorage.clear();');
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

  it('should verify that items in cart can be removed', () => {
    element(by.id('remove_all')).click();

    let accordion = element(by.id('cart_showing'));

    element(by.id('dropdown_Bibimbap')).click();
    element(by.id('Bibimbap_Tofu')).click();

    expect(accordion.isPresent()).toBeTruthy();
    accordion.getText().then(function (text) {
      expect(text).toContain('1 i korgen (124 kr)');
    });

    element(by.id('remove_Bibimbap-Tofu')).click();
    let order_showing = element(by.id('show_hide'));
    expect(order_showing.isPresent()).toBeFalsy();
  });

  it('should verify that cart can be cleared', () => {
    let accordion = element(by.id('cart_showing'));

    element(by.id('dropdown_Bibimbap')).click();
    element(by.id('Bibimbap_Tofu')).click();
    element(by.id('dropdown_Hoe-deopbap')).click();
    element(by.id('Hoe-deopbap_Tofu')).click();

    expect(accordion.isPresent()).toBeTruthy();
    accordion.getText().then(function (text) {
      expect(text).toContain('2 i korgen (248 kr)');
    });

    element(by.id('remove_all')).click();
    let order_showing = element(by.id('show_hide'));
    expect(order_showing.isPresent()).toBeFalsy();
  });

  it('should show order info when when item is added and hides when clicked', () => {
    let accordion = element(by.id('cart_showing'));
    expect(accordion.isPresent()).toBeFalsy();

    element(by.id('dropdown_Bibimbap')).click();
    element(by.id('Bibimbap_Tofu')).click();

    expect(accordion.isPresent()).toBeTruthy();
    accordion.getText().then(function(text){expect(text).toContain('2 i korgen (248 kr)')});

    expect(element(by.linkText('Visa/göm beställningsdetaljer')).getTagName()).toBe('a');
    element(by.linkText('Visa/göm beställningsdetaljer')).click();
    let order_showing = element(by.id('show_hide'));
    expect(order_showing.isPresent()).toBeFalsy();
  });
});


