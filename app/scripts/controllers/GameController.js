angular.module('controllers')
    .controller('GameController', ['$scope', '$stateParams', 'ApiClient', 'GameStateService', function ($scope, $stateParams, ApiClient, GameStateService) {

        GameStateService.createGame().then(function (firstQuestion) {
            $scope.question = firstQuestion;
            $scope.stage = 1;
        })
        $scope.answers = [
            {title: 'Так', code: 0},
            {title: 'Ні', code: 1},
            {title: 'Можливо', code: 2},
            {title: 'Не знаю', code: 3}
        ]
        $scope.makeAnswer = function (answerCode) {
            GameStateService.makeAnswer(answerCode).then(function (state) {
                if (state.isReady == true && state.isFinish == true) {
                    $scope.finalMessage = 'Я переміг!';
                    $scope.showRetryDialog = true;
                } else if (state.isReady == false && state.isFinish == true) {
                    $scope.finalMessage = 'Я програв!';
                    $scope.userBook = {
                        book: '',
                        description: ''
                    }
                    $scope.submitBook = function() {
                        GameStateService.submitBook($scope.userBook.book, $scope.userBook.description).then(function(result) {
                            if (result) {
                               $scope.sended = true;
                            }
                        })
                    }
                } else if(state.isFinish == false && state.isReady == true) {
                    $scope.result = state.result;
                } else {
                    $scope.stage = state.stage;
                    $scope.question = state.question;
                }
            })
        }

    }]);