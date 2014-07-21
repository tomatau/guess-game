
// define core modules
angular.module('Models', [ ]);
// root services such as logging, gateways, etc...
angular.module('FireGateway', [ 'firebase' ]);

// should move the gateway into someplace else? currently it's required by modules

// main module used as app
angular.module('GuessGameApp', [ 'Auth', 'GuessGame', 'ngRoute' ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/error', {
                template: "<p>Error</p>"
            })
            .otherwise({
                redirectTo: '/'
            })
    })
    .run(function () {
        
    });

// other services plug into the root ones
// 
// routing plugs into everything else at the end 

// TODO:
// 
// chat outside of rounds, can just start a new round anyway
// 
// game for each round
// GAME: gameId, status, startedTime, finishedTime
// 
// user-list:
//      user - id, avatar
//          - score
// 
// chat (guessing):
//      user - id, avatar
//          guess - word id, score
// 
// clue:
//      word - clues
// 
// history:
//      words - 
//      
// 

/*
1. Google Auth / (Email Auth)
2. User List
3. Chat and Round not started (Waiting room)
    3.1. Basic Routing
    2. 
4. send messages
    5. clear chat
6. start gane / round 1
    6.0. number of rounds
    6.1. add users
7. get word with clues
8. display clue
9. post guess
    9.1. round countdown
10. update score
11. finish round and game
12. display winner
13. clear everything except result.. no


 */