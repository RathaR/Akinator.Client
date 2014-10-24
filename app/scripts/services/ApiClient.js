angular.module('services')
    .service('ApiClient',['$http', function($http) {
        return {
            startSession: function() {
                return $http.get('/api/game/start').success(function() {

                }).then(function(result) {
                    return result.data;
                });
            },
            getQuestion: function(sessionId, answer) {
                return $http.post('/api/game/next', {
                    sessionId: sessionId,
                    answer: answer
                }).success(function() {

                }).then(function(result) {
                    return result.data;
                })
            },
            submitBook: function(book, description) {
                return $http.post('/api/game/win', {
                    book: book,
                    description: description
                }).success(function(){

                }).then(function(result) {
                    return result.data;
                })
            }
        }
    }]);