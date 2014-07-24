;(function(){
    'use strict';
    /**
     * The Current Games Scores For Each User
     */
    function Scores(){
        this.scores = [];
    }

    Scores.prototype.get = function() {
        return this.scores;
    };
    
    Scores.prototype.setScores = function(scores){
        this.scores.length = 0;
        v.merge(this.scores, scores || []);
    }
    
    Scores.prototype.addScore = function(guess, score){
        var userScore = v.filter(this.scores, function(value){
            return !!( value.user.id == score.user.id )
        }).pop()
        // this should update the object in the array by ref
        // if exists and lastScoredRound is not game.round
        if (userScore != null && guess.round > userScore.round) {
            userScore.round = guess.round;
            userScore.totalScore += guess.score;
        } else {
            this.scores.push(guess)
        }
    }

    Scores.prototype.toScore = function(user, guess){
        var userScore = {
            user: {
                id: user.get('id'),
                name: user.get('name'),
                email: user.get('email')
            },
            round: guess.round,
            totalScore: guess.score
        };
        return userScore;
    }

    angular.module('Models')
        .service('Scores', Scores)
        ;
}());