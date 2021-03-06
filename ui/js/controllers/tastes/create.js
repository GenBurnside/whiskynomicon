define(['app'], function (app) {
  app.controller('TasteCreateController', ['$rootScope', '$scope', '$cookieStore', '$location', '$routeParams', '$filter',
    'errorService', 'brandService', 'variantService', 'tasteService',
    function($rootScope, $scope, $cookieStore, $location, $routeParams, $filter,
      errorService, brandService, variantService, tasteService) {
      $rootScope.user = $cookieStore.get('user');

      if ($rootScope.user == null) {
        $location.path('/');
        return;
      }

      $scope.brands = [];
      $scope.variants = [];

      var date = new Date();
      $scope.date = {};
      $scope.date.date = date;

      date.setHours(12);
      date.setMinutes(0);
      date.setSeconds(0);
      $scope.date.time = date;

      var today = new Date();
      $scope.maxDate = today.setDate(today.getDate() + 1);

      brandService.getList().
        success(function(data) {
          $scope.brands = data;
        }).
        error(function(error) {
          $scope.error = errorService.apiError;
          console.log(error);
        });

      $scope.getVariants = function(brandId) {
        var brand = $filter('filter')($scope.brands, { id: brandId }, false)
        if (brand.length > 0) {
          $scope.brand = brand[0];
        }

        variantService.getList(brandId).
          success(function(data) {
            if (data.length > 0) {
              $scope.variant = data[0];
              $scope.variantId = data[0].id;
            }

            $scope.variants = data;
          }).
          error(function(error) {
            $scope.error = errorService.apiError;
            console.log(error);
          });
      };

      $scope.loadDetails = function(variantId) {
        var variant = $filter('filter')($scope.variants, { id: variantId }, false)
        if (variant.length > 0) {
          $scope.variant = variant[0];
        }
      };
    }]);
});
