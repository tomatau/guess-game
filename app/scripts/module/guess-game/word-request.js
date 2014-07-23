angular.module('GuessGame')
    // .factory('usersOnlineRef', function(GameRef){
    //     return GameRef.child('usersOnline');
    // })
    // not happy with this service
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('xmlHttpInterceptor');
    })
    .factory('wordRequest', function (
        $http,
        Word,
        xmlFilter
    ) {
        'use strict';
        var randomName = null,
            clues = [];

        function getRandomName(){
            console.log('grn')
            return $http({
                    url: "http://www.behindthename.com/api/random.php",
                    params: {
                        key: "th386401",
                        number: 1,
                        usage: "eng",
                        // usage_iri: 1,
                        // usage_sco: 1,
                        // usage_spa: 1,
                        // usage_wel: 1,
                        // usage_bibl: 1,
                        // usage_hist: 1
                    }
                })
                .success(function(data, code) {
                    console.log('grn success')
                    var xml = xmlFilter(data);
                    randomName = xml.find('name')[0].innerHTML;
                })
            ;
        }

        function getClues(){
            console.log('clu')
            return $http({
                    url: "http://www.behindthename.com/api/lookup.php",
                    params: {
                        key: "th386401",
                        name: randomName
                    }
                })
                .success(function(data, code) {
                    console.log('clu succ')
                    var xml = xmlFilter(data);
                    clues = {
                        firstLetter: randomName.charAt(0),
                        numberOfLetters: randomName.length,
                        gender: (xml.find('gender')[0].innerHTML == "f") ? "female" : "male",
                        usage: xml.find('usage_full')[0].innerHTML
                    };
                })
            ;
        }

        function resolveWord(){
            console.log('resolve word', randomName, clues)
            Word.setWord(randomName, clues)
            return Word;
        }

        return {
            getWordPromise: function(){
                return getRandomName()
                    .then(getClues)
                    .then(resolveWord)
            }
        };
    });