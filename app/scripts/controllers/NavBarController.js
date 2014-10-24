angular.module('controllers')
    .controller('NavBarController',['$scope', '$stateParams',function($scope, $stateParams) {
        $scope.$on('$stateChangeSuccess', function() {
            if($stateParams.stage) {
                $scope.stage  = $stateParams.stage;
            }
        });
    }]);