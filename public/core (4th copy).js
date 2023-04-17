 angular.module('scotchApp', ['ngRoute','ngFileUpload'])

  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/', {
         templateUrl: 'main.html',
         controller: 'MainController',
         access: {restricted: true},
         data: {activeTab: 'main'}
        })
        .when('/main', {
         templateUrl: 'main.html',
         controller: 'MainController',
         access: {restricted: true},
         data: {activeTab: 'main'}
        })
        .when('/account', {
         templateUrl: 'account.html',
         controller: 'AccountController',
         access: {restricted: true},
         data: {activeTab: 'account'}
        })
         .when('/mobile', {
         templateUrl: 'mobile.html',
         controller: 'MobileController',
         access: {restricted: true},
         data: {activeTab: 'mobile'}
        })
        .when('/history', {
         templateUrl: 'history.html',
         controller: 'HistoryController',
         access: {restricted: true},
         data: {activeTab: 'history'}
        })
        .when('/gpio', {
         templateUrl: 'gpio.html',
         controller: 'GPIOController',
         access: {restricted: true},
         data: {activeTab: 'gpio'}
        })
        .when('/cash', {
         templateUrl: 'cash.html',
         controller: 'CashController',
         access: {restricted: true},
         data: {activeTab: 'cash'}
        })
        .when('/resources', {
         templateUrl: 'resources.html',
         controller: 'ResourceController',
         access: {restricted: true},
         data: {activeTab: 'resources'}
        })
        .when('/hardware', {
         templateUrl: 'hardwares.html',
         controller: 'HardwareController',
         access: {restricted: true},
         data: {activeTab: 'hardware'}
        })
         .when('/doctor', {
         templateUrl: 'doctor.html',
         controller: 'DoctorController',
         access: {restricted: true},
         data: {activeTab: 'doctor'}
        })
         .when('/patient', {
         templateUrl: 'patient.html',
         controller: 'PatientController',
         access: {restricted: true},
         data: {activeTab: 'patient'}
        })
        .when('/service', {
         templateUrl: 'service.html',
         controller: 'ServiceController',
         access: {restricted: true},
         data: {activeTab: 'service'}
        })
        .when('/workorder', {
         templateUrl: 'workorder.html',
         controller: 'WorkOrderController',
         access: {restricted: true},
         data: {activeTab: 'workorder'}
        })
        .when('/practice', {
         templateUrl: 'practice.html',
         controller: 'PracticeController',
         access: {restricted: true},
         data: {activeTab: 'practice'}
        })
        .when('/register', {
         templateUrl: 'register.html',
         controller: 'RegisterController',
         access: {restricted: false},
         data: {activeTab: 'register'}
        })
        .when('/login', {
         templateUrl: 'login.html',
         controller: 'LoginController',
         access: {restricted: false},
         data: {activeTab: 'login'}
        })
        .when('/logout', {
         templateUrl: 'logout.html',
         controller: 'LogoutController',
         access: {restricted: true},
         data: {activeTab: 'logout'}
        })
        .when('/admin', {
         templateUrl: 'admin.html',
         controller: 'AdminController',
         access: {restricted: true},
         data: {activeTab: 'admin'}
        })
        .when('/upload', {
         templateUrl: 'upload.html',
         controller: 'UploadController',
         access: {restricted: true},
         data: {activeTab: 'upload'}
        })
        .otherwise({
          redirectTo: '/'
        });
    }])
    .run(run);


	
	function run($rootScope,$location, $route, AuthService) {
		
		$rootScope.$on('$routeChangeStart', function(event, next, current) {
			console.log(next);
			AuthService.getUserStatus()
			.then(function() {
				if ( typeof next.data === 'undefined' )
				{
					$rootScope.activeTab  = 'login';
					next.access = 'restricted';
				} else {
					$rootScope.activeTab = next.data.activeTab;
				}
				if(next.access.restricted && AuthService.isLoggedIn() === false) {
					$location.path('/login');	
					$route.reload();
				} else {
					if (AuthService.isLoggedIn() === false) {
						$rootScope.loggedin_user = '';
					} else {
						AuthService.getUserName().then(function(data){
							console.log("Controller - " + JSON.stringify(data, null, 2) + " - ");
							$rootScope.loggedin_user = data.user.fname;
							console.log("Name is: " + data.user.fname);
							
							$rootScope.isMobile = JSON.stringify(data.md, null, 2)
							console.log($rootScope.isMobile);
							if ($rootScope.isMobile < 0 ) {
									$location.path('/mobile');	
								//	$route.reload();

							}
						});
					}
				}
			});
		});
	
	};
	
	
		$.fn.appointmentPicker = function(options) {
			this.appointmentPicker = new AppointmentPicker(this[0], options);
			return this;
		};	
		
		
		

	$(function($scope) {
	
			console.log('In $ function:' + $scope);
	/*		$.get('/api/token',function(token){
				window.jwtToken = token;
				console.log('Token:' + token);
				angular.bootstrap(document, ['app']);
			});
	*/
	
	});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Cash Controller ///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	
 
   angular.module('scotchApp')
	.controller('CashController',['$scope','$http', function($scope, $http) {
	
			$scope.formData = {};	
			var testDate = '';
			var calObj = '';
			$scope.pt_appt_status = '';
			$scope.no_bookings = true;
			$scope.pt_appt_status = '';
			$scope.statusSelect = '';

			
			$('#datepicker').datepicker({clearBtn:true,format:'yyyy-mm-dd'},'show');
			
			
			$('#datepicker').on('changeDate', function() {
			//	console.log('Changing Date: ' + $scope.practice_return);
				calObj = $('#datepicker').datepicker('getFormattedDate');
			//	console.log('Calendar Object: ' + calObj);
	
					
					$scope.findPatientsPerPractice($scope.practice_return);






			});
			
			$scope.getRealIndex = function(patient){
				var ptIndex = $scope.patients.indexOf(patient);
				console.log("Cash Real Index for patient: :" + ptIndex);
				return ptIndex
			};  
			
			$scope.getSpecificDate= function(m) {
		
						var dateObj = new Date(m);
						var sYear = dateObj.getUTCFullYear();
						var sMonth = dateObj.getUTCMonth();
						var sDay = '';
						var sDay = dateObj.getDate() + '';
						var the_result;

						if (sDay.length === 1) {
							sDay = '0' + sDay;
						}
						if ($scope.practice_return != 'All') {
							$http.get('/api/specificdates/' + $scope.practice_return + '/' + sYear + '/' + sMonth + '/' + sDay)
								.success(function(data) {
									$scope.patients= data;
									$scope.originalPatient= data;
									console.log(data.length);
									if (data.length == 0) {
										$scope.no_bookings = true
									} else {
										$scope.no_bookings = false
									}

							})
								.error(function(data) {
									console.log('Error: ' + data);
							});
						} else {
							$http.get('/api/main/' + sYear + '/' + sMonth + '/' + sDay)
								.success(function(data) {
									$scope.patients= data;
									$scope.originalPatient= data;
									console.log(data.length);
									if (data.length == 0) {
										$scope.no_bookings = true
									} else {
										$scope.no_bookings = false
									}

							})
								.error(function(data) {
									console.log('Error: ' + data);
							});							
							
							
						}
			}
		

			


    
			$scope.thecolor = "green"
			$scope.bodyText = "";
			$scope.showModal1 = false;
			$scope.showModal2 = false;
			$scope.practice_return = "All";
			$scope.ptID = '';
			$scope.ptApptDate = '';

			
			$scope.hide = function(m){
				if(m === 1){
					$scope.showModal1 = false;
				}else{
					$scope.showModal2 = false;
				}
			}


			

			
			$scope.modalOneShown = function(){
				console.log('modal one shown');
			}
			
			$scope.modalOneHide = function(){
				console.log('modal one hidden');
			} 
	 
	 
	 	// when landing on the page, get all resources and show them
    $http.get('/api/maincash')
        .success(function(data) {
		    $scope.patients = data;
            $scope.originalPatient = data;
			console.log('Original Main');
			console.log(data);
			if (data.length == 0) {
				$scope.no_bookings = true
			} else {
				$scope.no_bookings = false
			}


            
        })
        .error(function(data) {
            console.log('Error: ' + data);
    });
    
	 	
   
    	 	// when landing on the page, get all resources and show them
    $http.get('/api/practice')
        .success(function(data) {
            $scope.practices = data;
            $scope.originalPractice = data;
  //          console.log(data);
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
    });
       
        // delete a resource after checking it
    $scope.deleteResource = function(id) {
		alert(id);
        $http.delete('/api/resources/' + id)
            .success(function(data) {
                $scope.resources = data;
                 
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
            // delete a resource after checking it
    $scope.deleteAppt = function(id) {
		alert('Deleting ' + id);
        $http.delete('/api/appt/' + id)
            .success(function(data) {
                $scope.patients = data;
				$scope.originalPatient = data;                 
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
	
    };
    

          // delete a resource after checking it
    $scope.findPatientsPerPractice = function(practice) {

		$scope.practice_return = practice;
		console.log('Calendar: *' + calObj +'*');
	
	
		if (practice = 'All' && calObj == '') {
			$http.get('/api/main')
				.success(function(data) {

					$scope.patients = data;
					$scope.originalPatient = data;
					console.log(data);
					
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
			
		};
		if(practice = 'All' && calObj != '') {
			$scope.getSpecificDate(calObj);
		}
					

    };
    


    
    
    $scope.checkColor = function(filevalue) {
		if (filevalue === '1') {
			return "green"
		} else {
			return "grey"
		}
	};
    
    
    
    
    $scope.filter = 'none';    
    
    $scope.toggleEdit = function(index){
		$scope.patients[index].edit = !$scope.patients[index].edit;
    };

    $scope.showAppts = function(index){
		$scope.patients[index].appt = !$scope.patients[index].appt;
		//alert(JSON.stringify($scope.patients[index].PatientDetails));
		
    };
   

    

    
	$scope.lessThan = function(prop, val){
		return function(item){
		  return item[prop] < val;
		}
	}
    
    $scope.dateFromISO = function(isostr) {
			var parts = isostr.match(/\d+/g);
			return new Date(parts[0], parts[1] -1, parts[2], parts[3], parts[4], parts[5]);
	} 

    $scope.checkDate = function(index){
			
			var testDate = new Date();
			var diff = (($scope.dateFromISO($scope.resources[index].LeaveDate) - $scope.dateFromISO(testDate.toISOString()))/60000/60/24);
		
      if (diff <= 62) 
		{
			return 1;
		} else if (diff <= 90 && diff >62)
		{
			return 2;
		}
    };

}]);	 

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Main Controller ///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


   angular.module('scotchApp')
	.controller('MainController',['$scope','$http', function($scope, $http) {
	
			$scope.formData = {};	
			var testDate = '';
			var calObj = '';
			$scope.pt_appt_status = '';
			$scope.no_bookings = true;
			$scope.pt_appt_status = '';
			$scope.statusSelect = '';
			$scope.pt_appt_status = '';
			
			$('#datepicker').datepicker({clearBtn:true,format:'yyyy-mm-dd'},'show');
			
			
			$('#datepicker').on('changeDate', function() {
			//	console.log('Changing Date: ' + $scope.practice_return);
				calObj = $('#datepicker').datepicker('getFormattedDate');
			//	console.log('Calendar Object: ' + calObj);
	
					
					$scope.findPatientsPerPractice($scope.practice_return);



			});
			
	/*		$('#datepicker').on('clearDate', function() {
				calObj = '';
				console.log('Clearing Date: ' + $scope.practice_return);
			   $scope.findPatientsPerPractice($scope.practice_return);
											
					
			});
	*/		
			$scope.getRealIndex = function(patient){
				var ptIndex = $scope.patients.indexOf(patient);
				console.log("Real Index for patient: " + ptIndex);
				return ptIndex
			};  
			
			$scope.getSpecificDate= function(m) {
						console.log("m : *" + m + "*");
						var dateObj = new Date(m);
						var sYear = dateObj.getUTCFullYear();
						var sMonth = dateObj.getUTCMonth();
						var sDay = '';
						var sDay = dateObj.getDate() + '';
						var the_result;

						if (sDay.length === 1) {
							sDay = '0' + sDay;
						}
						if ($scope.practice_return != 'All') {
							if (m == '') {
									$http.get('/api/specifictechs/' + $scope.practice_return)
										.success(function(data) {
											$scope.patients= data;
											$scope.originalPatient= data;
											console.log("Getting specific techs" + JSON.stringify(data, null, 2));
											if (data.length == 0) {
												$scope.no_bookings = true
											} else {
												$scope.no_bookings = false
											}

									})
										.error(function(data) {
											console.log('Error: ' + data);
									});
							} else {
									$http.get('/api/specificdates/' + $scope.practice_return + '/' + sYear + '/' + sMonth + '/' + sDay)
										.success(function(data) {
											$scope.patients= data;
											$scope.originalPatient= data;
											console.log("Getting specific date" + JSON.stringify(data, null, 2));
											if (data.length == 0) {
												$scope.no_bookings = true
											} else {
												$scope.no_bookings = false
											}

									})
										.error(function(data) {
											console.log('Error: ' + data);
									});
							}
						} else {
							$http.get('/api/main/' + sYear + '/' + sMonth + '/' + sDay)
								.success(function(data) {
									$scope.patients= data;
									$scope.originalPatient= data;
									console.log(data.length);
									if (data.length == 0) {
										$scope.no_bookings = true
									} else {
										$scope.no_bookings = false
									}

							})
								.error(function(data) {
									console.log('Error: ' + data);
							});							
							
							
						}
			}
		

			


    
			$scope.thecolor = "green"
			$scope.bodyText = "";
			$scope.showModal1 = false;
			$scope.showModal2 = false;
			$scope.practice_return = "All";
			$scope.ptID = '';
			$scope.ptApptDate = '';

			
			$scope.hide = function(m){
				if(m === 1){
					$scope.formData = {};
					$scope.showModal1 = false;
				}else{
					$scope.showModal2 = false;
				}
			}


			
	$scope.showM = function(m,filetype, index, results){

		if(m === 1){
			console.log(JSON.stringify(index, null, 2) );
			console.log(JSON.stringify($scope.patients[index], null, 2) );
			$scope.showModal1 	= true;
			$scope.ptID	= $scope.patients[index].PatientDetails[0].pt_ID;
			$scope.ID	= $scope.patients[index]._id;
			$scope.ptApptDate = $scope.patients[index].appt_date
			$scope.patientName	= $scope.patients[index].PatientDetails[0].pt_title + ' ' + $scope.patients[index].PatientDetails[0].pt_fname + ' ' + $scope.patients[index].PatientDetails[0].pt_sname;
			console.log($scope.ID);
			$scope.Results		= results;

		} else if (m===2) {
			$scope.showModal2 = true;
			$scope.formData.pt_ID	= $scope.patients[index].pt_ID;
			$scope.patientName	= $scope.patients[index].pt_title + ' ' + $scope.patients[index].pt_fname + ' ' + $scope.patients[index].pt_sname;
			$scope.Results		= results;
		} else if (m===3) {
			$scope.showModal3 = true;
			$scope.formData.pt_ID	= $scope.patients[index].pt_ID;
			$scope.patientName	= $scope.patients[index].pt_title + ' ' + $scope.patients[index].pt_fname + ' ' + $scope.patients[index].pt_sname;
			$scope.Results		= results;
		}
		
		
	}
			
			$scope.modalOneShown = function(){
				console.log('modal one shown');
			}
			
			$scope.modalOneHide = function(){
				console.log('modal one hidden');
			} 
	 
	 
	 	// when landing on the page, get all resources and show them
    $http.get('/api/main')
        .success(function(data) {
		    $scope.patients = data;
            $scope.originalPatient = data;
			console.log('Original Main');
			console.log(data);
			if (data.length == 0) {
				$scope.no_bookings = true
			} else {
				$scope.no_bookings = false
			}


            
        })
        .error(function(data) {
            console.log('Error: ' + data);
    });
    
		$http.get('/api/availabletechs')
        .success(function(data) {
            $scope.accounts = data;
            $scope.originalAccounts= data;
            console.log('Accounts: ' + JSON.stringify(data, null, 2));

            
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });  	
   
    	 	// when landing on the page, get all resources and show them
    $http.get('/api/practice')
        .success(function(data) {
            $scope.practices = data;
            $scope.originalPractice = data;
  //          console.log(data);
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
    });
       
        // delete a resource after checking it
    $scope.deleteResource = function(id) {
		alert(id);
        $http.delete('/api/resources/' + id)
            .success(function(data) {
                $scope.resources = data;
                 
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
            // delete a resource after checking it
    $scope.deleteAppt = function(id) {
		alert('Deleting ' + id);
        $http.delete('/api/appt/' + id)
            .success(function(data) {
                $scope.patients = data;
				$scope.originalPatient = data;                 
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
	
    };
    
    
    
                // update a resource after checking it
    $scope.UpdateAppt = function() {
		
		console.log("ID to be updated: " + $scope.ID	+ ' with ' + $scope.formData.pt_appt_status + ' ' + $scope.formData.pt_appt_cash);
        
       $http.put('/api/appt/' + $scope.ID + '/' + 
				encodeURIComponent($scope.formData.pt_appt_status)+ '/' +
				encodeURIComponent($scope.formData.pt_appt_cash)
			)
            .success(function(data) {
                $scope.patients = data;
				$scope.originalPatient = data;                 
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
           
    };
  
          // delete a resource after checking it
    $scope.findPatientsPerPractice = function(practice) {

		$scope.practice_return = practice;
		console.log('Calendar: *' + calObj +'* and practice: ' + practice);
	
	
		if (practice == 'All' && calObj == '') {
			$http.get('/api/main')
				.success(function(data) {

					$scope.patients = data;
					$scope.originalPatient = data;
					console.log(data);
					
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
			
		} else	if (practice == 'All' && calObj != '') {
			$scope.getSpecificDate(calObj);
		} else {
			console.log("Getting last option");
			$scope.getSpecificDate(calObj);
			
		}
		
					

    };
    


    
    
    $scope.checkColor = function(filevalue) {
		if (filevalue > 1) {
			return "green"
		} else if  (filevalue === 0) {
			return "grey"
		} else  {
			return "red"
		}
	};
    
    
    
        // update a resource after checking it
    $scope.updateResource = function(index) {
		
		alert("Update:" + $scope.resources[index]._id + " : " + JSON.stringify($scope.resources[index], null, 2));
         $http.put('/api/resources/' + $scope.resources[index]._id + 
        "/" + encodeURIComponent($scope.resources[index].PersonNo) + 
        "/" + encodeURIComponent($scope.resources[index].fname) + 
        "/" + encodeURIComponent($scope.resources[index].sname) + 
        "/" + encodeURIComponent($scope.resources[index].EntryDate) + 
        "/" + encodeURIComponent($scope.resources[index].LeaveDate) + 
        "/" + encodeURIComponent($scope.resources[index].RPLM))
            .success(function(data) {
				 $scope.resources = data;
                 $scope.originalResources = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
            // update a resource after checking it
    $scope.updateResource2 = function(index) {
		
		alert("Update2:" + $scope.resources[index]._id + " : " + JSON.stringify($scope.resources[index], null, 2));
         $http.put('/api/main2/' + $scope.resources[index]._id + 
        "/" + encodeURIComponent($scope.resources[index].Comments))
            .success(function(data) {
				 $scope.resources = data;
                 $scope.originalResources = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    
    $scope.filter = 'none';    
    
    $scope.toggleEdit = function(index){
		$scope.patients[index].edit = !$scope.patients[index].edit;
    };

    $scope.showAppts = function(index){
		$scope.patients[index].appt = !$scope.patients[index].appt;
		//alert(JSON.stringify($scope.patients[index].PatientDetails));
		
    };
   
    
                // Check for files
    $scope.findAppts = function(index) {
		console.log('Loading: patient appts: ' + $scope.patients[index]._id);
       /* $http.get('/api/uploads2/' + resourceID + "/" + fileType)
            .success(function(data) {
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        */
        return 1;
    };
    

    
	$scope.lessThan = function(prop, val){
		return function(item){
		  return item[prop] < val;
		}
	}
    
    $scope.dateFromISO = function(isostr) {
			var parts = isostr.match(/\d+/g);
			return new Date(parts[0], parts[1] -1, parts[2], parts[3], parts[4], parts[5]);
	} 

    $scope.checkDate = function(index){
			
			var testDate = new Date();
			var diff = (($scope.dateFromISO($scope.resources[index].LeaveDate) - $scope.dateFromISO(testDate.toISOString()))/60000/60/24);
		
      if (diff <= 62) 
		{
			return 1;
		} else if (diff <= 90 && diff >62)
		{
			return 2;
		}
    };

}]);	 

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Mobile Controller ////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


   angular.module('scotchApp')
	.controller('MobileController',['$scope','$http', function($scope, $http) {
	
			$scope.formData = {};	
			var testDate = '';
			var calObj = '';
			$scope.pt_appt_status = '';
			$scope.no_bookings = true;
			$scope.pt_appt_status = '';
			$scope.statusSelect = '';
			$scope.pt_appt_status = '';
			
			$('#datepicker .input-group.date').datepicker({},'show');
			
			
			$('#datepicker').on('changeDate', function() {
			//	console.log('Changing Date: ' + $scope.practice_return);
				calObj = $('#datepicker').datepicker('getFormattedDate');
			//	console.log('Calendar Object: ' + calObj);
			$('#datepicker').datepicker('hide');	
					
					$scope.findPatientsPerPractice($scope.practice_return);



			});
			
	/*		$('#datepicker').on('clearDate', function() {
				calObj = '';
				console.log('Clearing Date: ' + $scope.practice_return);
			   $scope.findPatientsPerPractice($scope.practice_return);
											
					
			});
	*/		
			$scope.getRealIndex = function(patient){
				var ptIndex = $scope.patients.indexOf(patient);
				console.log("Real Index for patient: " + ptIndex);
				return ptIndex
			};  
			
			$scope.getSpecificDate= function(m) {
		
						var dateObj = new Date(m);
						var sYear = dateObj.getUTCFullYear();
						var sMonth = dateObj.getUTCMonth();
						var sDay = '';
						var sDay = dateObj.getDate() + '';
						var the_result;

						if (sDay.length === 1) {
							sDay = '0' + sDay;
						}
						if ($scope.practice_return != 'All') {
							$http.get('/api/specificdates/' + $scope.practice_return + '/' + sYear + '/' + sMonth + '/' + sDay)
								.success(function(data) {
									$scope.patients= data;
									$scope.originalPatient= data;
									console.log(data.length);
									if (data.length == 0) {
										$scope.no_bookings = true
									} else {
										$scope.no_bookings = false
									}

							})
								.error(function(data) {
									console.log('Error: ' + data);
							});
						} else {
							$http.get('/api/main/' + sYear + '/' + sMonth + '/' + sDay)
								.success(function(data) {
									$scope.patients= data;
									$scope.originalPatient= data;
									console.log(data.length);
									if (data.length == 0) {
										$scope.no_bookings = true
									} else {
										$scope.no_bookings = false
									}

							})
								.error(function(data) {
									console.log('Error: ' + data);
							});							
							
							
						}
			}
		

			


    
			$scope.thecolor = "green"
			$scope.bodyText = "";
			$scope.showModal1 = false;
			$scope.showModal2 = false;
			$scope.practice_return = "All";
			$scope.ptID = '';
			$scope.ptApptDate = '';

			
			$scope.hide = function(m){
				if(m === 1){
					$scope.formData = {};
					$scope.showModal1 = false;
				}else{
					$scope.showModal2 = false;
				}
			}


			
	$scope.showM = function(m,filetype, index, results){

		if(m === 1){
			console.log(JSON.stringify(index, null, 2) );
			console.log(JSON.stringify($scope.patients[index], null, 2) );
			$scope.showModal1 	= true;
			$scope.ptID	= $scope.patients[index].PatientDetails[0].pt_ID;
			$scope.ID	= $scope.patients[index]._id;
			$scope.ptApptDate = $scope.patients[index].appt_date
			$scope.patientName	= $scope.patients[index].PatientDetails[0].pt_title + ' ' + $scope.patients[index].PatientDetails[0].pt_fname + ' ' + $scope.patients[index].PatientDetails[0].pt_sname;
			console.log($scope.ID);
			$scope.Results		= results;

		} else if (m===2) {
			$scope.showModal2 = true;
			$scope.formData.pt_ID	= $scope.patients[index].pt_ID;
			$scope.patientName	= $scope.patients[index].pt_title + ' ' + $scope.patients[index].pt_fname + ' ' + $scope.patients[index].pt_sname;
			$scope.Results		= results;
		} else if (m===3) {
			$scope.showModal3 = true;
			$scope.formData.pt_ID	= $scope.patients[index].pt_ID;
			$scope.patientName	= $scope.patients[index].pt_title + ' ' + $scope.patients[index].pt_fname + ' ' + $scope.patients[index].pt_sname;
			$scope.Results		= results;
		}
		
		
	}
			
			$scope.modalOneShown = function(){
				console.log('modal one shown');
			}
			
			$scope.modalOneHide = function(){
				console.log('modal one hidden');
			} 
	 
	 
	 	// when landing on the page, get all resources and show them
    $http.get('/api/main')
        .success(function(data) {
		    $scope.patients = data;
            $scope.originalPatient = data;
			console.log('Original Main');
			console.log(data);
			if (data.length == 0) {
				$scope.no_bookings = true
			} else {
				$scope.no_bookings = false
			}


            
        })
        .error(function(data) {
            console.log('Error: ' + data);
    });
    
	 	
   
    	 	// when landing on the page, get all resources and show them
    $http.get('/api/practice')
        .success(function(data) {
            $scope.practices = data;
            $scope.originalPractice = data;
  //          console.log(data);
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
    });
       
        // delete a resource after checking it
    $scope.deleteResource = function(id) {
		alert(id);
        $http.delete('/api/resources/' + id)
            .success(function(data) {
                $scope.resources = data;
                 
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
            // delete a resource after checking it
    $scope.deleteAppt = function(id) {
		alert('Deleting ' + id);
        $http.delete('/api/appt/' + id)
            .success(function(data) {
                $scope.patients = data;
				$scope.originalPatient = data;                 
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
	
    };
    
    
    
                // update a resource after checking it
    $scope.UpdateAppt = function() {
		
		console.log("ID to be updated: " + $scope.ID	+ ' with ' + $scope.formData.pt_appt_status + ' ' + $scope.formData.pt_appt_cash);
        
       $http.put('/api/appt/' + $scope.ID + '/' + 
				encodeURIComponent($scope.formData.pt_appt_status)+ '/' +
				encodeURIComponent($scope.formData.pt_appt_cash)
			)
            .success(function(data) {
                $scope.patients = data;
				$scope.originalPatient = data;                 
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
           
    };
  
          // delete a resource after checking it
    $scope.findPatientsPerPractice = function(practice) {

		$scope.practice_return = practice;
		console.log('Calendar: *' + calObj +'* and practice: ' + practice);
	
	
		if (practice == 'All' && calObj == '') {
			$http.get('/api/main')
				.success(function(data) {

					$scope.patients = data;
					$scope.originalPatient = data;
					console.log(data);
					
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
			
		};
		if(practice == 'All' && calObj != '') {
			$scope.getSpecificDate(calObj);
		}
					
		
	/*	
				  $http.get('/api/patient/' + practice)
            .success(function(data) {
                $scope.patients = data;
                $scope.originalPatient = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        } else {
			
			*/

    };
    


    
    
    $scope.checkColor = function(filevalue) {
		if (filevalue > 1) {
			return "green"
		} else if  (filevalue === 0) {
			return "grey"
		} else  {
			return "red"
		}
	};
    
    
    
        // update a resource after checking it
    $scope.updateResource = function(index) {
		
		alert("Update:" + $scope.resources[index]._id + " : " + JSON.stringify($scope.resources[index], null, 2));
         $http.put('/api/resources/' + $scope.resources[index]._id + 
        "/" + encodeURIComponent($scope.resources[index].PersonNo) + 
        "/" + encodeURIComponent($scope.resources[index].fname) + 
        "/" + encodeURIComponent($scope.resources[index].sname) + 
        "/" + encodeURIComponent($scope.resources[index].EntryDate) + 
        "/" + encodeURIComponent($scope.resources[index].LeaveDate) + 
        "/" + encodeURIComponent($scope.resources[index].RPLM))
            .success(function(data) {
				 $scope.resources = data;
                 $scope.originalResources = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
            // update a resource after checking it
    $scope.updateResource2 = function(index) {
		
		alert("Update2:" + $scope.resources[index]._id + " : " + JSON.stringify($scope.resources[index], null, 2));
         $http.put('/api/main2/' + $scope.resources[index]._id + 
        "/" + encodeURIComponent($scope.resources[index].Comments))
            .success(function(data) {
				 $scope.resources = data;
                 $scope.originalResources = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    
    $scope.filter = 'none';    
    
    $scope.toggleEdit = function(index){
		$scope.patients[index].edit = !$scope.patients[index].edit;
    };

    $scope.showAppts = function(index){
		$scope.patients[index].appt = !$scope.patients[index].appt;
		//alert(JSON.stringify($scope.patients[index].PatientDetails));
		
    };
   
    
                // Check for files
    $scope.findAppts = function(index) {
		console.log('Loading: patient appts: ' + $scope.patients[index]._id);
       /* $http.get('/api/uploads2/' + resourceID + "/" + fileType)
            .success(function(data) {
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        */
        return 1;
    };
    

    
	$scope.lessThan = function(prop, val){
		return function(item){
		  return item[prop] < val;
		}
	}
    
    $scope.dateFromISO = function(isostr) {
			var parts = isostr.match(/\d+/g);
			return new Date(parts[0], parts[1] -1, parts[2], parts[3], parts[4], parts[5]);
	} 

    $scope.checkDate = function(index){
			
			var testDate = new Date();
			var diff = (($scope.dateFromISO($scope.resources[index].LeaveDate) - $scope.dateFromISO(testDate.toISOString()))/60000/60/24);
		
      if (diff <= 62) 
		{
			return 1;
		} else if (diff <= 90 && diff >62)
		{
			return 2;
		}
    };

}]);	 

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Admin Controller /////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 angular.module('scotchApp')
	.controller('AdminController',['$scope','$http', function($scope, $http) {
			$scope.thecolor = "green"
			$scope.bodyText = "";
			$scope.showModal1 = false;
			$scope.showModal2 = false;
			
			
			$scope.hide = function(m){
				if(m === 1){
					$scope.showModal1 = false;
				}else{
					$scope.showModal2 = false;
				}
			}

			$scope.checkCurrentDate = function(m){
			//	console.log(m);
				return true;
			}
			
			$scope.showM = function(m,filetype, index, results){

				if(m === 1){
					$scope.showModal1 	= true;
					$scope.fileType 	= filetype;
					$scope.patientID	= $scope.patients[index]._id;
					$scope.Results		= results;

				}else{
					$scope.showModal2 = true;
				}
			}
			
			$scope.modalOneShown = function(){
				console.log('modal one shown');
			}
			
			$scope.modalOneHide = function(){
				console.log('modal one hidden');
			} 
	 
	 
	 	// when landing on the page, get all resources and show them
    $http.get('/api/admin')
        .success(function(data) {
            $scope.patients = data;
            $scope.originalPatient = data;
			console.log($scope.patients);
	        
        })
        .error(function(data) {
            console.log('Error: ' + data);
    });
    
	 	
       
  
          // delete a resource after checking it
    $scope.findPatientsPerPractice = function(practice) {

		if (practice != 'all') {
			
		  $http.get('/api/patient/' + practice)
            .success(function(data) {
                $scope.patients = data;
                $scope.originalPatient = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        } else {

		$http.get('/api/main')
			.success(function(data) {
				$scope.patients = data;
				$scope.originalPatient = data;
				console.log(data);
				
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
			
		};
    };
    


    
    
    $scope.checkColor = function(filevalue) {
		if (filevalue === '1') {
			return "green"
		} else {
			return "grey"
		}
	};
    
    
    
        // update a resource after checking it
    $scope.updateResource = function(index) {
		
		alert("Update:" + $scope.resources[index]._id + " : " + JSON.stringify($scope.resources[index], null, 2));
         $http.put('/api/resources/' + $scope.resources[index]._id + 
        "/" + encodeURIComponent($scope.resources[index].PersonNo) + 
        "/" + encodeURIComponent($scope.resources[index].fname) + 
        "/" + encodeURIComponent($scope.resources[index].sname) + 
        "/" + encodeURIComponent($scope.resources[index].EntryDate) + 
        "/" + encodeURIComponent($scope.resources[index].LeaveDate) + 
        "/" + encodeURIComponent($scope.resources[index].RPLM))
            .success(function(data) {
				 $scope.resources = data;
                 $scope.originalResources = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
            // update a resource after checking it
    $scope.updateResource2 = function(index) {
		
		alert("Update2:" + $scope.resources[index]._id + " : " + JSON.stringify($scope.resources[index], null, 2));
         $http.put('/api/main2/' + $scope.resources[index]._id + 
        "/" + encodeURIComponent($scope.resources[index].Comments))
            .success(function(data) {
				 $scope.resources = data;
                 $scope.originalResources = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    
    $scope.filter = 'none';    
    
    $scope.toggleEdit = function(index){

		$scope.patients[index].edit = !$scope.patients[index].edit;

    };

    $scope.showUpload = function(){

		alert($scope.patients);
		
    };
   
    $scope.findAppts = function(index) {

		console.log('Loading: patient appts: ' + $scope.patients[index]._id);
        return 1;

    };
    
     $scope.getRealIndex = function(patient){
		var patientIndex = $scope.patients.indexOf(patient);
		return patientIndex
     };  
    
	$scope.lessThan = function(prop, val){
		return function(item){
		  return item[prop] < val;
		}
	}
    
    $scope.dateFromISO = function(isostr) {
			var parts = isostr.match(/\d+/g);
			return new Date(parts[0], parts[1] -1, parts[2], parts[3], parts[4], parts[5]);
	} 

    $scope.checkDate = function(index){
			
			var testDate = new Date();
			var diff = (($scope.dateFromISO($scope.resources[index].LeaveDate) - $scope.dateFromISO(testDate.toISOString()))/60000/60/24);
		
      if (diff <= 62) 
		{
			return 1;
		} else if (diff <= 90 && diff >62)
		{
			return 2;
		}
    };

}]);	 

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// History Controller ///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



angular.module('scotchApp')
	.controller('HistoryController',['$scope','$http', function($scope, $http) {
			$scope.thecolor = "green"
			$scope.bodyText = "";
			$scope.showModal1 = false;
			$scope.showModal2 = false;
			
			
			$scope.hide = function(m){
				if(m === 1){
					$scope.showModal1 = false;
				}else{
					$scope.showModal2 = false;
				}
			}

			$scope.checkCurrentDate = function(m){
			//	console.log(m);
				return true;
			}
			
			$scope.showM = function(m,filetype, index, results){

				if(m === 1){
					$scope.showModal1 	= true;
					$scope.fileType 	= filetype;
					$scope.patientID	= $scope.patients[index]._id;
					$scope.Results		= results;

				}else{
					$scope.showModal2 = true;
				}
			}
			
			$scope.modalOneShown = function(){
				console.log('modal one shown');
			}
			
			$scope.modalOneHide = function(){
				console.log('modal one hidden');
			} 
	 
	 

    
	 	
	 	// when landing on the page, get all resources and show them
    $http.get('/api/history')
        .success(function(data) {
            $scope.patients = data;
            $scope.originalPatient = data;
            console.log(data);
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
    });

   
    	 	// when landing on the page, get all resources and show them
    $http.get('/api/practice')
        .success(function(data) {
            $scope.practices = data;
            $scope.originalPractice = data;
            console.log(data);
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
    });
       
        // delete a resource after checking it
    $scope.deleteResource = function(id) {
		alert(id);
        $http.delete('/api/resources/' + id)
            .success(function(data) {
                $scope.resources = data;
                 
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
  
          // delete a resource after checking it
    $scope.findPatientsPerPractice = function(practice) {

		if (practice != 'all') {
			
		  $http.get('/api/patient/' + practice)
            .success(function(data) {
                $scope.patients = data;
                $scope.originalPatient = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        } else {

		$http.get('/api/main')
			.success(function(data) {
				$scope.patients = data;
				$scope.originalPatient = data;
				console.log(data);
				
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
			
		};
    };
    


    
    
    $scope.checkColor = function(filevalue) {
		if (filevalue === '1') {
			return "green"
		} else {
			return "grey"
		}
	};
    
    
    
        // update a resource after checking it
    $scope.updateResource = function(index) {
		
		alert("Update:" + $scope.resources[index]._id + " : " + JSON.stringify($scope.resources[index], null, 2));
         $http.put('/api/resources/' + $scope.resources[index]._id + 
        "/" + encodeURIComponent($scope.resources[index].PersonNo) + 
        "/" + encodeURIComponent($scope.resources[index].fname) + 
        "/" + encodeURIComponent($scope.resources[index].sname) + 
        "/" + encodeURIComponent($scope.resources[index].EntryDate) + 
        "/" + encodeURIComponent($scope.resources[index].LeaveDate) + 
        "/" + encodeURIComponent($scope.resources[index].RPLM))
            .success(function(data) {
				 $scope.resources = data;
                 $scope.originalResources = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
            // update a resource after checking it
    $scope.updateResource2 = function(index) {
		
		alert("Update2:" + $scope.resources[index]._id + " : " + JSON.stringify($scope.resources[index], null, 2));
         $http.put('/api/main2/' + $scope.resources[index]._id + 
        "/" + encodeURIComponent($scope.resources[index].Comments))
            .success(function(data) {
				 $scope.resources = data;
                 $scope.originalResources = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    
    $scope.filter = 'none';    
    
    $scope.toggleEdit = function(index){
		$scope.patients[index].edit = !$scope.patients[index].edit;
    };

    $scope.showAppts = function(index){
		$scope.patients[index].appt = !$scope.patients[index].appt;
		//alert(JSON.stringify($scope.patients[index].PatientDetails));
		
    };
   
    
                // Check for files
    $scope.findAppts = function(index) {
		console.log('Loading: patient appts: ' + $scope.patients[index]._id);
       /* $http.get('/api/uploads2/' + resourceID + "/" + fileType)
            .success(function(data) {
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        */
        return 1;
    };
    
     $scope.getRealIndex = function(patient){
		var patientIndex = $scope.patients.indexOf(patient);
		return patientIndex
     };  
    
	$scope.lessThan = function(prop, val){
		return function(item){
		  return item[prop] < val;
		}
	}
    
    $scope.dateFromISO = function(isostr) {
			var parts = isostr.match(/\d+/g);
			return new Date(parts[0], parts[1] -1, parts[2], parts[3], parts[4], parts[5]);
	} 

    $scope.checkDate = function(index){
			
			var testDate = new Date();
			var diff = (($scope.dateFromISO($scope.resources[index].LeaveDate) - $scope.dateFromISO(testDate.toISOString()))/60000/60/24);
		
      if (diff <= 62) 
		{
			return 1;
		} else if (diff <= 90 && diff >62)
		{
			return 2;
		}
    };

}]);	 

 angular.module('scotchApp')
 .controller('UploadModalController', ['$http', 'Upload', '$scope', function($http, Upload, $scope){
		 
		$scope.fileType = {
			name: 'A3'
		};
		 
		console.log('Finding files for' + $scope.ResourceID); 
		$http.get('/api/uploads1/' + $scope.ResourceID)
        .success(function(data) {
            $scope.files = data;
            $scope.originalFiles = data;
            console.log(data);
          
        })
        .error(function(data) {
            console.log('Error: ' + data);
		});
		 
		 
		  $scope.submit = function(){
		   Upload.upload({
			url: '/api/uploads',
			method: 'post',
			//data: $scope.upload
			file: $scope.ufile,
			data: {name:$scope.uname, resourceID:$scope.ResourceID,filetype:$scope.fileType.name}
		  }).then(function (response) {
			console.log(response.data);

			$scope.upload = {};

		  })
		}

		
	}]);
	
  angular.module('scotchApp')
 .controller('DoctorController',function($scope, $http) {
	 
    $scope.filter = 'none';    
    
    $scope.toggleEdit = function(index){
		$scope.doctors[index].edit = !$scope.doctors[index].edit;
    };
    
     $scope.getRealIndex = function(doctor){
		var doctorIndex = $scope.doctors.indexOf(doctor);
		return doctorIndex
     };  
    
	$scope.lessThan = function(prop, val){
		return function(item){
		  return item[prop] < val;
		}
	}
	 
  
    $scope.toggleAdd = function(index){
		
		$scope.companies[index].add = !$scope.companies[index].add;
		$scope.companies[index].edit = false;
		console.log('$scope.companies[index].edit: (Add)' + $scope.companies[index].edit);
		console.log('$scope.companies[index].add: (Add)' + $scope.companies[index].add);	
		console.log("Index: " + index);
    };  
	 
	 	// when landing on the page, get all doctors and show them
    $http.get('/api/doctor')
        .success(function(data) {
            $scope.doctors = data;
            $scope.originalDoctor = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
       
        // delete a doctor after checking it
    $scope.deleteHardware = function(id) {
		alert(id);
        $http.delete('/api/hardware/' + id)
            .success(function(data) {
                $scope.hardwares = data;
                 
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
        // when submitting the add form, send the text to the node API
    $scope.createDoctor = function() {
        $http.post('/api/doctor', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.doctors = data;
                $scope.originalDoctor = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}); 	

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Patient Controller ////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


 angular.module('scotchApp')
 .controller('PatientController',function($scope, $http, $window) {
	
	


	   
	 var picker2;
	$scope.formData = {};
    $scope.formData.Pt_date = new Date();
    $scope.formData.end_date = new Date();
	$scope.formData.pt_appt_time = new Date();
    $scope.showModal1 = false;
	$scope.showModal2 = false;
	$scope.showModal3 = false;
	$scope.bookings = [];
	
	$scope.hide = function(m){
		$scope.formData = {};

		if(m === 1){
			$scope.showModal1 = false;
		} else if (m === 2) {
			$scope.showModal2 = false;
		} else if (m === 3) {
			$scope.showModal2 = false;
		};
	}


	$scope.showM = function(m,filetype, index, results){

		if(m === 1){
			$scope.showModal1 	= true;
			$scope.formData.pt_ID	= $scope.patients[index].pt_ID;
			$scope.patientName	= $scope.patients[index].pt_title + ' ' + $scope.patients[index].pt_fname + ' ' + $scope.patients[index].pt_sname;
			$scope.Results		= results;

		} else if (m===2) {
			$scope.showModal2 = true;
			$scope.formData.pt_ID	= $scope.patients[index].pt_ID;
			$scope.patientName	= $scope.patients[index].pt_title + ' ' + $scope.patients[index].pt_fname + ' ' + $scope.patients[index].pt_sname;
			$scope.Results		= results;
		} else if (m===3) {
			$scope.showModal3 = true;
			$scope.formData.pt_ID	= $scope.patients[index].pt_ID;
			$scope.patientName	= $scope.patients[index].pt_title + ' ' + $scope.patients[index].pt_fname + ' ' + $scope.patients[index].pt_sname;
			$scope.Results		= results;
		}
		
		
	}
	
	$scope.modalOneShown = function(){
		console.log('modal one shown');
	}
	
	$scope.modalOneHide = function(){
		console.log('modal one hidden');
	} 
			
			   
   
    $scope.filter = 'none';    
    
    $scope.toggleEdit = function(index){
      $scope.patients[index].edit = !$scope.patients[index].edit;
      
      console.log("Index: " + index);
    };
    

    
     $scope.getRealIndex = function(patient){
		var ptIndex = $scope.patients.indexOf(patient);
		return ptIndex
     };  
      

 
 
    $scope.filterByName = function(name){
      $scope.resetPatients();
      $scope.patients = $scope.patients.filter(function(patient){
        return patient.name === name;
      });
      $scope.filter = 'Name: ' + name;
    };
    
    //------------------------------------------------------
	$http.get('/api/patient')
        .success(function(data) {
            $scope.patients = data;
            $scope.originalPatients = data;
            console.log('Patients: ' + JSON.stringify(data, null, 2));
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    $http.get('/api/practice')
        .success(function(data) {
            $scope.practices = data;
            $scope.originalPractices = data;
            console.log('Practices: ' + JSON.stringify(data, null, 2));
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
  
     $http.get('/api/service')
        .success(function(data) {
            $scope.services = data;
            $scope.originalServices= data;
            console.log('Services: ' + JSON.stringify(data, null, 2));

            
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
        }); 
        
       $http.get('/api/availabletechs')
        .success(function(data) {
            $scope.accounts = data;
            $scope.originalAccounts= data;
            console.log('Accounts: ' + JSON.stringify(data, null, 2));

            
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
        }); 
    
    // when submitting the add form, send the text to the node API
    $scope.createPatient = function() {
		if (isNaN($scope.formData.pt_ID)) {
			alert('Please enter a numeric value for ID only');
		} else {
			$http.post('/api/patient', $scope.formData)
				.success(function(data) {
					$scope.formData = {}; // clear the form so our user is ready to enter another
					$scope.patients = data;
					$scope.originalPatients = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		}
    };
    
        // when submitting the add form, send the text to the node API
    $scope.createAppt = function() {
			
			var dateObj = new Date($scope.formData.pt_appt_date);
			var sYear = dateObj.getUTCFullYear();
			var sMonth = dateObj.getUTCMonth();
			var sDay = dateObj.getDate();
			var sHr = dateObj.getDate();
			var sMin = dateObj.getDate();
			
			var sDate = new Date(sYear,sMonth,sDay,picker2.time.h,picker2.time.m);

			$scope.formData.pt_appt_booking = sDate;


			$http.post('/api/appt', $scope.formData)
				.success(function(data) {
					$scope.formData = {}; // clear the form so our user is ready to enter another
					$scope.appts = data;
					$scope.originalAppts = data;
					console.log(data);
					$scope.feedback = "Appointment created.";
					picker2.setTime('');
					picker2.destroy();
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
 
 
    };
 

    $scope.getTime = function() {
		
		var dateObj = new Date($scope.formData.pt_appt_date);
		var sYear = dateObj.getUTCFullYear();
		var sMonth = dateObj.getUTCMonth();
		var sDay = dateObj.getDate();
		
		$http.get('/api/bookings/' + $scope.formData.pt_appt_tech + '/' + sYear + '/' + sMonth + '/' + sDay)
            .success(function(data) {
                $scope.BookingTimes = data;
                $scope.bookings = data;
                $scope.originalBookingTimes = data;
                console.log(data);

		})
            .error(function(data) {
                console.log('Error: ' + data);
		});
		
		



		
		/*	$http.post('/api/appt', $scope.formData)
				.success(function(data) {
					$scope.formData = {}; // clear the form so our user is ready to enter another
					$scope.appts = data;
					$scope.originalAppts = data;
					console.log(data);
					$scope.feedback = "Appointment created.";
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
*/ 
 
    };
 
	$scope.openTicker = function() {
			picker2 = new AppointmentPicker(document.getElementById('time-2'), {
					title: 'Select an appointment',
					interval: 30,
					startTime: 9,
					mode: '24h',
					endTime: 16,
					disabled: $scope.bookings,
					leadingZero: true,
					large: true
				});
			picker2.open();
		
		
	};

 
    
    
            // when submitting the add form, send the text to the node API
    $scope.createDetails = function() {
			
			$http.post('/api/patientdetail', $scope.formData)
				.success(function(data) {
					$scope.formData = {}; // clear the form so our user is ready to enter another
					$scope.details = data;
					$scope.originalDetails = data;
					console.log(data);
					$scope.feedback = "Details created.";
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
    };

    // delete a patient after checking it
    $scope.deletePatient = function(id) {
		    deletePatient = $window.confirm("Are you sure you want to delete this Patient");
			if(deletePatient){
				$http.delete('/api/patient/' + id)
					.success(function(data) {
						$scope.patients = data;
						 
						console.log(data);
					})
					.error(function(data) {
						console.log('Error: ' + data);
					});
			}
    };

    // update a work order after checking it
    $scope.updateWorkOrder = function(index) {
		
        $http.put('/api/workorders/' + $scope.workorders[index]._id + 
        "/" + encodeURIComponent($scope.workorders[index].WO_volume) + 
        "/" + encodeURIComponent($scope.workorders[index].Budget) + 
        "/" + encodeURIComponent($scope.workorders[index].WO_date) +
        "/" + encodeURIComponent($scope.workorders[index].end_date) +
        "/" + encodeURIComponent($scope.workorders[index].Client))
            .success(function(data) {
				 $scope.workorders = data;
                 $scope.originalWOs = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

});



  angular.module('scotchApp')
 .controller('ServiceController',function($scope, $http) {
	 
    $scope.filter = 'none';    
    
    $scope.toggleEdit = function(index){
		$scope.services[index].edit = !$scope.services[index].edit;
    };
    
     $scope.getRealIndex = function(service){
		var serviceIndex = $scope.services.indexOf(service);
		console.log('Índex: '+ serviceIndex);
		return serviceIndex
     };  
    
	$scope.lessThan = function(prop, val){
		return function(item){
		  return item[prop] < val;
		}
	}
	 
  
    $scope.toggleAdd = function(index){
		
		$scope.services[index].add = !$scope.services[index].add;
		$scope.services[index].edit = false;
		console.log('$scope.services[index].edit: (Add)' + $scope.services[index].edit);
		console.log('$scope.services[index].add: (Add)' + $scope.services[index].add);	
		console.log("Index: " + index);
    };  
	 
	 	// when landing on the page, get all doctors and show them
    $http.get('/api/service')
        .success(function(data) {
            $scope.services = data;
            $scope.originalService = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
       
        // delete a Service after checking it
    $scope.deleteService = function(id) {
		alert(id);
        $http.delete('/api/service/' + id)
            .success(function(data) {
                $scope.services = data;
                 
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
        // when submitting the add form, send the text to the node API
    $scope.createService = function() {
        $http.post('/api/service', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.services = data;
                $scope.originalService = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    $scope.updateService = function(index) {
		console.log('/api/service/' + $scope.services[index]._id + 
				"/" + encodeURIComponent($scope.services[index].service_name) + 
				"/" + encodeURIComponent($scope.services[index].service_desc)+ 
				"/" + encodeURIComponent($scope.services[index].service_cost)+ 
				"/" + encodeURIComponent($scope.services[index].service_branch)+ 
				"/" + encodeURIComponent($scope.services[index].service_active)+ 
				"/" + encodeURIComponent($scope.services[index].service_code)+ 
				"/" + encodeURIComponent($scope.services[index].service_ICD10)
				);
		$http.put('/api/service/' + $scope.services[index]._id + 
				"/" + encodeURIComponent($scope.services[index].service_name) + 
				"/" + encodeURIComponent($scope.services[index].service_desc)+ 
				"/" + encodeURIComponent($scope.services[index].service_cost)+ 
				"/" + encodeURIComponent($scope.services[index].service_branch)+ 
				"/" + encodeURIComponent($scope.services[index].service_active)+ 
				"/" + encodeURIComponent($scope.services[index].service_code)+ 
				"/" + encodeURIComponent($scope.services[index].service_ICD10)
		)
				.success(function(data) {
					 $scope.services = data;
					 $scope.originalService = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				}); 
         }

}); 	


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Practice Controller //////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  angular.module('scotchApp')
 .controller('PracticeController',function($scope, $http) {
	 
    $scope.filter = 'none';    
    
    $scope.toggleEdit = function(index){
		$scope.practices[index].edit = !$scope.practices[index].edit;
    };
    
     $scope.getRealIndex = function(practice){
		var practiceIndex = $scope.practice.indexOf(practice);
		console.log('Índex: '+ practiceIndex);
		return practiceIndex
     };  
    
	$scope.lessThan = function(prop, val){
		return function(item){
		  return item[prop] < val;
		}
	}
	 
  
    $scope.toggleAdd = function(index){
		
		$scope.practice[index].add = !$scope.practice[index].add;
		$scope.practice[index].edit = false;
		console.log('$scope.practice[index].edit: (Add)' + $scope.practice[index].edit);
		console.log('$scope.practice[index].add: (Add)' + $scope.practice[index].add);	
		console.log("Index: " + index);
    };  
	 
	 	// when landing on the page, get all doctors and show them
    $http.get('/api/practice')
        .success(function(data) {
            $scope.practices = data;
            $scope.originalPractice = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
       
        // delete a Service after checking it
    $scope.deletePractice = function(id) {
		alert(id);
        $http.delete('/api/practice/' + id)
            .success(function(data) {
                $scope.practices = data;
                 
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
        // when submitting the add form, send the text to the node API
    $scope.createPractice = function() {
        $http.post('/api/practice', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.practices = data;
                $scope.originalPractice = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    $scope.updatePractice = function(index) {

		$http.put('/api/practice/' + $scope.practices[index]._id + 
				"/" + encodeURIComponent($scope.practices[index].practice_location) + 
				"/" + encodeURIComponent($scope.practices[index].practice_address)+ 
				"/" + encodeURIComponent($scope.practices[index].practice_telnum)+ 
				"/" + encodeURIComponent($scope.practices[index].practice_faxnum)+ 
				"/" + encodeURIComponent($scope.practices[index].practice_email)+ 
				"/" + encodeURIComponent($scope.practices[index].practice_tech)
		)
				.success(function(data) {
					 $scope.practices = data;
					 $scope.originalPractice = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				}); 
         }

});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Account Controller //////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


 angular.module('scotchApp')
 .controller('AccountController',function($scope, $http, $location, AuthService) {
	 
	 
		$scope.createAccount = function() {
		console.log(JSON.stringify("Locals: " + $scope.formData, null, 2));
		$scope.error = false;
		$scope.disabled = true;
		AuthService.register($scope.formData.account_email,$scope.formData.account_password,$scope.formData.account_fname,$scope.formData.account_sname,$scope.formData.account_cell,$scope.formData.account_tech,$scope.formData.account_admin)
		.then(function() {
			$location.path('/account');
			$scope.disabled = false;
			$scope.loginForm = {};
		})
		.catch(function() {
			$scope.error = true;
			$scope.errorMessage = 'Something went wrong!';
			$scope.disabled = false;
			$scope.loginForm = {};
			
		});
		
	}
	 
	 
    $scope.filter = 'none';    
    
    $scope.toggleEdit = function(index){
		$scope.practices[index].edit = !$scope.practices[index].edit;
    };
    
     $scope.getRealIndex = function(practice){
		var practiceIndex = $scope.practice.indexOf(practice);
		console.log('Índex: '+ practiceIndex);
		return practiceIndex
     };  
    
	$scope.lessThan = function(prop, val){
		return function(item){
		  return item[prop] < val;
		}
	}
	 
  
    $scope.toggleAdd = function(index){
		
		$scope.practice[index].add = !$scope.practice[index].add;
		$scope.practice[index].edit = false;
		console.log('$scope.practice[index].edit: (Add)' + $scope.practice[index].edit);
		console.log('$scope.practice[index].add: (Add)' + $scope.practice[index].add);	
		console.log("Index: " + index);
    };  
	 
	 	// when landing on the page, get all doctors and show them
    $http.get('/api/account')
        .success(function(data) {
            $scope.accounts = data;
            $scope.originalAccount = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
       
        // delete a Service after checking it
    $scope.deletePractice = function(id) {
		alert(id);
        $http.delete('/api/practice/' + id)
            .success(function(data) {
                $scope.practices = data;
                 
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
        // when submitting the add form, send the text to the node API
    $scope.createPractice = function() {
        $http.post('/api/practice', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.practices = data;
                $scope.originalPractice = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    $scope.updatePractice = function(index) {

		$http.put('/api/practice/' + $scope.practices[index]._id + 
				"/" + encodeURIComponent($scope.practices[index].practice_location) + 
				"/" + encodeURIComponent($scope.practices[index].practice_address)+ 
				"/" + encodeURIComponent($scope.practices[index].practice_telnum)+ 
				"/" + encodeURIComponent($scope.practices[index].practice_faxnum)+ 
				"/" + encodeURIComponent($scope.practices[index].practice_email)+ 
				"/" + encodeURIComponent($scope.practices[index].practice_tech)
		)
				.success(function(data) {
					 $scope.practices = data;
					 $scope.originalPractice = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				}); 
         }

});

 angular.module('scotchApp')
 .controller('UploadPatientController', ['$http', 'Upload', '$scope', function($http, Upload, $scope){
		 
		$http.get('/api/uploads')
        .success(function(data) {
            $scope.uploads = data;
            $scope.originalUpload = data;
            console.log(data);
          
        })
        .error(function(data) {
            console.log('Error: ' + data);
		});
		 
		 
		$scope.submit = function(){
		console.log($scope.formData);
		console.log($scope);

			


			
		   Upload.upload({
			url: '/api/uploadpatientdetails',
			method: 'post',

			data: {files:$scope.files, resourceID:$scope.ResourceID}
			
		  }).then(function (response) {
			console.log(response.data);

			$scope.uploads.push(response.data);
			$scope.upload = {};

		  })
		}

		
	}]);
	
	
	 angular.module('scotchApp')
 .controller('UploadController', ['$http', 'Upload', '$scope', function($http, Upload, $scope){
		 
		$http.get('/api/uploads')
        .success(function(data) {
            $scope.uploads = data;
            $scope.originalUpload = data;
            console.log(data);
          
        })
        .error(function(data) {
            console.log('Error: ' + data);
		});
		 
		 
		$scope.submit = function(files){
			console.log($scope);

			
		   Upload.upload({
			url: '/api/uploadpatientdetails',
			method: 'post',
			mimetype: $scope.mimetype,
			name: $scope.originalname,
			data: {files:$scope.files}
		  }).then(function (response) {
			console.log(response.data);

			$scope.uploads.push(response.data);
			$scope.upload = {};

		  })
		}

		
	}]);
    
  angular.module('scotchApp')
 .controller('ResourceController',['$scope','$http', function($scope, $http) {
	 
			$scope.thecolor = "green"
			$scope.showModal1 = false;
			$scope.showModal2 = false;
			$scope.showModal3 = false;
				
			$scope.email = function(index) {
				$http.get('/api/sayHello')
					.success(function(data) {
						console.log('Email sent');
 					})
					.error(function(data) {
						console.log('Error: ' + data);
					});
				
			}
			
		  $scope.emailResource = function(){
		//console.log($scope.subjectText + ' - ' + $scope.bodyText);
		console.log(JSON.stringify($scope.emailData, null, 2));
				$http.post('/api/sendResourceMail', $scope.emailData)
					.success(function(data) {
						$scope.emailData = {};
						$scope.resources = data;
						console.log(data);
						console.log('Email sent');
						$scope.Results = 'Email sent';
						return 'success';
						
 					})
					.error(function(data) {
						console.log('Error: ' + data);
						$scope.Results = 'Error: ' + data;
						return 'error';
					});
				
	


			}
			
			
			$scope.hide = function(m){
				if(m === 1){
					$scope.showModal1 = false;
					$scope.uploads = '';
				}
				if(m === 2){
					$scope.showModal2 = false;
					$scope.emailData = {};
				}
				if(m === 3){
					$scope.showModal3 = false;
					$scope.resourceData = {};
				}
			}
			
			$scope.showM = function(m,filetype, index, results){
				$scope.fullname = $scope.resources[index].fname + ' ' + $scope.resources[index].sname + ' (' + $scope.resources[index].PersonNo + ')';
				if(m === 1){
					$scope.showModal1 	= true;
					$scope.fileType 	= filetype;
					$scope.ResourceID	= $scope.resources[index]._id;
					$scope.Results		= results;
					console.log('Modal one show for: ' + $scope.ResourceID + ' - ' + $scope.resources[index].fname);
					$http.get('/api/uploads1/' + $scope.ResourceID)
					.success(function(data) {
						$scope.files = data;
						$scope.originalFiles = data;

						console.log(data);
					  
					})
					.error(function(data) {
						console.log('Error: ' + data);
					});
				}
				if (m === 2){
					$scope.showModal2 = true;
					console.log('Modal two show for: ' + $scope.ResourceID + ' - ' + $scope.resources[index].fname);
				}
				if (m === 3){
					$scope.showModal3 = true;
				}
			}
			
			$scope.modalOneShown = function(){
				console.log('Modal one shown');
			}
			
			$scope.modalOneHide = function(){
				console.log('Modal one hidden');
			} 
			
			$scope.modalTwoShown = function(){
				console.log('Modal two shown');
			}
			
			$scope.modalTwoHide = function(){
				console.log('Modal two hidden');
			} 

			$scope.modalThreeShown = function(){
				console.log('Modal three shown');
			}
			
			$scope.modalThreeHide = function(){
				console.log('Modal three hidden');
			}
	 
	 
	 	// when landing on the page, get all resources and show them
    $http.get('/api/resources')
        .success(function(data) {
            $scope.resources = data;
            $scope.originalResource = data;
            console.log(data);
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
    });
    
        // when submitting the add form, send the text to the Resource Add node API
    $scope.createResource = function() {
        $http.post('/api/resources', $scope.resourceData)
            .success(function(data) {
                $scope.resourceData = {}; // clear the form so our user is ready to enter another
                $scope.resources = data;
                $scope.originalResources = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
       
        // delete a resource after checking it
    $scope.deleteResource = function(id) {
		alert(id);
        $http.delete('/api/resources/' + id)
            .success(function(data) {
                $scope.resources = data;
                 
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
            // Check for files
    $scope.checkFile = function(resourceID,fileType) {
		console.log('Loading:  /api/uploads2/' + resourceID + "/" + fileType);
        $http.get('/api/uploads2/' + resourceID + "/" + fileType)
            .success(function(data) {
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    
                // Check for files
    $scope.getUploadedFile = function(colour, resourceID,fileType) {
		if (colour === 'green') {
        $http.get('/api/uploads3/' + resourceID + "/" + fileType)
            .success(function(data) {
				//$scope.uploads = data;
				//$scope.originalUpload = data;
				console.log('Found: ' + data);
				return "Success"
            })
            .error(function(data) {
                console.log('Error: ' + data);
                return "No file found"
            });
         } else {
				return "No file found"
		}
    };
    
    

    
    
    $scope.checkColor = function(filevalue) {
		if (filevalue === '1') {
			return "green"
		} else {
			return "grey"
		}
	};
    
    
    
        // update a resource after checking it
    $scope.updateResource = function(index) {
		
		alert("Update:" + $scope.resources[index]._id + " : " + JSON.stringify($scope.resources[index], null, 2));
         $http.put('/api/resources/' + $scope.resources[index]._id + 
        "/" + encodeURIComponent($scope.resources[index].PersonNo) + 
        "/" + encodeURIComponent($scope.resources[index].fname) + 
        "/" + encodeURIComponent($scope.resources[index].sname) + 
        "/" + encodeURIComponent($scope.resources[index].EntryDate) + 
        "/" + encodeURIComponent($scope.resources[index].LeaveDate) + 
        "/" + encodeURIComponent($scope.resources[index].RPLM))
            .success(function(data) {
				 $scope.resources = data;
                 $scope.originalResources = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
            // update a resource after checking it
    $scope.updateResource2 = function(index) {
		
		alert("Update2:" + $scope.resources[index]._id + " : " + JSON.stringify($scope.resources[index], null, 2));
         $http.put('/api/resources2/' + $scope.resources[index]._id + 
        "/" + encodeURIComponent($scope.resources[index].Comments))
            .success(function(data) {
				 $scope.resources = data;
                 $scope.originalResources = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    
    $scope.filter = 'none';    
    
    $scope.toggleEdit = function(index){
		$scope.resources[index].edit = !$scope.resources[index].edit;
    };
    
     $scope.getRealIndex = function(resource){
		var resourceIndex = $scope.resources.indexOf(resource);
		return resourceIndex
     };  
    
	$scope.lessThan = function(prop, val){
		return function(item){
		  return item[prop] < val;
		}
	}
    
    $scope.dateFromISO = function(isostr) {
			var parts = isostr.match(/\d+/g);
			return new Date(parts[0], parts[1] -1, parts[2], parts[3], parts[4], parts[5]);
	} 

    $scope.checkDate = function(index){
			
			var testDate = new Date();
			var diff = (($scope.dateFromISO($scope.resources[index].LeaveDate) - $scope.dateFromISO(testDate.toISOString()))/60000/60/24);
		
      if (diff <= 60) 
		{
			return 1;
		} else if (diff <= 90 && diff >60)
		{
			return 2;
		}
    };

}]);

 	

 angular.module('scotchApp').directive('modal', function(){
        return {
            template: '<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content" ng-transclude><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">Modal title</h4></div></div></div></div>', 
            restrict: 'E',
            transclude: true,
            replace:true,
            scope:{visible:'=', onSown:'&', onHide:'&'},   
            link:function postLink(scope, element, attrs){
                
                $(element).modal({
                    show: false, 
                    keyboard: attrs.keyboard, 
                    backdrop: attrs.backdrop
                });
                
                scope.$watch(function(){return scope.visible;}, function(value){
                    
                    if(value == true){
                        $(element).modal('show');
                    }else{
                        $(element).modal('hide');
                    }
                });
                
                $(element).on('shown.bs.modal', function(){
                  scope.$apply(function(){
                    scope.$parent[attrs.visible] = true;
                  });
                });
                
                $(element).on('shown.bs.modal', function(){
                  scope.$apply(function(){
                      scope.onSown({});
                  });
                });

                $(element).on('hidden.bs.modal', function(){
                  scope.$apply(function(){
                    scope.$parent[attrs.visible] = false;
                  });
                });
                
                $(element).on('hidden.bs.modal', function(){
					scope.$apply(function(){
					  console.log('hiding modal');
                      scope.onHide({});
                  });

                });
            }
        };
    }
);

 
 angular.module('scotchApp').directive('modalHeader', function(){
    return {
        template:'<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">{{title}}</h4></div>',
        replace:true,
        restrict: 'E',
        scope: {title:'@'}
    };
});

 angular.module('scotchApp').directive('modalBody', function(){
    return {
        template:'<div class="modal-body" ng-transclude></div>',
        replace:true,
        restrict: 'E',
        transclude: true
    };
});

 angular.module('scotchApp').directive('modalFooter', function(){
		return {
			template:'<div class="modal-footer" ng-transclude></div>',
			replace:true,
			restrict: 'E',
			transclude: true
		};
	});


  angular.module('scotchApp')
 .controller('RegisterController',function($scope, $http, $location, AuthService) {

			$scope.register = function() {
				console.log(JSON.stringify($scope.locals, null, 2));
				$scope.error = false;
				$scope.disabled = true;
				AuthService.register($scope.locals.email,$scope.locals.password,$scope.locals.firstName,$scope.locals.lastName)
				.then(function() {
					$location.path('/login');
					$scope.disabled = false;
					$scope.loginForm = {};
				})
				.catch(function() {
					$scope.error = true;
					$scope.errorMessage = 'Something went wrong!';
					$scope.disabled = false;
					$scope.loginForm = {};
					
				});
				
			}


	});

  angular.module('scotchApp')
 .controller('LoginController',function($scope, $http, $location, $rootScope, AuthService) {



		$scope.login = function() {
			$scope.error = false;
			$scope.disabled = true;
			AuthService.login($scope.locals.email,$scope.locals.password)
			.then(function() {
				
				$location.path('/');
		
				$scope.disabled = false;
				$scope.loginForm = {};
			})
			.catch(function() {
				$scope.error = true;
				$scope.errorMessage = 'Invalid username and/or password';
				$scope.disabled = false;
				$scope.loginForm = {};
				
			});
			
		}

	});


  angular.module('scotchApp')
 .controller('LogoutController',function($scope, $http, $location, AuthService) {
		$scope.logout = function() {
			$scope.error = false;
			$scope.disabled = true;
			AuthService.logout() 
			.then (function() {
				$location.path('/login');
				$scope.disabled = false;
				$scope.loginForm = {};
			})
			.catch(function() {
				$scope.error = true;
				$scope.errorMessage = 'Could not log out';
				$scope.disabled = false;
				$scope.loginForm = {};
				
			});
			
		}			

		
	});


  angular
    .module('scotchApp')
    .factory('AuthService', ['$q','$timeout','$http','$rootScope', function($q, $timeout, $http, $rootScope) {
		
		var user = null;
		var user_name = [];

		return({
			isLoggedIn 		: isLoggedIn,
			getUserStatus 	: getUserStatus,
			getUserName		: getUserName,
			getIsMobile			: getIsMobile,
			login			: login,
			logout			: logout,
			register		: register
		});

			function isLoggedIn() {
				if (user) {
					return true;
				} else {
					return false;
				}
			}
			function getUserStatus() {
				return $http.get('/api/status')
				.success(function(data) {
					if(data.status) {
						user = true;
					} else {
						user = false;
					}
				})
				.error(function(data) {
					user = false;
				});
			}
			function getIsMobile() {
				
				return 4;
			}
			function getUserName() {
				var deferred = $q.defer();
				$http.get('/api/login').then(function(res,user_name) {
					user_name = res.data;
					console.log("Function - " + JSON.stringify(user_name, null, 2) + " - ");
					deferred.resolve(user_name);
				});
				return deferred.promise;
			}

			function login(username, password) {
				console.log('Logging in');
				var deferred = $q.defer();
				$http.post('/api/login',{username:username,password:password})
				.success(function(data,status) {
					if (status ===200 && data.status) {
						user = true;
						console.log('User logged in');
						deferred.resolve();
					} else {
						user = false;
						console.log('Login failed');
						deferred.reject();
					}
				})
				.error(function (data) {
					user = false;
					deferred.reject();
				});
				return deferred.promise;
			}
			function logout() {
				var deferred = $q.defer();
				$http.get('/api/logout')
				.success(function(data) {
						user = false;
						$rootScope.loggedin_user = '';
						deferred.resolve();
				})
				.error(function (data) {
					user = false;
					deferred.reject();
				});
				return deferred.promise;
			}		
			function register(username, password, fname, sname,cell,tech,admin) {
				var deferred = $q.defer();
				$http.post('/api/register',{username:username,password:password,fname:fname,sname:sname,cell:cell,tech:tech,admin:admin})
				.success(function(data,status) {
					if (status ===200 && data.status) {
						user = true;
						deferred.resolve();
					} else {
						user = false;
						deferred.reject();
					}
				})
				.error(function (data) {
					user = false;
					deferred.reject();
				});
				return deferred.promise;
			}

	}]);

