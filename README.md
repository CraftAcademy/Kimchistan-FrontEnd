# KimchistanFrontEnd 
## [Visit the app Kimchistan](https://kimchistan-dev.surge.sh/)

[![Coverage Status](https://coveralls.io/repos/github/CraftAcademy/Kimchistan-FrontEnd/badge.svg)](https://coveralls.io/github/CraftAcademy/Kimchistan-FrontEnd)

This is the final project for the August 2017 cohort. 

We were approched by a client who wanted a website for a restaurant, where customers can order food online and pick it up at the restaurant after 30 minutes.

The project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## First release
Visit the app [Kimchistan](https://kimchistan-dev.surge.sh/).

In the first release we put focus on the basic requirement for a functional website, while still aiming to fit the clients conditions regarding the styling. 

A customer can visit the website and get restaurant information, choose a dish with a specific ingredient, and pay for the order. After an order is placed and paid for, the kitchen receives an email with pick up and order details. 

Other features:
* Displaying a map of the restaurant location
* Showing restaurant info in the footer
* Showing order instructions over the header background picture
* The order details show up in a sticky collapsable header after a product gets added to the cart
* In the cart header a user can remove from cart, clear cart, and pay with Stripe.
* Allowing a user to click a dish picture to open a modal with a larger picture and dish description
* Daily dishes rotates during Monday-Friday
* Unavailable dishes and ingredients are disabled and can't be added to cart
* The cart information is stored in localstorage so the page can get refreshed
* Localstorage gets cleared at midnight

## Deployment
We automatically deploy this app with [Heroku](https://www.heroku.com/) and [Surge](https://surge.sh/) through [Github](https://github.com/) and [Semaphore](https://semaphoreci.com/).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Authors
* [BasilMawejje](https://github.com/BasilMawejje)
* [Magnus-thor](https://github.com/magnus-thor)
* [NurlanEmir](https://github.com/nurlanemir)
* [Olofvi](https://github.com/olofvi)
* [Sajaas](https://github.com/Sajaas)

## License
MIT license

## Acknowledgments
The entire project is comprised of open source code so a huge **THANKS** to the open source community.
Built with help from the coaches and some cool gems.
* [Tochman](https://github.com/tochman)
* [Diraoulo](https://github.com/diraulo)
