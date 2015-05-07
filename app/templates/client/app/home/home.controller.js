/**
 * This is the home controller.
 * @memberOf Home Module
 * @namespace Home Controller
 */
(function () {
  'use strict';

  // Register the controller.
  angular.module('app.home').controller('app.home.homeController', HomeController);

  // Inject the dependencies.
  HomeController.$inject = ['app.home.homeDataService'];

  /**
   * @name homeController
   * @desc Create the controller.
   * @param homeDataService
   * @memberOf Home Module.Home Controller
   */
  function HomeController(homeDataService) {

    // Assign this controller as the view-model.
    // It will be accessible as 'homeController' within the HTML template.
    var vm = this;

    // Register the view model's properties.
    vm.stuff = {};
    vm.anything = 'Very well, thank you.';

    // Load stuff.
    homeDataService.getStuff().then(
      // Success.
      function (data) {
        vm.stuff = data;
      },
      // Failure.
      function (/* status */) {
        // Deal with it!
      });
  }

})();
