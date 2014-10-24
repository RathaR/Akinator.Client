angular.module('app')
    .run(['$httpBackend', function ($httpBackend) {
        $httpBackend.whenGET(/views\/.*/).passThrough();
        var questions = [
            'Ця книга про коней?',
            'В цій книзі більше 100 сторінок?',
            'Ця книга видавалась на українській мові?',
            'Це українські народні казки?',
            'В цій книзі є інопланетяни?',
            'Ця книга ніколи не видавалась?',
        ];
        var sessionId = 0;
        $httpBackend.whenGET('/api/game/start').respond({
            sessionId: sessionId,
            firstQuestion: questions[Math.floor(Math.random() * 4)]
        });
        $httpBackend.whenPOST('/api/game/next').respond(function (method, url, data, headers) {
            //answers { 0 - yes, 1 - no, 2 - maybe, 3 - don't know
            data = JSON.parse(data);
            if (data.answer == 0) {
                return [
                    200,
                    JSON.stringify({
                        isFinish: false,
                        isReady: true,
                        result: {
                            book: 'Буквар',
                            description: 'Чудова книжка для дітей'
                        }
                    }),
                    {}]
            } else if(data.answer == 2) {

            } else if(data.answer == 4 ) {
                 return [
                     200,
                     JSON.stringify({
                         isFinish: true,
                         isReady: true
                     }),
                     {}]
            } else if(data.answer == 5 ) {
                return [
                    200,
                    JSON.stringify({
                        isFinish: true,
                        isReady: false,
                        question: questions[Math.floor(Math.random() * 4)]
                    }),
                    {}]
            } else {
                return [
                    200,
                    JSON.stringify({
                        isFinish: false,
                        isReady: false,
                        question: questions[Math.floor(Math.random() * 4)]
                    }),
                    {}]
            }

        });
    }]);