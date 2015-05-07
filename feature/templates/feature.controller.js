/**
 * This is the <%= yeoman.choices.feature %> controller.
 * @memberOf <%= yeoman.choices.Feature %> Module
 * @namespace <%= yeoman.choices.Feature %> Controller
 */
(function () {
  'use strict';

  // Register the controller.
  angular.module('<%= yeoman.choices.module %>').controller('<%= yeoman.choices.module %>.<%= yeoman.choices.feature %>Controller', <%= yeoman.choices.Feature %>Controller);

  // Inject the dependencies.
  <%= yeoman.choices.Feature %>Controller.$inject = ['<%= yeoman.choices.module %>.<%= yeoman.choices.feature %>DataService'];

  /**
   * @name <%= yeoman.choices.feature %>Controller
   * @desc Create the controller.
   * @param <%= yeoman.choices.feature %>DataService
   * @memberOf <%= yeoman.choices.Feature %> Module.<%= yeoman.choices.Feature %> Controller
   */
  function <%= yeoman.choices.Feature %>Controller(<%= yeoman.choices.feature %>DataService) {

    // Assign this controller as the view-model.
    // It will be accessible as '<%= yeoman.choices.feature %>Controller' within the HTML template.
    var vm = this;

    // Register the view model's properties.
    vm.stuff = {};
    vm.anything = 'Very well, thank you.';

    // Load stuff.
    <%= yeoman.choices.feature %>DataService.getStuff().then(
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
