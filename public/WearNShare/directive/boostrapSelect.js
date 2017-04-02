angular.module('angular-bootstrap-select', [])
    .directive('selectpicker', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.selectpicker($parse(attrs.selectpicker)());

                var sVal = $('select[name=selValue] option:first').val();
                element.selectpicker('refresh');

                scope.$watch(attrs.ngModel, function (newVal, oldVal) {
                    if(newVal != oldVal && scope.model.mode == 'Rent'){
                        scope.model.alerts.push({msg: 'Please Search For Renters For New Size'});
                    }
                    scope.$parent[attrs.ngModel] = newVal;
                    scope.$evalAsync(function () {
                        if (!attrs.ngOptions || /track by/.test(attrs.ngOptions)) element.val(newVal);
                        //element.selectpicker('val','Small');
                        //element.selectpicker('val',[1,2,3]);
                        element.selectpicker('refresh');
                    });
                });

                scope.$on('$destroy', function () {
                    scope.$evalAsync(function () {
                        element.selectpicker('destroy');
                    });
                });
            }
        };
    }]);
