// define core modules
angular.module('Models', [ ]);
// root services such as logging, gateways, etc...

// main module used as app
angular.module('GuessGame', [ 'Auth' ])

// other services plug into these root ones
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
1. Google Auth / Email Auth
2. Chat and Round not started

 */