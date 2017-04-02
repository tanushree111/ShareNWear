(function () {
    angular
        .module("shareDrobe")
        .controller("ProductListController", ProductListController);


    function ProductListController($scope,$location) {
        $(document).ready(function() {
            $('#list').click(function(event){event.preventDefault();$('#products .item').addClass('list-group-item');});
            $('#grid').click(function(event){event.preventDefault();$('#products .item').removeClass('list-group-item');$('#products .item').addClass('grid-group-item');});
        });

        var vm = this;
        var products = [{title: "card title1", cardText: "card Text 1", cardText2: "card Text 2"},
            {title: "card title2", cardText: "card Text 1", cardText2: "card Text 2"},
            {title: "card title3", cardText: "card Text 1", cardText2: "card Text 2"},
            {title: "card title3", cardText: "card Text 1", cardText2: "card Text 2"},
            {title: "card title3", cardText: "card Text 1", cardText2: "card Text 2"},
            {title: "card title3", cardText: "card Text 1", cardText2: "card Text 2"},
            {title: "card title3", cardText: "card Text 1", cardText2: "card Text 2"},
            {title: "card title3", cardText: "card Text 1", cardText2: "card Text 2"}]
        vm.products = products;

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
        },
            {
                name: 'Whool',
                category: 'Soft',
                value: '6'
            },
            {
                name: 'Whool',
                category: 'Soft',
                value: '7'
            }];

        $scope.add = function(){
            $scope.drawings.push({name:'new soft',value:$scope.drawings.length,category:'Soft'})

            console.dir($scope.drawings);

        };

        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.dt = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.toggleMin = function() {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }

    }
})();
