 angular.module('scotchApp', ['ngRoute','ngFileUpload'])

  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/', {
         templateUrl: 'login.html',
         controller: 'LoginController',
         access: {restricted: false},
         data: {activeTab: 'login'}
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
        .when('/shop', {
         templateUrl: 'shop.html',
         controller: 'ShopController',
         access: {restricted: true},
         data: {activeTab: 'shop'}
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
        .when('/memberhistory', {
         templateUrl: 'memberhistory.html',
         controller: 'MemberHistoryController',
         access: {restricted: true},
         data: {activeTab: 'memberhistory'}
        })
        .when('/memberdocuments', {
         templateUrl: 'memberdocuments.html',
         controller: 'MemberDocumentsController',
         access: {restricted: true},
         data: {activeTab: 'memberdocuments'}
        })
        .when('/memberphotos', {
         templateUrl: 'memberphotos.html',
         controller: 'MemberPhotosController',
         access: {restricted: true},
         data: {activeTab: 'memberphotos'}
        })
        .when('/poll', {
         templateUrl: 'poll.html',
         controller: 'PollController',
         access: {restricted: true},
         data: {activeTab: 'poll'}
        })
        .when('/question', {
         templateUrl: 'questions.html',
         controller: 'QuestionController',
         access: {restricted: true},
         data: {activeTab: 'question'}
        })
        .when('/answer', {
         templateUrl: 'answer.html',
         controller: 'AnswerController',
         access: {restricted: false},
         data: {activeTab: 'answer'}
        })
        .when('/pollresult', {
         templateUrl: 'pollresult.html',
         controller: 'PollResultController',
         access: {restricted: false},
         data: {activeTab: 'pollResult'}
        })
        .when('/gpio', {
         templateUrl: 'gpio.html',
         controller: 'GPIOController',
         access: {restricted: true},
         data: {activeTab: 'gpio'}
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
         .when('/race', {
         templateUrl: 'race.html',
         controller: 'RaceController',
         access: {restricted: true},
         data: {activeTab: 'race'}
        })
        .when('/time', {
         templateUrl: 'time.html',
         controller: 'TimeController',
         access: {restricted: true},
         data: {activeTab: 'time'}
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
        .when('/tech', {
         templateUrl: 'tech.html',
         controller: 'TechController',
         access: {restricted: true},
         data: {activeTab: 'tech'}
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
        .when('/MFI', {
         templateUrl: 'mfi.html',
         controller: 'MFIController',
         access: {restricted: true},
         data: {activeTab: 'MFI'}
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


	
	function run($rootScope,$location, $route, AuthService, SessionService) {
		
		$rootScope.$on('$routeChangeStart', function(event, next, current) {
			console.log(next);
			AuthService.getUserStatus()
			.then(function() {

				if ( typeof next.data === 'undefined' && SessionService.get("userData").fname === "")
				{
				    console.log("Inside this fucker 1");
					$rootScope.activeTab  = 'login';
					next.access = 'restricted';
				} else {

				   if (typeof next.data  != 'undefined') {
					    $rootScope.activeTab = next.data.activeTab;
					} else {
				        $rootScope.activeTab = "membermain";
					}
				}
				if(next.access.restricted && AuthService.isLoggedIn() === false) {
				    console.log("Inside this fucker 2");
                	$location.path('/login');
					$route.reload();
				} else {
					if (AuthService.isLoggedIn() === false) {
						$rootScope.loggedin_user = '';
					} else {
						AuthService.getUserName().then(function(data){
							console.log("Controller - " + JSON.stringify(data, null, 2) + " - ");
							$rootScope.loggedin_user = SessionService.get("userData").fname;
							$rootScope.ID = SessionService.get("userData").ID;
							$rootScope.user =SessionService.get("userData");
							$rootScope.timing = false;
							$rootScope.API_mb_ID = SessionService.get("userData").ID;
						
							$rootScope.isMobile = JSON.stringify(data.md, null, 2);
							if ($rootScope.isMobile > 0 ) {
									$location.path('/mobile');	
								//	$route.reload();

							}
						});
					}
				}
			})
            .catch(function() {
                console.log("Fuck it all");

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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Main Controller ///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


   angular.module('scotchApp')
	.controller('MainController', function($scope, $rootScope, $http, $window, SessionService) {
		

	
			$scope.formData = {};	
			var testDate = '';
			var calObj = '';
			$scope.pt_appt_status = '';
			$scope.no_bookings = true;
			$scope.pt_appt_status = '';
			$scope.statusSelect = '';
			$scope.pt_appt_status = '';
			
			$('#datepicker').datepicker({format:'dd MM yyyy'},'show');
			
			
			$('#datepicker').on('changeDate', function() {
			//	console.log('Changing Date: ' + $scope.practice_return);
				calObj = $('#datepicker').datepicker('getFormattedDate');
				console.log('Calendar Object: ' + calObj);
	
					
					$scope.findPatientsPerPractice($scope.practice_return);
					$('#datepicker').datepicker('hide');


			});
			
		
			$scope.getRealIndex = function(races){
				var ptIndex = $scope.race.indexOf(races);
				console.log("Real Index for race: " + ptIndex);
				return ptIndex
			};  
			
			$scope.getRealTime = function (duration) {
				  var milliseconds = parseInt((duration % 1000) / 100),
					seconds = Math.floor((duration / 1000) % 60),
					minutes = Math.floor((duration / (1000 * 60)) % 60),
					hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

				  hours = (hours < 10) ? "0" + hours : hours;
				  minutes = (minutes < 10) ? "0" + minutes : minutes;
				  seconds = (seconds < 10) ? "0" + seconds : seconds;

				  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
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
											$scope.race= data;
											$scope.originalRace= data;
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
											$scope.race= data;
											$scope.originalRace= data;
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
						}
			}
		

			


    
			$scope.thecolor = "green"
			$scope.bodyText = "";
			$scope.showModal1 = false;
			$scope.showModal2 = false;
			$scope.showModal3 = false;
			
			$scope.practice_return = "All";
			$scope.ptID = '';
			$scope.ptApptDate = '';

			
			$scope.hide = function(m){
				if(m === 1){
					$scope.formData = {};
					$scope.showModal1 = false;
				}
				
				if (m === 2) {
					$scope.formData = {};
					$scope.showModal2 = false;
					
				}
				if(m === 3){
					$scope.formData = {};
					$scope.showModal3 = false;
				}
				
				
			}


	$scope.openRaceTime = function(m, results) {

				SessionService.set("races", JSON.stringify($scope.race));		
		
				SessionService.set("racesSelect", JSON.stringify($scope.formData.race_select));		
				console.log("openRacetime SessionService.get(racesSelect): "  + SessionService.get("racesSelect"));				
				console.log("openRacetime SessionService.get(races): "  + SessionService.get("races"));				
				//window.open("#/time","_blank","fullscreen=yes,titlebar=no,menubar=no,location=no,toolbar=no");
					window.open("#/time","_blank",);			
          
		}
			
	$scope.showM = function(m, results){

		if(m === 1){
			console.log($scope);
			$scope.showModal1 	= true;
			$scope.Results		= results;
			racesStart = "";
			var racesStart = new Array();
			for ( var i in $scope.formData.race_select) {
				if ($scope.formData.race_select[i]) {
					
					console.log($scope.race[i]._id.race_date);
					racesStart.push({
						"race_date" : $scope.race[i]._id.race_date,
						"race_distance" : $scope.race[i]._id.race_distance,
						"race_id" : $scope.race[i]._id.race_id,
						
					});	
					
					
				}
			
			}
			$scope.racesToStart = racesStart
			$scope.showTimer();
			$scope.showSSTimer();
			$scope.formData.race_finisher = "";

			
		} else if (m===2) {
			$scope.showModal2 = true;
			console.log("Inside Modal2 : " + $scope);
			$scope.Results		= results;
			racesStart = "";
			var racesStart = new Array();
			for ( var i in $scope.formData.race_select) {
				if ($scope.formData.race_select[i]) {
					
					console.log($scope.race[i]._id.race_date);
					racesStart.push({
						"race_date" : $scope.race[i]._id.race_date,
						"race_distance" : $scope.race[i]._id.race_distance,
						"race_id" : $scope.race[i]._id.race_id,
						
					});	
					
					
				}
			
			}
			$scope.racesToStart = racesStart
			$scope.showSSTimer();
		} 
		
		
	}
			
			$scope.modalOneShown = function(){
				console.log('modal one shown');
			}
			
			$scope.modalOneHide = function(){
				console.log('modal one hidden');
			} 
			$scope.modalTwoShown = function(){
				console.log('modal two shown');
			}
			
			$scope.modalTwoHide = function(){
				console.log('modal two hidden');
			} 
	 
	 
	 	// when landing on the page, get all resources and show them
    $http.get('/api/main')
        .success(function(data) {
			      $scope.findPatientsPerPractice($scope.practice_return);
			
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
    });
    
		  	
   
       

    
    $scope.showTimer = function() {
		var x = 6;
		sound.muted = false;
		  $scope.intervalTimer = setInterval(() => {
			
			x--; 
			$("#feedback1").html(x);


			//new Audio('mp3/audio.mp3').play() );
			if (x == 0) {
				clearInterval($scope.intervalTimer);
				$("#feedback1").html("Go! Go! Go!");
				$scope.UpdateRace();
				
  
			};

			
			
		  }, 1000);
		  
			
		
		
	};
	
	
		function secondsToHms(d) {
			d = Number(d);
			var h = Math.floor(d / 3600);
			var m = Math.floor(d % 3600 / 60);
			var s = Math.floor(d % 3600 % 60);

			hString = h + "";
			mString = m + "";
			sString = s + "";
	
			if (hString.length == 1) {h = "0" + h};
			if (mString.length == 1) {m = "0" + m};
			if (sString.length == 1) {s = "0" + s};
			
			return h + ":" + m + ":" + s; 
		}

	$scope.showSSTimer = function() {
		let date_ob = new Date();

		// current date
		// adjust 0 before single digit date
		
		let hours = date_ob.getHours();
		let minutes = date_ob.getMinutes();
		let seconds = date_ob.getSeconds();	
						if (hours.length == 1) {hours = "0" + hours};
						if (minutes.length == 1) {minutes = "0" + minutes};
						if (seconds.length == 1) {seconds = "0" + seconds};	
		
		var SSTime  = hours + ":" + minutes + ":" + seconds;
		
		var x = 6;
		var y = -6;
		var sound = document.getElementById("audio");
		//sound.muted = false;
		  $scope.intervalTimer2 = setInterval(() => {
			
			x--; 
			y++;
			if (y >= 0) {
				date_ob = new Date();
				hours = date_ob.getHours() + "";
				minutes = date_ob.getMinutes() + "";
				seconds = date_ob.getSeconds() + "";
						if (hours.length == 1) {hours = "0" + hours};
						if (minutes.length == 1) {minutes = "0" + minutes};
						if (seconds.length == 1) {seconds = "0" + seconds};	
	
				SSTime  = hours + ":" + minutes + ":" + seconds;
				
				$("#feedback2").html(secondsToHms(y));
				$("#feedbackTime").html(SSTime);
				
			} else {
				date_ob = new Date();	
				hours = date_ob.getHours() + "";
				minutes = date_ob.getMinutes() + "";
				seconds = date_ob.getSeconds() + "";
						if (hours.length == 1) {hours = "0" + hours};
						if (minutes.length == 1) {minutes = "0" + minutes};
						if (seconds.length == 1) {seconds = "0" + seconds};	
	
				
				SSTime  = hours + ":" + minutes + ":" + seconds;
				$("#feedback2").html(x);
				$("#feedbackTime").html(SSTime);
			}

			//new Audio('mp3/audio.mp3').play() );
			if (x == 0) {
				date_ob = new Date();
				hours = date_ob.getHours() + "";
				minutes = date_ob.getMinutes() + "";
				seconds = date_ob.getSeconds() + "";
						if (hours.length == 1) {hours = "0" + hours};
						if (minutes.length == 1) {minutes = "0" + minutes};
						if (seconds.length == 1) {seconds = "0" + seconds};	
	
				SSTime  = hours + ":" + minutes + ":" + seconds;
				//clearInterval($scope.intervalTimer);
				$("#feedback2").html(secondsToHms(y));
				$("#feedbackTime").html(SSTime);
			
				$scope.UpdateRace();
			
				
  
			};

			
			
		  }, 1000);
		  
		 
		  
			
		
		
	};
	
	$scope.UpdateRace = function() {
		var dateObj = new Date();
	      
		console.log($scope.racesToStart);
		console.log(dateObj);
		
		for ( var i in $scope.racesToStart) {
			 $http.put('/api/athlete/' + $scope.racesToStart[i].race_id)
            .success(function(data) {
				$scope.race = data;
				$scope.originalRace = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });  
				

				
				
			}
		
		

             
      
           
    };
    
  
          // delete a resource after checking it
    $scope.findPatientsPerPractice = function(practice) {

		$scope.practice_return = practice;
		console.log('Calendar: *' + calObj +'* and practice: ' + practice);
	
	
		if (practice == 'All' && calObj == '') {
			console.log("if (practice == 'All' && calObj == '')");
			var dateObj = new Date();
			var sYear = dateObj.getUTCFullYear();
			var sMonth = dateObj.getUTCMonth();
			var sDay = '';
			var sDay = dateObj.getDate() + '';
			$('#datepicker').datepicker('setDate',dateObj);
			$http.get('/api/main/' + sYear + '/' + sMonth + '/' + sDay)
					.success(function(data) {
						$scope.race= data;
						$scope.originalRace= data;
						console.log(data.length);
						console.log("Line 699: " + data);
						
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
    
    $scope.updateAthlete = function() {
		console.log($scope.formData.race_finisher);
		
		 $http.put('/api/athleteFinish/' +$scope.formData.race_finisher + "/" + $scope.formData.race_finisher)
            .success(function(data) {
				$scope.race = data;
                $scope.originalRace = data;
                console.log(data);
                $scope.findPatientsPerPractice($scope.practice_return);
                $scope.formData.race_finisher = "";
               // var race_finish = $window.document.getElementById('race_finish');
               // race_finish.focus();

     
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
           
    };
    
    $scope.updateStaggeredAthlete = function() {
		console.log($scope.formData.race_finisher);
		
		 $http.post('/api/createStaggeredAthlete/' +$scope.formData.race_finisher + "/" + $scope.formData.race_finisher)
            .success(function(data) {
				$scope.race = data;
                $scope.originalRace = data;
                console.log(data);
                $scope.findPatientsPerPractice($scope.practice_return);
                $scope.formData.race_finisher = "";
               // var race_finish = $window.document.getElementById('race_finish');
               // race_finish.focus();

     
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
           
    };
    
    $scope.filter = 'none';    
    
    $scope.toggleEdit = function(index){
		$scope.race[index].edit = !$scope.race[index].edit;
    };

    $scope.showRace = function(index){
		$scope.race[index].race_id = !$scope.race[index].race_id;
		console.log("Getting details for race_id: " + $scope.race[index]._id.race_id);
		$http.get('/api/raceDetails/' + $scope.race[index]._id.race_id)
			.success(function(data) {
				$scope.raceDetails = data;
				$scope.originalDetails = data;
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Time Controller ///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


   angular.module('scotchApp')
	.controller('TimeController', function($scope, $rootScope, $http, $window,SessionService) {
		
			
			var sound = document.getElementById("audio");
			
			$scope.formData = {};	
			var testDate = '';
			var calObj = '';
			$scope.pt_appt_status = '';
			$scope.no_bookings = true;
			$scope.pt_appt_status = '';
			$scope.statusSelect = '';
			var FinisherTime = 0;
			$scope.finisherTime = 0;
			$scope.thecolor = "green"
			$scope.bodyText = "";
			$scope.practice_return = "All";
			$scope.ptID = '';
			$scope.ptApptDate = '';			

			
		
			$scope.getRealIndex = function(races){
				var ptIndex = $scope.race.indexOf(races);
				console.log("Real Index for race: " + ptIndex);
				return ptIndex
			};  
			
			$scope.getRealTime = function (duration) {
				  var milliseconds = parseInt((duration % 1000) / 100),
					seconds = Math.floor((duration / 1000) % 60),
					minutes = Math.floor((duration / (1000 * 60)) % 60),
					hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

				  hours = (hours < 10) ? "0" + hours : hours;
				  minutes = (minutes < 10) ? "0" + minutes : minutes;
				  seconds = (seconds < 10) ? "0" + seconds : seconds;

				  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
			};

    $http.get('/api/time')
        .success(function(data) {
			
					$("#feedbackFinisher").html("  ");
					$("#feedbackFinisherTime").html("  ");
					$rootScope.timing = true;
					console.log("Resolved data: " + JSON.stringify(data, null, 2));	
					
					const firstTime = formatTime(data.time);
					console.log(firstTime);
					
					const date2 = new Date();
					console.log(date2);
					
					const dateDiff =  Math.abs(date2 - firstTime);
					console.log(dateDiff);
					$scope.showTimer(firstTime);
					$scope.formData.race_finisher = "";
	
					SessionService.set("racesRunning",JSON.stringify(data));
					
			
        })
        .error(function(data) {
            console.log('Error: ' + data);
    });


		function getMonth(strMonth) {
			switch ( strMonth )
			{
			  case "Mar" : return 3;
			  case "Apr" : return 4;
			  	
			}
			
			
		}   
	
		function formatTime(theTime) {
			
			const str = theTime;

					const [dayValues, dateValues, timeValues] = str.split(' ');
					console.log(dayValues); 
					console.log(dateValues); 
					console.log(timeValues); 

					const [day, month, year] = dateValues.split('-');
					const [hours, minutes, seconds] = timeValues.split(':');
					console.log("timeValues: " + timeValues);
					const [sseconds, mseconds] = seconds.split('.');
					console.log("seconds: " +seconds);	
					const date1 = new Date(+(parseInt(year)+2000), +getMonth(month) - 1, +day, +(parseInt(hours)+2),minutes, +sseconds,+mseconds);
					
			return date1

		}
		
	
		function secondsToHms(d) {
			d = Number(d);
			var h = Math.floor(d / 3600);
			var m = Math.floor(d % 3600 / 60);
			var s = Math.floor(d % 3600 % 60);

			hString = h + "";
			mString = m + "";
			sString = s + "";
	
			if (hString.length == 1) {h = "0" + h};
			if (mString.length == 1) {m = "0" + m};
			if (sString.length == 1) {s = "0" + s};
			
			return h + ":" + m + ":" + s; 
		}

	$scope.showTimer = async function(sleeptime) {

		const date_obj1 = Date.now();
		console.log(date_obj1);
		const date3 = new Date();
		console.log(date3);
		const dateDiff =  Math.abs(date3 - sleeptime);
		console.log(dateDiff);
		await sleep(parseInt(dateDiff) + 5000);
		const date_obj2 = Date.now();
		console.log(date_obj2);
		
		function sleep(ms) {
		  return new Promise((resolve) => {
			setTimeout(resolve, ms);
		  });
		}
				
		let date_ob = new Date();
		let hours = date_ob.getHours();
		let minutes = date_ob.getMinutes();
		let seconds = date_ob.getSeconds();	
		if (hours.length == 1) {hours = "0" + hours};
		if (minutes.length == 1) {minutes = "0" + minutes};
		if (seconds.length == 1) {seconds = "0" + seconds};	
		var SSTime  = hours + ":" + minutes + ":" + seconds;
		
		x = -1;
		y = 0;
		if (SessionService.get("racesSelect") === "undefined") {
				x = -4;
				console.log("if dateobj : " + date_ob);
				var date_ob2 = new Date(JSON.parse(SessionService.get("races"))[0]._id.race_start);
				console.log("if dateobj2 : " + date_ob2);
				datediff = (date_ob - date_ob2)/1000;
				console.log("if datediff : " + datediff);
				y = datediff;
			} else {
				x = 3;
				y = -3;
				sound.muted = false;
				
		}
		  $scope.intervalTimer2 = setInterval(() => {
				date_ob = new Date();
				hours = date_ob.getHours() + "";
				minutes = date_ob.getMinutes() + "";
				seconds = date_ob.getSeconds() + "";
				if (hours.length == 1) {hours = "0" + hours};
				if (minutes.length == 1) {minutes = "0" + minutes};
				if (seconds.length == 1) {seconds = "0" + seconds};	
				SSTime  = hours + ":" + minutes + ":" + seconds;
							

			if (y >= 0) {

				$scope.finisherTime = secondsToHms(y);
				$("#feedback2").html(secondsToHms(y));
				SessionService.set("raceStartTime",y);
				$("#feedbackTime").html(SSTime);
				
			} else {
				
				$("#feedback2").html(x);
				SessionService.set("raceStartTime",x);
				$("#feedbackTime").html(SSTime);

			}

			if (x == 0) {

				$("#feedback2").html(secondsToHms(y));
				SessionService.set("raceStartTime",y);
				$("#feedbackTime").html(SSTime);
				$scope.UpdateRace();
  
			};
			x--; 
			y++;
			
		  }, 1000);
		  		
	};
	
	$scope.UpdateRace = function() {
		var dateObj = new Date();
	      
		console.log(dateObj);
		
		const races = JSON.parse(SessionService.get("races"));
		const racesSelect = JSON.parse(SessionService.get("racesSelect"));
		
	
				
				
			for ( var i in racesSelect) {
				if (racesSelect[i]) {
					 $http.put('/api/athlete/' + races[i]._id.race_id)
						.success(function(data) {
							$scope.race = data;
							$scope.originalRace = data;
						})
						.error(function(data) {
							console.log('Error: ' + data);
						});  
				}
			
			}			        
    };
    
  
    
    $scope.updateAthlete = function() {
		console.log($scope.formData.race_finisher);
		copiedTime = $scope.finisherTime;
		const racesRunning = JSON.parse(SessionService.get("racesRunning"));
        console.log("Athlete finishing : " + racesRunning);

		finisherRaceID = "";
		
		for (const x in racesRunning) {
		  console.log(x + ": "+ racesRunning[x].race_tag + " = "+ racesRunning[x].race_id);
		  if (racesRunning[x].race_tag === $scope.formData.race_finisher) {
				finisherRaceID = racesRunning[x].race_id;
		  }
		}
		console.log("finisherRaceID : " + finisherRaceID);
		 $http.put('/api/athleteFinish/' +$scope.formData.race_finisher + "/" + finisherRaceID)
            .success(function(data) {
				$scope.race = data;
                $scope.originalRace = data;
                console.log(data);
                
	
                $scope.formData.race_finisher = "";
                if (data.members === null) {
					
					$("#feedbackFinisher").html("Unknown runner");
                } else {
					$("#feedbackFinisher").html(data.members.mb_fname);
        			
				}
                $("#feedbackFinisherTime").html(copiedTime);
               // var race_finish = $window.document.getElementById('race_finish');
               // race_finish.focus();

     
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
           
    };
    
      
    
    $scope.toggleEdit = function(index){
		$scope.race[index].edit = !$scope.race[index].edit;
    };

    $scope.showRace = function(index){
		$scope.race[index].race_id = !$scope.race[index].race_id;
		console.log("Getting details for race_id: " + $scope.race[index]._id.race_id);
		$http.get('/api/raceDetails/' + $scope.race[index]._id.race_id)
			.success(function(data) {
				$scope.raceDetails = data;
				$scope.originalDetails = data;
				
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
		
    };
   
    

    

    


});	 


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
	 
	/* 
	 	// when landing on the page, get all resources and show them
    $http.get('/api/admin')
        .success(function(data) {
            $scope.patients = JSON.stringify(data, null, 2);
            $scope.originalPatient = data;
	//		console.log($scope.patients);
	        
        })
        .error(function(data) {
            console.log('Error: ' + data);
    });
    
   */ 
    

    
	 	
       
    
    
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Member History Controller ///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



angular.module('scotchApp')
	.controller('MemberHistoryController',function($scope, $http, SessionService) {
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
	



 


    
	$scope.getRealIndex = function(athlete){
		var athleteIndex = $scope.nameDetails.indexOf(athlete);
		console.log("Real Index for member: " + athleteIndex);
		return athleteIndex
     };  
     

		 $http.get('/api/history/' + SessionService.get("mbTag").replace(/['"]+/g, ''))
  		.success(function(data) {
				$scope.raceDetails = data;
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
	 	
	 	// when landing on the page, get all resources and show them
	$scope.showRace = function(index) {
		
		
		if (old_index != index && old_index != -10) {
			$scope.nameDetails[old_index].member_id = false;
		}
		console.log("index: " + index);
	//	console.log("$scope.nameDetails[index].member_id" + $scope.nameDetails[index].member_id);
	//	console.log("!$scope.nameDetails[index].member_id" + !$scope.nameDetails[index].member_id);
		
		
		$scope.nameDetails[index].member_id = !$scope.nameDetails[index].member_id;
		console.log("Getting details for mb_tag: " + $scope.nameDetails[index].mb_tag + " at index: " + index);
	    $scope.getHistory($scope.nameDetails[index].mb_tag, index);
	    
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Shop Controller ///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



angular.module('scotchApp')
	.controller('ShopController',function($scope, $http, SessionService) {
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
	



 



		 $http.get('/api/shop')
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Member Photos Controller ///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



angular.module('scotchApp')
	.controller('MemberPhotosController',function($scope, $http, SessionService) {
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Member Documents Controller ///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



angular.module('scotchApp')
	.controller('MemberDocumentsController',function($scope, $http, SessionService) {
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// History Controller ///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



angular.module('scotchApp')
	.controller('HistoryController',['$scope','$http', function($scope, $http) {
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
	
	$scope.filterByName = function(ID){
		
		console.log(JSON.stringify($scope.nameDetails, null, 2));
	  $scope.this.nameDetails = $scope.this.nameDetails.filter(item => item.mb_ID === ID);
	 // console.log("scope.filter: " + ID);
	  
	};	 
	 	// when landing on the page, get all resources and show them
    $http.get('/api/member')
  		.success(function(data) {
				$scope.nameDetails = data;
				$scope.originalDetails = data;
				
				console.log("History Controller Scope: " + JSON.stringify($scope.user, null, 2));
				if (data.length == 0) {
					$scope.no_bookings = true
				} else {
					$scope.no_bookings = false
				}
			
				
			})
			.error(function(data) {
				console.log('Error: ' + data);
		});	 
	
    
	$scope.getRealIndex = function(athlete){
		var athleteIndex = $scope.nameDetails.indexOf(athlete);
		console.log("Real Index for member: " + athleteIndex);
		return athleteIndex
     };  
     

	$scope.getHistory = function(mb_tag, index) {
		 $http.get('/api/history/' + mb_tag)
  		.success(function(data) {
				$scope.raceDetails = data;
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
		
	}; 	
	 	
	 	// when landing on the page, get all resources and show them
	$scope.showRace = function(index) {
		
		
		if (old_index != index && old_index != -10) {
			$scope.nameDetails[old_index].member_id = false;
		}
		console.log("index: " + index);
	//	console.log("$scope.nameDetails[index].member_id" + $scope.nameDetails[index].member_id);
	//	console.log("!$scope.nameDetails[index].member_id" + !$scope.nameDetails[index].member_id);
		
		
		$scope.nameDetails[index].member_id = !$scope.nameDetails[index].member_id;
		console.log("Getting details for mb_tag: " + $scope.nameDetails[index].mb_tag + " at index: " + index);
	    $scope.getHistory($scope.nameDetails[index].mb_tag, index);
	    
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


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Race Controller ////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	
  angular.module('scotchApp')
 .controller('RaceController',function($scope, $http) {
	 
    $scope.filter = 'none';  
    
   // var dateObj = new Date("YYYY-MM-DD");

    $scope.formData = { 
		race_distance: 5,
		race_date: new Date(), 
		
	};
	
	
	$('#datepicker').datepicker({
		format: 'dd MM yyyy'
	});
		
	$('#datepicker .input-group.date').datepicker({},'show');

	$('#datepicker').datepicker('update', new Date);
			
			
	$('#datepicker').on('changeDate', function() {
			//	console.log('Changing Date: ' + $scope.practice_return);
				calObj = $('#datepicker').datepicker('getDate');
			//	console.log('Calendar Object: ' + calObj);
			$scope.formData.race_date = calObj;	
			$('#datepicker').datepicker('hide');	
				
					//$scope.findPatientsPerPractice($scope.practice_return);



	});
	
    
    $scope.toggleEdit = function(index){
		$scope.athletes[index].edit = !$scope.athletes[index].edit;
    };
    
     $scope.getRealIndex = function(athlete){
		var athleteIndex = $scope.athletes.indexOf(athlete);
		return athleteIndex
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
    $http.get('/api/athlete')
        .success(function(data) {
			//console.log("Scope: " + JSON.stringify(, null, 2));
            $scope.race = data;
            $scope.originalAthlete = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
        

       

        // when submitting the add form, send the text to the node API
    $scope.createAthlete = function() {

    
		console.log("Loading: " + JSON.stringify($scope.formData, null, 2));
        $http.post('/api/athlete', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.athletes = data;
                $scope.originalAthlete = data;
              //  console.log(data);
                var dateObj = new Date();
				var sYear = dateObj.getUTCFullYear();
				var sMonth = dateObj.getUTCMonth();
				var sDay = '';
				var sDay = dateObj.getDate() + '';
				$('#datepicker').datepicker('setDate',dateObj);
			
                $scope.formData.race_tag = "";
          
                $scope.formData.race_distance = 5;

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}); 	




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Poll Controller ////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


 angular.module('scotchApp')
 .controller('PollController',function($scope, $http, $window) {
	
	


	   
	 var picker2;
	$scope.formData = {};
    $scope.formData.poll_date = new Date();
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
    

    
     $scope.getRealIndex = function(poll){
		 console.log(poll);
		var plIndex = $scope.polls.indexOf(poll);
		return plIndex
     };  
      
      $scope.getID = function(tech){
		tech2 = JSON.parse(tech);
		$scope.formData.pt_tech_id = tech2.tech_id;
		return ptIndex
     };  

 
 
    $scope.filterByName = function(name){
      $scope.resetPolls();
      $scope.polls = $scope.polls.filter(function(poll){
        return poll.name === name;
      });
      $scope.filter = 'Name: ' + name;
    };
    
    //------------------------------------------------------
	$http.get('/api/poll')
        .success(function(data) {
            $scope.polls = data;
            $scope.originalPolls = data;
            console.log('Polls: ' + JSON.stringify(data, null, 2));
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
        

    
    // when submitting the add form, send the text to the node API
    $scope.createPoll = function() {
		if (isNaN($scope.formData.pl_ID)) {
			alert('Please enter a numeric value for ID only');
		} else {
			$http.post('/api/poll', $scope.formData)
				.success(function(data) {
					$scope.formData = {}; // clear the form so our user is ready to enter another
					$scope.polls = data;
					$scope.originalPolls = data;
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
    $scope.deletePoll = function(id) {
		    deletePoll = $window.confirm("Are you sure you want to delete this Poll");
			if(deletePoll){
				$http.delete('/api/poll/' + id)
					.success(function(data) {
						$scope.polls = data;
						 
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



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Question Controller ////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


 angular.module('scotchApp')
 .controller('QuestionController',function($scope, $http, $window) {
	
	


	   
	 var picker2;
	$scope.formData = {};
    $scope.formData.question_date = new Date();


			
			   
   
    $scope.filter = 'none';    
    
    $scope.toggleEdit = function(index){
      $scope.members[index].edit = !$scope.members[index].edit;
      
      console.log("Index: " + index);
    };
    

    
     $scope.getRealIndex = function(poll){
		 console.log(question);
		var qsIndex = $scope.questions.indexOf(question);
		return qsIndex
     };  
      
      $scope.getID = function(tech){
		tech2 = JSON.parse(tech);
		$scope.formData.pt_tech_id = tech2.tech_id;
		return ptIndex
     };  

 
 
    $scope.filterByName = function(name){
      $scope.resetQuestionss();
      $scope.questions = $scope.questions.filter(function(question){
        return question.name === name;
      });
      $scope.filter = 'Name: ' + name;
    };
    
    //------------------------------------------------------
	$http.get('/api/question')
        .success(function(data) {
            $scope.questions = data;
            $scope.originalQuestionss = data;
            console.log('Questions: ' + JSON.stringify(data, null, 2));
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
        

    
    // when submitting the add form, send the text to the node API
    $scope.createQuestion = function() {
		if (isNaN($scope.formData.qs_ID)) {
			alert('Please enter a numeric value for ID only');
		} else {
			$http.post('/api/question', $scope.formData)
				.success(function(data) {
					$scope.formData = {}; // clear the form so our user is ready to enter another
					$scope.questions = data;
					$scope.originalQuestions = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		}
    };
    
      
 


 
    
    


    // delete a question after checking it
    $scope.deleteQuestion = function(id) {
		    deleteQuestion = $window.confirm("Are you sure you want to delete this Question");
			if(deleteQuestion){
				$http.delete('/api/question/' + id)
					.success(function(data) {
						$scope.questions = data;
						 
						console.log(data);
					})
					.error(function(data) {
						console.log('Error: ' + data);
					});
			}
    };


});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Answer Controller ////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


angular.module('scotchApp')
 .controller('AnswerController',function($scope, $http, $window) {
	
	


	   
	 var picker2;
	$scope.formData = {};
    $scope.formData.question_date = new Date();


			
			   
   
    $scope.filter = 'none';    
    
    $scope.toggleEdit = function(index){
      $scope.members[index].edit = !$scope.members[index].edit;
      
      console.log("Index: " + index);
    };
    

    
     $scope.getRealIndex = function(poll){
		 console.log(question);
		var qsIndex = $scope.questions.indexOf(question);
		return qsIndex
     };  
      
      $scope.getID = function(tech){
		tech2 = JSON.parse(tech);
		$scope.formData.pt_tech_id = tech2.tech_id;
		return ptIndex
     };  

 

    
    //------------------------------------------------------
	$http.get('/api/question')
        .success(function(data) {
            $scope.questions = data;
            $scope.originalQuestionss = data;
            console.log('Questions: ' + JSON.stringify(data, null, 2));
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
        
       // when submitting the add form, send the text to the node API
    $scope.Answer = function() {

			$http.get('/api/answer/4/' + $scope.formData.qs_answer)
				.success(function(data) {
					$scope.formData = {}; // clear the form so our user is ready to enter another
					$scope.questions = data;
					$scope.originalQuestions = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		};
    

 
    
    




});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// PollResult Controller ////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  angular.module('scotchApp')
 .controller('PollResultController',function($scope, $http, $location) {


		


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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Service Controller ////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




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
				"/" + encodeURIComponent($scope.practices[index].practice_email)
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
	
  angular.module('scotchApp')
 .controller('LoginController',function($scope, $http, $route, $location, $rootScope, AuthService, SessionService) {


		$scope.feedback = SessionService.get("regFeedback");	
		$scope.login = function() {
			$scope.error = false;
			$scope.disabled = true;
			AuthService.login($scope.locals.email,$scope.locals.password)
			.then(function() {
				
				$scope.disabled = false;
				$scope.loginForm = {};
				console.log("SessionService(Admin): " + SessionService.get("admin"));
				
				if (SessionService.get("admin") === "true") {
					console.log("Loading: history");
					
					$location.path('/history');
					
					$route.reload();
				} else {
					console.log("Loading: memberMain");
					$location.path('/membermain');
					$route.reload();
				}
				
			})
			.catch(function() {
				$scope.error = true;
				$scope.errorMessage = 'Invalid username and/or password';
				$scope.disabled = false;
				$scope.loginForm = {};
				$scope.feedback = SessionService.get("regFeedback");		
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
			
			/*
			 * function register(username, password, fname, sname,cell,tech,admin) {
				var deferred = $q.defer();
				$http.post('/api/register',{e:username,password:password,fname:fname,sname:sname,cell:cell,tech:tech,admin:admin})
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
			* */
			


	});

