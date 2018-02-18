(function() {
    'use strict';
    var app = angular.module('app', ['ngAnimate', 'ngAria', 'ngAria', 'ngCookies', 'ngMessages', 'ngSanitize', 'ngTouch', 'ui.bootstrap']);
	
	angular.module("uib/template/modal/window.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("uib/template/modal/window.html",
		"  <button type=\"button\" class=\"close pull-right uib-close\" ng-click=\"close($event)\"><i aria-hidden=\"true\" class=\"ico-closeIcon uib-close\" ng-click=\"close($event)\"></i></button><div class=\"modal-dialog {{size ? 'modal-' + size : ''}}\"><div class=\"modal-content\" uib-modal-transclude></div></div>\n" +
		"");
	}]);
	
	app.config(['$provide', Decorate]);
		function Decorate($provide) {
		  $provide.decorator('$locale', function ($delegate) {
			var value = $delegate.DATETIME_FORMATS;

			value.SHORTDAY = [
				"S",
				"M",
				"T",
				"W",
				"T",
				"F",
				"S"
			];

			return $delegate;
		  });
};
	
    app.controller('generalController', ['$scope', function($scope) {

    }])



    .controller('ModalDemoCtrl', ['$scope', '$uibModal', '$log', function($scope, $uibModal, $log) {

        $scope.openOneButton = function() {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myOneModalContent.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    items: function() {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

       

    }])
	
	.controller('ErrorCtrl', ['$scope', function($scope) {

		//console.log("Controller - ErrorCtrl");
		document.body.style.background = "white";
      
    }])
	
	.controller('Countervalue', ['$scope', function($scope) {
		$scope.counter = 0;
		$scope.count = function () {
			if($scope.counter<3){
				$scope.counter =$scope.counter+1;
			}
		}
		$scope.listSize=3;
		$scope.showmore =function() {
			if($scope.listSize<9){
				$scope.listSize+=3;
			}
			console.log($scope.listSize);
		}
    }])
	
	.controller('pagination', ['$scope', function($scope) {
		
		$scope.data = [
		{'name':'item1'},
		{'name':'item2'},
		{'name':'item3'},
		{'name':'item4'},
		{'name':'item5'},
		{'name':'item6'},
		{'name':'item7'},
		{'name':'item8'},
		{'name':'item9'},
		{'name':'item10'}
		]
		
		$scope.first = function(currentpage,nofrecord) {
			
			$scope.currentpage=currentpage;
			$scope.nofrecord=nofrecord;
			$scope.datalength=$scope.data.length;
			$scope.pagenolength=Math.ceil($scope.datalength/$scope.nofrecord);
			console.log($scope.pagenolength)
		};
		
		
    }])

    .controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {

        $scope.ok = function() {
            $uibModalInstance.close();
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }])
	
	.controller('radioController', ['$scope', function($scope) {
		
		$scope.isSelected1 = false;
		$scope.isSelected2 = false;
		$scope.isSelected3 = false;
		$scope.isSelected4 = false;
		
		$scope.setValue= function(event)
		{
			
			if(event.target.value=="option1")
			{
				$scope.isSelected1 = true;
			}
			else{
				$scope.isSelected1 = false;
			}
			
			
			if(event.target.value=="option2")
			{
				$scope.isSelected2 = true;
			}
			else{
				$scope.isSelected2 = false;
			}
			
			if(event.target.value=="option3")
			{
				$scope.isSelected3 = true;
			}
			else{
				$scope.isSelected3 = false;
			}
			
			if(event.target.value=="option4")
			{
				$scope.isSelected4 = true;
			}
			else{
				$scope.isSelected4 = false;
			}
		}
		

    }])
	
	app.controller('DatepickerPopupDemoCtrl', function ($scope) {
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
		showWeeks: false
	  };

	  $scope.dateOptions = {
		customClass: getDayClass,
		formatYear: 'yyyy',
		maxDate: new Date(2020, 5, 22),
		minDate: new Date(),
		startingDay: 7,
		showWeeks: false
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
		  
		 $scope.currentmode = mode;
		  
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
	});
	
	app.controller('TimepickerDemoCtrl', function ($scope, $log) {
	  $scope.mytime = new Date();

	  $scope.hstep = 1;
	  $scope.mstep = 15;

	  $scope.options = {
		hstep: [1, 2, 3],
		mstep: [1, 5, 10, 15, 25, 30]
	  };

	  $scope.ismeridian = true;
	  $scope.toggleMode = function() {
		$scope.ismeridian = ! $scope.ismeridian;
	  };

	  $scope.update = function() {
		var d = new Date();
		d.setHours( 14 );
		d.setMinutes( 0 );
		$scope.mytime = d;
	  };

	  $scope.changed = function () {
		$log.log('Time changed to: ' + $scope.mytime);
	  };

	  $scope.clear = function() {
		$scope.mytime = null;
	  };
	});

})();
