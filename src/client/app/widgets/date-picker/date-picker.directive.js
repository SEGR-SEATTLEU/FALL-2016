(function() {
  'use strict';

  angular
    .module('wta.widgets')
    .directive('datePicker', function () {
      return {
          require: 'ngModel',
          link: function (scope, element, attr, ngModel) {
              $(element).datetimepicker({
                  format: 'MM/DD/YYYY',
                  parseInputDate: function (data) {
                      if (data instanceof Date) {
                          return moment(data);
                      } else {
                          return moment(new Date(data));
                      }
                  },
                  minDate: new Date()
              });

              $(element).on("dp.change", function (e) {
                  ngModel.$viewValue = e.date;
                  ngModel.$commitViewValue();
              });
          }
      };
  });

  // DatePicker Input NgModel->DatePicker
  angular
    .module('wta.widgets')
    .directive('datePickerInput', function() {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {
            // Trigger the Input Change Event, so the Datepicker gets refreshed
            scope.$watch(attr.ngModel, function (value) {
                if (value) {
                    element.trigger("change");
                }
            });
        }
    };
  });

})();