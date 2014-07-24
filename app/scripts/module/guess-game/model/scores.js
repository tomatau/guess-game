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
    
    Scores.prototype.setScores = function(guesss){
        this.scores.length = 0;
        guesss.forEach(this.addScore.bind(this))
    }
    
    Scores.prototype.addScore = function(score){
        var userScore = this.scores.filter(function(value){
            return !!( value.user && ( value.user.id == score.user.id ) )
        });

        if ( userScore == null || userScore.length == 0 )
            return this.scores.push(score);
        else
            userScore = userScore.pop()

        // this should update the object in the array by ref
        // if exists and lastScoredRound is not game.round
        if ( userScore != null ) {
            if ( score.round > userScore.round ) {
                // add a new round for the user
                this.scores.push(score);
            } else if ( score.round == userScore.round && score.score > userScore.score ) {
                // update current round
                userScore.score = score.score;
                userScore.guess = score.guess;
            }
        }
    }

    Scores.prototype.toScore = function(user, guess){
        var userScore = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            guess: guess.guess,
            round: guess.round,
            score: guess.score
        };
        return userScore;
    }

    angular.module('Models')
        .service('Scores', Scores)
        ;
}());