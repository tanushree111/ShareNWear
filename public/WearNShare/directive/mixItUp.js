var app = angular.module('app', []);

app.directive('mixitup',function(){
    var linker = function(scope,element,attrs) {
        scope.$watch('entities', function(){

            console.log('reload');
            element.mixItUp();
            // how to tell mixitup to reload the data
        });

        console.log('starting')


    };

    return {
        restrict:'A',
        link: linker,
        scope:{entities:'='}
    }
})

/*
app.controller('DrawingsController',

    function DrawingsController($scope) {
        $scope.categories = ['Soft', 'Elements'];

        $scope.drawings = [{
            name: 'Water',
            category: 'Elements',
            value: '2'
        }, {
            name: 'Fire',
            category: 'Elements',
            value: '1'
        }, {
            name: 'Air',
            category: 'Elements',
            value: '4'
        }, {
            name: 'Coton',
            category: 'Soft',
            value: '3'
        }, {
            name: 'Whool',
            category: 'Soft',
            value: '5'
        }];

        $scope.add = function(){
            $scope.drawings.push({name:'new soft',value:$scope.drawings.length,category:'Soft'})

            console.dir($scope.drawings);

        };
    });*/
