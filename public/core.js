 angular.module('scotchApp', ['ngRoute','ngFileUpload'])

  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/', {
                 templateUrl: 'raceentry.html',
                 controller: 'RaceEntryController',
                 data: {activeTab: 'raceentry'}
         })

        .when('/shop', {
         templateUrl: 'shop.html',
         controller: 'ShopController',
         data: {activeTab: 'shop'}
        })
        .when('/raceentry', {
                 templateUrl: 'raceentry.html',
                 controller: 'RaceEntryController',
                 data: {activeTab: 'raceentry'}
         })

         .when('/member', {
         templateUrl: 'member.html',
         controller: 'MemberController',
         access: {restricted: true},
         data: {activeTab: 'member'}
        })
        .when('/memberprofile', {
         templateUrl: 'memberprofile.html',
         controller: 'MemberProfileController',
         access: {restricted: true},
         data: {activeTab: 'memberprofile'}
        })
        .when('/membermain', {
         templateUrl: 'membermain.html',
         controller: 'MemberMainController',
         access: {restricted: true},
         data: {activeTab: 'membermain'}
        })

        .when('/register', {
         templateUrl: 'register.html',
         controller: 'RegisterController',
         access: {restricted: false},
         data: {activeTab: 'register'}
        })
        .when('/admin', {
         templateUrl: 'admin.html',
         controller: 'AdminController',
         access: {restricted: true},
         data: {activeTab: 'admin'}
        })
        .otherwise({
          redirectTo: '/'
        });
    }])
    .run(run);


	
	function run($rootScope,$location, $route, AuthService, SessionService) {
		
		$rootScope.$on('$routeChangeStart', function(event, next, current) {

            $rootScope.activeTab  = 'raceentry';
            $location.path('/raceentry');


				});
	
	};
	
	

		
		
		

	$(function($scope) {
	
			console.log('In $ function:' + $scope);

	
	});





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
	 

    

    
	 	
       
    
    
    $scope.filter = 'none';    
    


    $scope.showUpload = function(){

		alert($scope.patients);
		
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Member Main Controller ///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



angular.module('scotchApp')
	.controller('MemberMainController',function($scope, $http, $document, $window, SessionService) {
			var old_index = -10;
			$scope.thecolor = "green"
			$scope.bodyText = "";
			$scope.showModal1 = false;
			$scope.showModal2 = false;
			
			console.log(SessionService.get("userID"));
			
			$scope.hide = function(m){
				if(m === 1){
					$scope.showModal1 = false;
				}else{
					$scope.showModal2 = false;
				}
			}

			$scope.getRealTime = function (duration) {
				if ( typeof duration != 'undefined' && duration != null) {
				  var milliseconds = parseInt((duration % 1000) / 100),
					seconds = Math.floor((duration / 1000) % 60),
					minutes = Math.floor((duration / (1000 * 60)) % 60),
					hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

				  hours = (hours < 10) ? "0" + hours : hours;
				  minutes = (minutes < 10) ? "0" + minutes : minutes;
				  seconds = (seconds < 10) ? "0" + seconds : seconds;

				  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
			  } else {
				  return "";
			  }
			};
			
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
	



 



		 $http.get('/api/memberprofile/' + SessionService.get("userID").replace(/['"]+/g, ''))
  		.success(function(data) {

				console.log("Inside this fucker");


            	$scope.memberDetails = data;
				$scope.originalDetails = data;
				console.log(data);
				if (data.length == 0) {
					$scope.no_bookings = true
				} else {
					$scope.no_bookings = false
				}

				old_index = index;
				
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	 	
	


    
    

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
	$scope.showTime = function(theTime) {
	
		//console.log("theTime: " + theTime);
	
		if (typeof theTime != 'undefined' & theTime != null) {
			//console.log(theTime);
			finalTime = theTime.slice(-13,-5);
			//finalTime2 = finalTime.slice();
			
			if (finalTime.slice(0,-6) > 5) {
				
				finalTime = "00:" + finalTime.slice(-6);
			}
				
				;
			
			return finalTime
		} else {
			return "Undefined";
		}
			
			
	};


});	 




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Race Entry Controller ///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



angular.module('scotchApp')
	.controller('RaceEntryController',function($scope, $http, SessionService) {
			var old_index = -10;
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

			$scope.getRealTime = function (duration) {
				if ( typeof duration != 'undefined' && duration != null) {
				  var milliseconds = parseInt((duration % 1000) / 100),
					seconds = Math.floor((duration / 1000) % 60),
					minutes = Math.floor((duration / (1000 * 60)) % 60),
					hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

				  hours = (hours < 10) ? "0" + hours : hours;
				  minutes = (minutes < 10) ? "0" + minutes : minutes;
				  seconds = (seconds < 10) ? "0" + seconds : seconds;

				  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
			  } else {
				  return "";
			  }
			};

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








		 $http.get('/api/raceentry')
  		.success(function(data) {
					console.log("Shop Controller Scope: " + $scope.user);
			        console.log("Loading shop");


                    $scope.products = data;
                    $scope.originalProducts = data;
                    console.log(data);



			})
			.error(function(data) {
				console.log('Error: ' + data);
			});


	$scope.payAmount2 = function() {
	      var sdk = new window.YocoSDK({
            publicKey: 'pk_live_602f96d2JvWWGPl576e4'
          });

          // Create a new dropin form instance
          var inline = sdk.inline({
            layout: 'Basid',
            amountInCents: 2499,
            currency: 'ZAR'
          });
          // this ID matches the id of the element we created earlier.
          inline.mount('#card-frame');
    }


	$scope.payAmount = function() {
			var yoco = new window.YocoSDK({
			publicKey: 'pk_live_602f96d2JvWWGPl576e4'
		//	publicKey: 'pk_test_71d06dd3JvWWGPl518d4'
        			  });
				yoco.showPopup({
				  amountInCents: 299,
				  currency: 'ZAR',
				  name: 'Melkbos Athletic Club Store',
				  description: 'Test transaction - Gawie',
				  callback: function (result) {
					// This function returns a token that your server can use to capture a payment
					if (result.error) {
					  const errorMessage = result.error.message;
					  alert("error occured: " + errorMessage);
					} else {

					  alert("card successfully tokenised: " + result.id);


                     $http.post('/api/payshop', {token:result.id})
                                .success(function(data) {
                                    console.log(data);

                                })
                                .error(function(data) {
                                    console.log('Error: ' + data);
                                });



					}
					// In a real integration - you would now pass this chargeToken back to your
					// server along with the order/basket that the customer has purchased.
				  }
				})


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



});




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Member Controller ////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


 angular.module('scotchApp')
 .controller('MemberController',function($scope, $http, $window) {
	
	


	   
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
			$scope.formData.pt_ID	= $scope.members[index].pt_ID;
			$scope.memberName	= $scope.members[index].pt_title + ' ' + $scope.members[index].pt_fname + ' ' + $scope.members[index].pt_sname;
			$scope.Results		= results;

		} else if (m===2) {
			$scope.showModal2 = true;
			$scope.formData.pt_ID	= $scope.members[index].pt_ID;
			$scope.memberName	= $scope.members[index].pt_title + ' ' + $scope.members[index].pt_fname + ' ' + $scope.members[index].pt_sname;
			$scope.Results		= results;
		} else if (m===3) {
			$scope.showModal3 = true;
			$scope.formData.mb_ID	= $scope.members[index].mb_ID;
			$scope.memberName	= $scope.members[index].mb_title + ' ' + $scope.members[index].mb_fname + ' ' + $scope.members[index].mb_sname;
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
      $scope.members[index].edit = !$scope.members[index].edit;
      
      console.log("Index: " + index);
    };
    

    
     $scope.getRealIndex = function(member){
		 console.log(member);
		var mbIndex = $scope.members.indexOf(member);
		return mbIndex
     };  
      
      $scope.getID = function(tech){
		tech2 = JSON.parse(tech);
		$scope.formData.pt_tech_id = tech2.tech_id;
		return ptIndex
     };  

 
 
    $scope.filterByName = function(name){
      $scope.resetMembers();
      $scope.members = $scope.members.filter(function(member){
        return member.name === name;
      });
      $scope.filter = 'Name: ' + name;
    };
    
    //------------------------------------------------------
	$http.get('/api/member')
        .success(function(data) {
            $scope.members = data;
            $scope.originalMembers = data;
            console.log('Members: ' + JSON.stringify(data, null, 2));
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
        
	$http.get('/api/medaidscheme')
			.success(function(data) {
				$scope.medaids = data;
				console.log(JSON.stringify($scope.medaids, null, 2));
				
			})
			.error(function(data) {
				console.log('Error: ' +  JSON.stringify(data, null, 2));
		});
	
	$scope.getPlan = function(scheme){
		console.log("Getting medical aid plans for " + scheme);
		$http.get('/api/medaidplan/' + scheme)
				.success(function(data) {
					$scope.plans = data;
					console.log(JSON.stringify($scope.plans, null, 2));
					
				})
				.error(function(data) {
					console.log('Error: ' +  JSON.stringify(data, null, 2));
			});
	
	};
    

  
     $http.get('/api/service')
        .success(function(data) {
            $scope.services = data;
            $scope.originalServices= data;
            console.log('Services: ' + JSON.stringify(data, null, 2));

            
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
        }); 
        
       $http.get('/api/tech')
        .success(function(data) {
            $scope.techs = data;
            $scope.originalTechs= data;
            console.log('Techs: ' + JSON.stringify(data, null, 2));

            
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
        }); 
    
    // when submitting the add form, send the text to the node API
    $scope.createMember = function() {
		if (isNaN($scope.formData.mb_ID)) {
			alert('Please enter a numeric value for ID only');
		} else {
			$http.post('/api/member', $scope.formData)
				.success(function(data) {
					$scope.formData = {}; // clear the form so our user is ready to enter another
					$scope.members = data;
					$scope.originalMembers = data;
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
			console.log($scope.formData);
			$http.post('/api/memberdetail', $scope.formData)
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
    $scope.deleteMember = function(id) {
		    deleteMember = $window.confirm("Are you sure you want to delete this Member");
			if(deleteMember){
				$http.delete('/api/member/' + id)
					.success(function(data) {
						$scope.members = data;
						 
						console.log(data);
					})
					.error(function(data) {
						console.log('Error: ' + data);
					});
			}
    };

    // update a member detail after checking it
    $scope.updateMember = function(index) {
		
        $http.put('/api/member/'  + encodeURIComponent($scope.members[index].mb_ID) + 
        "/" + encodeURIComponent($scope.members[index].mb_fname) + 
        "/" + encodeURIComponent($scope.members[index].mb_sname) +
        "/" + encodeURIComponent($scope.members[index].mb_email) +
        "/" + encodeURIComponent($scope.members[index].mb_ASA) +
        "/" + encodeURIComponent($scope.members[index].mb_5kmAvg) + 
        "/" + encodeURIComponent($scope.members[index].mb_tag) 
        
        )
            .success(function(data) {
				 $scope.members = data;
                 $scope.originalMembers = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
	$scope.showTime = function(theTime) {
	
	//	console.log("theTime: " + theTime);
	
		if (typeof theTime != 'undefined' & theTime != null) {
			//console.log(theTime);
			finalTime = theTime.slice(-13,-5);
			//finalTime2 = finalTime.slice();
			
			if (finalTime.slice(0,-6) > 5) {
				
				finalTime = "00:" + finalTime.slice(-6);
			}
				
				;
			
			return finalTime
		} else {
			return "Undefined";
		}
			
			
	};

});


///////////////
///////////////
//////////////

 angular.module('scotchApp')
 .service('SessionService', function($window) {
	 var service = this;
	 var sessionStorage = $window.sessionStorage;
	 

	 
	 service.get = function(key) {
		 return sessionStorage.getItem(key);
	 };
	 
	 service.set = function(key, value) {
		 sessionStorage.setItem(key, value);
	 };
	 
	 service.unset = function(key) {
		 sessionStorage.removeItem(key);
	 };
 });
 




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// MemberProfile Controller ////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


 angular.module('scotchApp')
 .controller('MemberProfileController', function($scope, $http, $window, $rootScope, $location, $route, SessionService) {
	
	


	console.log("MemberProfileController");
	//console.log("rootScope: "+ $rootScope);
	 var picker2;
	$scope.formData = {};
	//$scope.formData.ID = "";
    $scope.formData.Pt_date = new Date();
   
    if (typeof $scope.user != 'undefined' & $scope.user != null) {
		$scope.formData.ID = $scope.user.ID;
	}
	
    $scope.formData.end_date = new Date();
	$scope.formData.pt_appt_time = new Date();
    $scope.showModal3 = false;
	$scope.bookings = [];
	//console.log("SessionService.get(userID)" + SessionService.get("userID"));
       
	
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

	 if (m===3) {
			$scope.showModal3 = true;
			$scope.formData.mb_ID	= $scope.members[index].mb_ID;
			$scope.memberName	= $scope.members[index].mb_title + ' ' + $scope.members[index].mb_fname + ' ' + $scope.members[index].mb_sname;
			$scope.Results		= results;
		}
		
		
	}
	
			
	$scope.reload = function() {
			$location.path('/memberprofile');	
			$route.reload();
	
	};	   
   
    
    $scope.toggleEdit = function(index){
      $scope.members[index].edit = !$scope.members[index].edit;
      
      console.log("Index: " + index);
    };
    

    //------------------------------------------------------
	$http.get('/api/memberprofile/' + SessionService.get("userID").replace(/['"]+/g, ''))
        .success(function(data) {
			$scope.formData.mb_ID = data.mb_ID;
			SessionService.set("memberInfo", data);
            $scope.members = data
            $scope.originalMembers = data;
      //      console.log('Members: ' + JSON.stringify(data, null, 2));
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
        
        
 
    
    // when submitting the add form, send the text to the node API
    $scope.createMember = function() {
		if (isNaN($scope.formData.mb_ID)) {
			alert('Please enter a numeric value for ID only');
		} else {
			$http.post('/api/member', $scope.formData)
				.success(function(data) {
					$scope.formData = {}; // clear the form so our user is ready to enter another
					$scope.members = data;
					$scope.originalMembers = data;
		//			console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		}
    };
    

 

 


 
    
    
            // when submitting the add form, send the text to the node API
    $scope.createDetails = function() {
			console.log($scope.formData);
			$http.post('/api/memberdetail', $scope.formData)
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

    // update a member detail after checking it
    $scope.updateMember = function() {
		
        $http.put('/api/memberprofile/'  + encodeURIComponent($scope.members.mb_ID) + 
        "/" + encodeURIComponent($scope.members.mb_fname) + 
        "/" + encodeURIComponent($scope.members.mb_sname) +
        "/" + encodeURIComponent($scope.members.mb_email) +
        "/" + encodeURIComponent($scope.members.mb_ASA) +
        "/" + encodeURIComponent($scope.members.mb_5kmAvg) + 
        "/" + encodeURIComponent($scope.members.mb_tag)  + 
        "/" + encodeURIComponent($scope.members.mb_title) + 
        "/" + encodeURIComponent($scope.members.mb_address) + 
        "/" + encodeURIComponent($scope.members.mb_telnum) 
        
        )
            .success(function(data) {
				 $scope.members = data;
                 $scope.originalMembers = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
	$scope.showTime = function(theTime) {
	
	//	console.log("theTime: " + theTime);
	
		if (typeof theTime != 'undefined' & theTime != null) {
			//console.log(theTime);
			finalTime = theTime.slice(-13,-5);
			//finalTime2 = finalTime.slice();
			
			if (finalTime.slice(0,-6) > 5) {
				
				finalTime = "00:" + finalTime.slice(-6);
			}
				
				;
			
			return finalTime
		} else {
			return "Undefined";
		}
			
			
	};

});


 angular.module('scotchApp').directive('modal', function(){
        return {
            template: '<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content" ng-transclude><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">Modal title</h4></div></div></div></div>', 
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

 angular.module('scotchApp').directive('date', function(dateFilter) {
                    return {
                        require: 'ngModel',
                        link: function(scope, elm, attrs, ctrl) {
                            var dateFormat = attrs['date'] || 'hh:mm:ss';
                            ctrl.$formatters.unshift(function(modelValue) {
                                return dateFilter(modelValue, dateFormat);
                            });
                        }
                    };
                });

  angular.module('scotchApp')
 .controller('RegisterController',function($scope, $http, $location, AuthService, SessionService) {

			
			$scope.register = function() {
				console.log("Inside RegisterController");
				console.log(JSON.stringify($scope.locals, null, 2));
				$scope.error = false;
				$scope.disabled = true;
				AuthService.register($scope.locals.username,$scope.locals.ID,$scope.locals.password)
				.then(function() {
					$location.path('/login');
					$scope.disabled = false;
					$scope.loginForm = {};
					console.log("SessionService: " + SessionService.get("regFeedback"));
				
					$scope.feedback = SessionService.get("regFeedback");					
				})
				.catch(function() {
					$scope.error = true;
					$scope.errorMessage = 'Something went wrong!';
					$scope.disabled = false;
					$scope.loginForm = {};
					console.log("SessionService: " + SessionService.get("regFeedback"));
				
					$scope.feedback = SessionService.get("regFeedback");				
					
				});
				
			}


	});
	



  angular
    .module('scotchApp')
    .factory('AuthService', function($q, $timeout, $http, $rootScope, SessionService) {

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
                console.log("sname: ***"  + SessionService.get("sname") + "***");
                if (SessionService.get("sname") != null) {
                        user = true;
                } else
                {
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
					deferred.resolve(user_name);
				});

				return deferred.promise;
			}

			function login(username, password) {
				var deferred = $q.defer();
				$http.post('/api/login',{username:username,password:password})
				.success(function(data,status) {
                    //console.log("data user: " + JSON.stringify(data.user, null, 2));
				    SessionService.set("userData", JSON.stringify(data.user, null, 2));
					SessionService.set("admin", JSON.stringify(data.user.admin, null, 2));
					SessionService.set("userID", JSON.stringify(data.user.ID, null, 2));
					SessionService.set("mbTag", JSON.stringify(data.user.mb_tag, null, 2));
					SessionService.set("fname", JSON.stringify(data.user.fname, null, 2));
                	SessionService.set("sname", JSON.stringify(data.user.sname, null, 2));
                    if (status ===200 && data.status) {
                        console.log("User: " + SessionService.get("fname")  + " logged in.");
						user = true;
						deferred.resolve();
						SessionService.set("regFeedback", data.status);
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
			function logout() {
				var deferred = $q.defer();
				$http.get('/api/logout')
				.success(function(data) {
						user = false;
						$rootScope.loggedin_user = '';
						SessionService.unset("userID");
						SessionService.unset("admin");
						SessionService.unset("mbTag");
						SessionService.unset("regFeedback");
						deferred.resolve();
				})
				.error(function (data) {
					user = false;
					deferred.reject();
				});
				return deferred.promise;
			}
			function register(username, ID, password) {
				console.log("Inside AuthService")
				var deferred = $q.defer();
				$http.post('/api/memberregister',{username:username,ID:ID,password:password})
				.success(function(data,status) {


					if (status ===200 && data.status) {
						user = true;
						console.log('User registered and logged in');
						SessionService.set("regFeedback", "User registered. Please log in.");
						deferred.resolve();
					} else {
						user = false;
						console.log('Error in registration process');
						SessionService.set("regFeedback", "Error in registration process");
						deferred.reject();
					}
				})
				.error(function (data) {
					feedback = JSON.stringify(data, null, 2);
					SessionService.set("regFeedback", feedback);
					console.log("SessionService: " + SessionService.get("regFeedback"));

					user = false;
					deferred.reject();
				});
				return deferred.promise;
			}





	});

