angular.module('services')
    .service('GameStateService',['ApiClient','$state', function(ApiClient, $state) {
        var gameState = {
            sessionId : '',
            stage: 0,
            isFinish : false,
            isReady: false,
            question: '',
            result: {
                book: '',
                description: ''
            }
        }
        return {
            getState: function() {
                return gameState;
            },
            createGame: function() {
                return ApiClient.startSession().then(function(result) {
                    gameState.sessionId = result.sessionId;
                    gameState.stage = 1;
                    return result.firstQuestion;
                });
            },
            makeAnswer: function(answerCode) {
                return ApiClient.getQuestion(gameState.sessionId, answerCode).then(function(response) {
                    debugger;
                    if(response.isFinish === true ) {
                        $state.go('finish');
                    } else if(response.isReady === true) {
                        gameState.result = response.result;
                        $state.go('ready');
                    } else {
                        gameState.stage ++;
                        gameState.question = response.question;
                        $state.go('stage',{stage: gameState.stage});
                    }
                    gameState.isFinish = response.isFinish;
                    gameState.isReady = response.isReady;
                    return gameState;
                });
            },
            submitBook: function(book, description) {
                return ApiClient.submitBook(book, description).then(function(response) {
                    if(response.result) {
                        return true;
                    }
                })
            }

        }
    }]);