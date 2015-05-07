/**
 * This is the <%= yeoman.choices.feature %> data service.
 * @memberOf <%= yeoman.choices.Feature %> Module
 * @namespace <%= yeoman.choices.Feature %> Data Service
 */
(function () {
  'use strict';

  // Register the service.
  angular.module('<%= yeoman.choices.module %>').service('<%= yeoman.choices.module %>.<%= yeoman.choices.feature %>DataService', <%= yeoman.choices.Feature %>DataService);

  // Inject the dependencies.
  <%= yeoman.choices.Feature %>DataService.$inject = ['$q', '$http', 'app.core.service'];

  /**
   * @name <%= yeoman.choices.Feature %>DataService
   * @desc Create the data service.
   * @param $q
   * @param $http
   * @param coreService
   * @memberOf <%= yeoman.choices.Feature %> Module.<%= yeoman.choices.Feature %> Data Service
   */
  function <%= yeoman.choices.Feature %>DataService($q, $http, coreService) {

    /**
     * @name <%= yeoman.choices.Feature %>DataService.getStuff
     * @desc Call the API to get stuff.
     * @memberOf <%= yeoman.choices.Feature %> Module.<%= yeoman.choices.Feature %> Data Service
     * @returns object An object with stuff.
     */
    this.getStuff = function () {
      // Create the future.
      var deferred = $q.defer();
      // Usually you would get the data here via AJAX call to an API.
      $http.get(coreService.getApiBaseUrl() + '/api/<%= yeoman.choices.feature %>/stuff').
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
