angular.module('GuessGame')
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('xmlHttpInterceptor');
    })
    .factory('nameRequestRound', function (
        $http,
        Round,
        xmlFilter
    ) {
        'use strict';
        var randomName = null,
            clues = [];

        function getRandomName(){
            return $http({ url: "http://www.behindthename.com/api/random.php",
                    params: {
                        key: "th386401",
                        number: 1,
                        usage: "eng",
                    }
                })
                .success(function(data, code) {
                    var xml = xmlFilter(data);
                    randomName = xml.find('name')[0].innerHTML;
                })
        }

        function getClues(){
            return $http({ url: "http://www.behindthename.com/api/lookup.php",
                    params: { key: "th386401", name: randomName } })
                .success(function(data, code) {
                    var xml = xmlFilter(data);
                    clues = {
                        firstLetter: randomName.charAt(0),
                        lastLetter: randomName.charAt(randomName.length - 1),
                        numberOfLetters: randomName.length,
                        gender: (xml.find('gender')[0].innerHTML == "f") ? "female" : "male",
                        usage: xml.find('usage_full')[0].innerHTML
                    };
                });
        }

        return {
            getRoundPromise: function(roundNumber){
                return getRandomName().then(getClues)
                    .then(function(){
                        Round.setRound(randomName, clues, roundNumber)
                        return Round;
                    });
            }
        };
    });