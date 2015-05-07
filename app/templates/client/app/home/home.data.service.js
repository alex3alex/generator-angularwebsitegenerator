/**
 * This is the home data service.
 * @memberOf Home Module
 * @namespace Home Data Service
 */
(function () {
  'use strict';

  // Register the service.
  angular.module('app.home').service('app.home.homeDataService', HomeDataService);

  // Inject the dependencies.
  HomeDataService.$inject = ['$q', '$http', 'app.core.service'];

  /**
   * @name HomeDataService
   * @desc Create the data service.
   * @param $q
   * @param $http
   * @param coreService
   * @memberOf Home Module.Home Data Service
   */
  function HomeDataService($q, $http, coreService) {

    /**
     * @name HomeDataService.getStuff
     * @desc Call the API to get stuff.
     * @memberOf Home Module.Home Data Service
     * @returns object An object with stuff.
     */
    this.getStuff = function () {
      // Create the future.
      var deferred = $q.defer();
      // Usually you would get the data here via AJAX call to an API.
      $http.get(coreService.getApiBaseUrl() + '/api/home/stuff').
        success(function (data/*, status, headers, config*/) {
          // this callback will be called asynchronously when the response is available
          deferred.resolve(data);
        }).
        error(function (data, status/*, headers, config*/) {
          // called asynchronously if an error occurs or server returns response with an error status.
          deferred.reject(status);
        }
      );
      // Return the promise.
      return deferred.promise;
    };
  }

})();
