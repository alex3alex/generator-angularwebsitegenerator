/**
 * Home Controller Tests.
 */
'use strict';

describe('Controller: app.home.homeController', function () {

  // Define the Angular services used by this test suite.
  var $controller, $q, $rootScope;

  // Called before each test. Initialises the Angular services used by this test suite,
  // and generates the mock services/dependencies used by the tests.
  beforeEach(function () {

    // Specify the module of the functionality to test.
    module('app.home');

    // Initialises the Angular services used by this test suite.
    inject(function (_$controller_, _$q_, _$rootScope_) {
      $controller = _$controller_;
      $q = _$q_;
      $rootScope = _$rootScope_;
    });
  });

  describe('The controller ', function () {

    it('should be instantiated', function () {
      // Arrange.
      var mocks = getMocks();
      var controller = mocks.getControllerToTest();

      // Assert.
      expect(controller).toBeTruthy();
    });
  });

  // Creates the mock services/dependencies and defines their mock functions.
  function getMocks() {

    // Contains the mock services/dependencies used by the tests.
    var mocks = {
      mockHomeDataService: {},
      getControllerToTest: getControllerToTest
    };

    // Create mock services/dependencies and define their mock functions.
    mocks.mockHomeDataService = jasmine.createSpyObj('homeDataService', ['getStuff']);

    // Define default return values for the mock functions.
    var getStuffPromise = $q.when({
      something: 'whatever'
    });
    mocks.mockHomeDataService.getStuff.and.returnValue(getStuffPromise);

    /// Returns the controller to test, injected with the mocked services/dependencies.
    function getControllerToTest() {

      var controller = $controller('app.home.homeController', {
        homeDataService: mocks.mockHomeDataService
      });

      return controller;
    }

    return mocks;
  }
});
