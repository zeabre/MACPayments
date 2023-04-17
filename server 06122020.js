// server.js

    // set up ========================
    
    var express  					= require('express');
    var app      						= express();                               // create our app w/ express
    var path 						= require('path');
    var mongoose 				= require('mongoose'), Schema = mongoose.Schema;                     // mongoose for mongodb
    var morgan 					= require('morgan');             // log requests to the console (express4)
    var bodyParser 				= require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride 		= require('method-override'); // simulate DELETE and PUT (express4)
	var nodemailer 				= require('nodemailer');
	var scheduler 				= require('node-schedule');
	var multer 						= require('multer');
	var AppointmentPicker	= require('appointment-picker');
	var moment					= require('moment');
	var xmlify 						= require('xmlify');
	var convert 					= require('xml-js');

	/*--
		var storage = multer.diskStorage(
    {
        destination: 'uploads/',
        filename: function ( req, file, cb ) {
            cb( null, file.originalname);
        }
    }
	);
	--*/
	
	
	var upload 				= multer({dest: 'uploads/'});	
	var fs 					= require('fs');
    var crypto				= require('crypto');
    var jwt					= require('jsonwebtoken');
	var expressJwt 			= require('express-jwt');
    var _ 					= require('lodash'); 
	var passport			= require('passport');
	var LocalStrategy		= require('passport-local').Strategy;
    var Q					= require('q'); 
	var cookieParser 		= require('cookie-parser');
	var passportLocaLMongoose=require('passport-local-mongoose');
	var expressSession		= require('express-session');
	var router				= express.Router();
	//var GPIO				= require('pigpio').Gpio;
	var Promise				= require("bluebird");
	
	
	
	var dateObj = new Date();
	var sYear = dateObj.getUTCFullYear();
	var sMonth = dateObj.getUTCMonth() + 1;
	var sDate = new Date(sYear,sMonth-1,1);
	var eDate = new Date(sYear,sMonth,1);
	console.log(dateObj);
	console.log("Year: " + sYear + " Month: " + sMonth + "...");
	console.log("sDate: " + sDate + "...");
	console.log("eDate: " + eDate + "..."); 
	
  
    // configuration =================

    mongoose.connect('mongodb://localhost:27017/PMS',{useNewUrlParser: true, useUnifiedTopology: true});     // connect to mongoDB database
    
    // Email sending
    

		

    
	app.use(morgan('dev'));                                         // log every request to the console
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({'extended':'false'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

	//-------------------
	
	 	app.use(expressSession({ secret: 'gawie', resave: false, saveUninitialized: false }));	
		app.use(passport.initialize());
		app.use(passport.session());
		app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
		
		var AccountSchema = new Schema(
			{
				fname:			{	type: String},
				sname:			{	type: String},
				username: 		{	type: String},
				password:		{	type: String},
			});
		AccountSchema.plugin(passportLocaLMongoose);			
		var Account = mongoose.model('Account',AccountSchema);
		
		var HardwareSchema = new Schema(
			{
				
				PersonNo : String,
				AssetNo: String,
				AssetName: String,
				PurchaseDate: { type: Date, default: Date.now },
			});

		var Hardware = mongoose.model('Hardware',HardwareSchema);
		
		
		
		var GPIOSchema = new Schema(
			{
				GPIOGroup : { type: String, default: "Home"},
				GPIOName: String,
				GPIODesc: String,

				Pin: { type: Number, default:  0},
				Length: { type: Number, default:  0},
				Time: { type: Date, default: Date.now },
						
				Active: { type: Boolean, default:0}

			});

		var GPIO = mongoose.model('GPIO',GPIOSchema);


		var DoctorSchema = new Schema(
			{
				doctor_name: String,
				doctor_email: String,
				doctor_prnum: String,
				doctor_speciality: String,
				doctor_telnum: String,
				doctor_location: String,
			});

		var Doctor = mongoose.model('Doctor',DoctorSchema);	

		var PracticeSchema = new Schema(
			{
				practice_location: String,
				practice_address: String,
				practice_telnum: String,
				practice_faxnum: String,
				practice_email: String,
				practice_tech: String,
				
			});			
		var Practice = mongoose.model('Practice',PracticeSchema); 
		
		var ServiceSchema = new Schema(
			{
				service_name: String,
				service_desc: String,
				service_cost: Number,
				service_branch: Number,
				service_active: Number,
				service_code: String,
				service_ICD10: String,
				
			});			
		var Service = mongoose.model('Service',ServiceSchema); 		
				
		var ApptSchema = new Schema(
			{
				appt_num: String,
				appt_date: { type: Date, default: Date.now },
				pt_ID: String,
				practice_location: String,
				service_code: String,
				email_sent: Date,
				complete: {type: Number, default: 0},
		});
		var Appt = mongoose.model('Appt',ApptSchema);
		
		var PatientSchema = new Schema(
			{
				pt_num: String,
				pt_ID: String,
				pt_fname: String,
				pt_title: String,
				pt_sname: String,
				pt_address: String,
				pt_practice: String,	
				pt_email: String,
				pt_telnum: {type: String, default: 'None'},
				pt_medaid_name: String,
				pt_medaid_num: String,
				pt_medaid_type: String,
				pt_medaid_dep: Number,
				
			
		});
		var Patient = mongoose.model('Patient',PatientSchema);	
		
		var PatientDetailsSchema = new Schema(
			{
				pt_num: String,
				pt_ID: String,
				pt_post_add1: String,
				pt_post_add2: String,
				pt_post_code: String,
				pt_work_add1: String,
				pt_work_add2: String,	
				pt_work_code: String,
				pt_liable_name: String,
				pt_liable_id: String,	
				pt_liable_rel: String,
				pt_fam_name: String,
				pt_fam_add: String,
				pt_fam_id: String,
				pt_fam_rel: String,
				pt_fam_home: String,
				pt_fam_cell: String,
				
			
		});
		var PatientDetails = mongoose.model('PatientDetails',PatientDetailsSchema);
				
		var UploadSchema = new Schema(
			{
				name: String,
				originalname: String,
				resourceid: String,
				mimetype: String,
				created:  { type: Date, default: Date.now },
		});
		var Upload = mongoose.model('Upload',UploadSchema);
			
		
		
	passport.use(new LocalStrategy(Account.authenticate()));
	passport.serializeUser(Account.serializeUser());
	passport.deserializeUser(Account.deserializeUser());
	
	app.get('/', function(req,res) {
		res.render('index', {user :req.user});
	});
	
	app.get('/api/register', function(req, res) {
		res.status(200).send({});
	});
	
	app.post('/api/register',function(req, res) {
		console.log('In new register');
		console.log(JSON.stringify(req.body, null, 2));
		Account.register(new Account({username : req.body.username, fname : req.body.fname,sname : req.body.sname}),req.body.password, function(err, account) {
			if (err) {
				console.log(err);
				return res.status(500).json({err: err});
			}
			passport.authenticate('local')(req, res, function() {
				return res.status(200).json({status: 'Registration successful'});
			});
		});
	});
	
	app.get('/api/login', function(req, res) {
		return res.status(200).json({user :req.user});
	});
	
	app.get('/api/status',function(req,res) {
		if (!req.isAuthenticated()) {
			return res.status(200).json({status : false});
		}
		return res.status(200).json({status : true});	
	});
	
	app.post('/api/login', function(req, res, next) {
		console.log('In new login');
		passport.authenticate('local', function(err, user, info) {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.status(401).json({err:info});
			}
			req.logIn(user, function (err) {
				if (err) {
					return res.status(500).json({err:info});	
				}
				console.log('Login successful');
				res.status(200).json({status: 'Login successful'});
			});
		})(req,res,next);
	});
	
	app.get('/api/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	module.exports = router;
	
	router.get('/ping', function(req, res) {
		console.log('Pong');
		res.status(200).send('pong');
	});
		
		




			 
		
		
	//-------------------
		

	app.use(function(req,res,next){
		res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
		res.header('Access-Control-Allow-Origin', '*'); // We can access from anywhere
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
		res.header('Content-Type', 'application/json;charset=utf-8');
		next();
	});

	
	
	app.get('/api/token_old',function(req,res) {
		console.log('Token :' + expressSession.token);
		res.send(expressSession.token);
	});	
		

    app.get('/api/sayHello', function(req, res, next) {
		console.log('Inside mailer');
		// Not the movie transporter!
		var transporter = nodemailer.createTransport({
			service: 'Hotmail',
			auth: {
				user: 'gawievds@hotmail.com', // Your email id
				pass: 'zeabre13' // Your password
			}
		});
		var mailOptions = {
			from: 'gawievds@hotmail.com', // sender address
			to: 'gawievds@hotmail.com', // list of receivers
			subject: 'Email Example', // Subject line
			html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
		};
		
		transporter.sendMail(mailOptions, function(error, info){
			if(error){
				console.log(error);
				res.json({yo: 'error'});
			}else{
				console.log('Message sent: ' + info.response);
				res.json({yo: info.response});
			};
		});
		

	});
	
	app.post('/api/sendResourceMail', function(req, res, next) {
		console.log(JSON.stringify(req.body, null, 2));
			var transporter = nodemailer.createTransport({
			service: 'Hotmail',
			auth: {
				user: 'gawievds@hotmail.com', // Your email id
				pass: 'zeabre13' // Your password
			}
		});
		var mailOptions = {
			from: 'gawievds@hotmail.com', // sender address
			to: 'gawievds@hotmail.com', // list of receivers
			subject	: req.body.subjectText, // Subject line
			html	: req.body.bodyText // You can choose to send an HTML body instead
		};
		
		transporter.sendMail(mailOptions, function(error, info){
			if(error){
				console.log(error);
				res.json({yo: 'error'});
			}else{
				console.log('Message sent: ' + info.response);
				res.json({yo: info.response});
			};
		});
		

	});


	
	
    

    
    

    
        // routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all Vendors
    
    //Login ************************************************************
    
	
		app.post('/api/login_old', function(req, res, next) {
			var deferred = Q.defer();
			var token;
			
			User.findOne({ email: req.body.email }, function (err, user) {
				if (err) deferred.reject(err);
				
					hashtest = crypto.pbkdf2Sync(req.body.password,user.salt, 1000, 64).toString('hex');

				if (user && hashtest === user.hash) {
					// authentication successful
					var expiry = new Date();
					expiry.setDate(expiry.getDate() + 7);
					
					token = jwt.sign(
							{
								_id		: user._id,
								email	:user.email,
								exp: parseInt(expiry.getTime()/1000),
							}, 'gawie');
					
					res.status(200);
					res.json({"token" : token});
					//expressSession.token = token;
					console.log(token);
					deferred.resolve();
					
				} else {
					// authentication failed
					deferred.resolve();
				}
				return deferred.promise;
			});
		 

		});
 
		function getById(_id) {
			var deferred = Q.defer();
		 
			db.users.findById(_id, function (err, user) {
				if (err) deferred.reject(err);
		 
				if (user) {
					// return user (without hashed password)
					deferred.resolve(_.omit(user, 'hash'));
				} else {
					// user not found
					deferred.resolve();
				}
			});
		 
			return deferred.promise;
		}
		 
    app.get('/api/reg_old', function(req, res, next) {
			var deferred = Q.defer();
		 
			User.find(function (err, users) {
				if (err) deferred.reject(err);
		 
				if (users) {
					// return user (without hashed password)
					deferred.resolve(_.omit(users, 'hash'));
				} else {
					// user not found
					deferred.resolve();
				}
				return deferred.promise;
			});

	});
		 
    app.post('/api/reg_old', function(req, res, next) {
			var deferred = Q.defer();
		 
			// validation
			User.findOne(
				{ email: req.body.email },
				function (err, users) {
					if (err) deferred.reject(err);
		 
					if (users) {
						// username already exists
						console.log('Username "' + req.body.email + '" is already taken');
						deferred.reject('Username "' + req.body.email + '" is already taken');
					} else {
						createUser();
					}
				});
		 
			function createUser() {
				// set user object to userParam without the cleartext password
			
				// add hashed password to user object

		 		_salt 	= crypto.randomBytes(16).toString('hex');
				_hash	= crypto.pbkdf2Sync(req.body.password,_salt, 1000, 64).toString('hex');
				console.log(_salt + '---' + _hash);
				User.create({
					fname 	: req.body.firstName,
					email	: req.body.email,
					sname	: req.body.lastName,
					salt	: _salt,
					hash	: _hash

				},function (err, user) {
						if (err)
							res.send(err);
		 
						deferred.resolve();
						
						console.log(deferred.promise)
					});
				}
		 
				return deferred.promise;
	});
		 
		function update(_id, userParam) {
			var deferred = Q.defer();
		 
			// validation
			db.users.findById(_id, function (err, user) {
				if (err) deferred.reject(err);
		 
				if (user.username !== userParam.username) {
					// username has changed so check if the new username is already taken
					db.users.findOne(
						{ username: userParam.username },
						function (err, user) {
							if (err) deferred.reject(err);
		 
							if (user) {
								// username already exists
								deferred.reject('Username "' + req.body.username + '" is already taken')
							} else {
								updateUser();
							}
						});
				} else {
					updateUser();
				}
			});
		 
			function updateUser() {
				// fields to update
				var set = {
					firstName: userParam.firstName,
					lastName: userParam.lastName,
					username: userParam.username,
				};
		 
				// update password if it was entered
				if (userParam.password) {
					set.hash = bcrypt.hashSync(userParam.password, 10);
				}
		 
				db.users.update(
					{ _id: mongo.helper.toObjectID(_id) },
					{ $set: set },
					function (err, doc) {
						if (err) deferred.reject(err);
		 
						deferred.resolve();
					});
			}
		 
			return deferred.promise;
		}
		

		 
		app.delete('/api/auth_old/:_id',function(req,res){
			// prefixed function name with underscore because 'delete' is a reserved word in javascript
			function _delete(_id) {
				var deferred = Q.defer();
			 
				db.users.remove(
					{ _id: mongo.helper.toObjectID(_id) },
					function (err) {
						if (err) deferred.reject(err);
			 
						deferred.resolve();
					});
			 
				return deferred.promise;
			}
		});
    
 
    
    
   // End Login ********************************************************
    


    app.get('/api/cpu', function(req, res, next) {

			
			var cput1 = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");
			var cput2 = cput1/1000;
			
			var cputemp = {
				cputemp59 : cput2
							}	;					
		    res.json(cputemp); // return all gpios in JSON format

    });
    



    ///////////////////////
    // Send Email
    ///////////////////////

async function WrapSendMail(){
	return new Promise((resolve, reject)=>{
				 var mailOptions = {
					from: 		'gawievds@hotmail.com', // sender address
					to: 			'gawievds@hotmail.com', // list of receivers
					subject: 	'Test Subject', // Subject line
					html: 		'Test Body' // You can choose to send an HTML body instead
				};
				let transporter = nodemailer.createTransport({
					service: 'Hotmail',
					auth: {
						user: 'gawievds@hotmail.com', // Your email id
						pass: 'Ze@bre13' // Your password
					}
				});
				let resp = false;
			transporter.sendMail(mailOptions, function(error, info){		
				if (error) {
					console.log("Error: " + error);
					resolve(false);
				} else {
					console.log ("Email sent" + info.response);
					resolve(true);
				}
			});
	});
};
			
   

    app.post('/api/appt', function(req, res, next) {
		console.log("Enter /api/appt: " + JSON.stringify(req.body, null, 2));
        // create a booking appointment, information comes from AJAX request from Angular
        Appt.create({
				appt_num: "1",
				pt_ID: req.body.pt_ID,
				pt_num: "1",
				appt_date: req.body.pt_appt_booking,
				pt_title: req.body.pt_title,
				service_code: req.body.pt_service_id,
				practice_location: req.body.pt_appt_practice,				

			
        }, async function(err, appt) {
            if (err)
                res.send(err);
                

                
                
            console.log("Record created: " + JSON.stringify(appt, null, 2));
            req.addr = 'gawievds@hotmail.com';
            req.appt = req.body.pt_appt_booking;
            req.msg = req.body.pt_appt_booking;
			console.log("Enter sendApptMail (ext): " + req);
			let resp = await WrapSendMail();
			console.log("Response: " + resp);
			var theDate = new Date();
			
			Appt.findByIdAndUpdate(appt._id,{
					email_sent: theDate
			}
			, function(err, appt) {
					if (err)
						res.send(err);   
				console.log("Appt date updated");
									
			});
						

			console.log("Exit sendApptMail (ext): " + req);
				
            // get and return all the appointments after you create another
            Appt.find(function(err, appts) {
                if (err)
                    res.send(err)
				console.log("Exit /api/appt: " + JSON.stringify(req.body, null, 2));
                res.json(appts);
            });
        });

    });
  
    app.post('/api/patientdetail', function(req, res, next) {
		console.log("Loading: " + JSON.stringify(req.body, null, 2));
        // create a patient details record, information comes from AJAX request from Angular
        PatientDetails.create({
				pt_ID: req.body.pt_ID,
				pt_num: '1',
				pt_post_add1: req.body.pt_post_add1,
				pt_post_add2: req.body.pt_post_add2,
				pt_post_code: req.body.pt_post_code,
				pt_work_add1: req.body.pt_work_add1,
				pt_work_add2: req.body.pt_work_add2,	
				pt_work_code: req.body.pt_work_code,
				pt_liable_name: req.body.pt_liable_name,
				pt_liable_id: req.body.pt_liable_id,	
				pt_liable_rel: req.body.pt_liable_rel,
				pt_fam_name: req.body.pt_fam_name,
				pt_fam_add: req.body.pt_fam_add,
				pt_fam_id: req.body.pt_fam_id,
				pt_fam_rel: req.body.pt_fam_rel,
				pt_fam_home: req.body.pt_fam_home,
				pt_fam_cell: req.body.pt_fam_cell,			

			
        }, function(err, patientdetails) {
            if (err)
                res.send(err);
			console.log("Creating: " + JSON.stringify(req.body, null, 2));
            // get and return all the patient details after you create another
            PatientDetails.find(function(err, patientdetails) {
                if (err)
                    res.send(err)
                res.json(patientdetails);
            });
        });

    });
         
       
       app.get('/api/appt/:uuid', function (req, res, next) {
		  console.log('Getting specific appts:' + req.params.uuid);
		  Appt.find({
			pt_UID: req.params.uuid
		  }, function (err, appts) {
			console.log(  JSON.stringify(appts, null, 2));
                if (err)
                    res.send(err)
                res.json(appts);



		  });
		});
   
                    // delete a patient
    app.delete('/api/appt/:appt_id', function(req, res, next) {
		console.log("Delete: " + JSON.stringify(req.params, null, 2));
        Appt.remove({
            _id : req.params.appt_id
        }, function(err, appt) {
            if (err)
                res.send(err);

						Appt.aggregate([
						
										{
											$match: { "appt_date": { $gte: dateObj } }
										},

										{
											$lookup:
												   {
													 from: "patients",
													 localField: "pt_ID",
													 foreignField: "pt_ID",
													 as: "PatientDetails"
												   }
										},

						
										
										{
											$sort:{"appt_date":1}
										}
									   ]
								   )
								.then(function(patients) {
				 
									
									
								console.log(patients.length);			
								console.log("Returning Patient Values: " + JSON.stringify(patients, null, 2));
								res.json(patients); // return all patients in JSON format
									
								})
								.catch(function(err) {
									res.json(err);
						});
        });
    }); 
   
   
   
        app.post('/api/patient', function(req, res, next) {

        // create a doctor, information comes from AJAX request from Angular
        Patient.create({
				pt_num: "1",
				pt_ID: req.body.pt_ID,
				pt_fname: req.body.pt_fname,
				pt_title: req.body.pt_title,
				pt_sname: req.body.pt_sname,
				pt_address: req.body.pt_address,
				pt_practice: req.body.pt_practice,				
				pt_email: req.body.pt_email,
				pt_telnum: req.body.pt_telnum,
				pt_medaid_name: req.body.pt_medaid_name,
				pt_medaid_num: req.body.pt_medaid_num,
				pt_medaid_type: req.body.pt_medaid_type,
				pt_medaid_dep: req.body.pt_medaid_dep,
			
        }, function(err, patient) {
            if (err)
                res.send(err);
			console.log("Creating: " + JSON.stringify(req.body, null, 2));
            // get and return all the doctors after you create another
            Patient.find(function(err, patients) {
                if (err)
                    res.send(err)
                res.json(patients);
            });
        });

    });
    
    
    
    app.get('/api/patient', function(req, res, next) {

        // use mongoose to get all patients in the database
        Patient.find(function(err, patients) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
		    console.log("Returning values: " + JSON.stringify(patients, null, 2));
		    res.json(patients); // return all gpios in JSON format
        });
    });
    
	app.get('/api/bookings/:practice/:sYear/:sMonth/:sDay', function(req, res, next) {

		console.log('Param: ' + req.params.practice);
		console.log('Body: ' + JSON.stringify(req.params, null, 2));
		var month = 1;
		month = Number(req.params.sMonth) + 1;
		var compareDate = req.params.sYear + '-' + month + '-' + req.params.sDay;
		console.log('compareDate: ' + compareDate);
		var compareDateStart = new Date(req.params.sYear,month,req.params.sDay);
		var compareDateEnd = new Date(req.params.sYear,month,req.params.sDay);
		
		var momentDateStart = new Date(new Date(compareDate).setHours(00,00,00));
		var momentDateEnd = new Date(new Date(compareDate).setHours(23,59,59));
				
		console.log('Check for Date: ' + momentDateStart + ' to ' + momentDateEnd);
		
		          Appt.aggregate([
        
						{
							$match: { 	
												"practice_location": req.params.practice,
												"appt_date": { $gte: momentDateStart , $lte: momentDateEnd}
											} 
						}
						
						
						,

						{
							$project: {
												bookingtime: {
															$dateToString: { format: "%H:%M" , date: "$appt_date" , timezone: "+02"}
																
															
														}
											}
						}
        
						

					   ]
				   )
				
		 	.then(function(appts) {
 
					
					
				console.log(appts);			
				console.log("Returning Booking Values: " + JSON.stringify(appts, null, 2));
				var bookings = _.map(appts, 'bookingtime');
				res.json(bookings);
//				res.json(appts); 
					
				})
				.catch(function(err) {
					res.json('Error: ' + err);
		});
 

		
 
    });
    
    
    
     
/*	  app.get('/api/main', function(req, res, next) {
			Patient.aggregate(function(err,PatientDetails)
				{ $lookup:
				   {
					 from: "appts";
					 localField: "pt_num";
					 foreignField: "appt_num";
					 as: "PatientDetails"
				   }

				   if (err)
					res.send(err)			
				console.log(PatientDetails.length);	
				console.log("Returning Patient Values: " + JSON.stringify(PatientDetails, null, 2));
				res.json(PatientDetails); // return all gpios in JSON format

				 });
		});
*/
  
 	  app.get('/api/main', function(req, res, next) {
        // use mongoose to get all doctors in the database
        Appt.aggregate([
        
						{
							$match: { "appt_date": { $gte: dateObj } }
						},

						{
							$lookup:
								   {
									 from: "patients",
									 localField: "pt_ID",
									 foreignField: "pt_ID",
									 as: "PatientDetails"
								   }
						},

        
						
						{
							$sort:{"appt_date":1}
						}
					   ]
				   )
				.then(function(patients) {
 
					
					
				console.log(patients.length);			
				console.log("Returning Patient Values: " + JSON.stringify(patients, null, 2));

				var xml = xmlify(patients,{ root: 'Patients', xmlDeclaration: true});
				console.log(xml);
				
				res.json(patients); // return all patients in JSON format
					
				})
				.catch(function(err) {
					res.json(err);
		});
	});
	
	
	 	  app.get('/api/admin', function(req, res, next) {
        // use mongoose to get all doctors in the database
        Appt.aggregate([
        
						{
							$match: { "appt_date": { $gte: dateObj } }
						},

						{
							$lookup:
								   {
									 from: "patients",
									 localField: "pt_ID",
									 foreignField: "pt_ID",
									 as: "PatientDetails"
								   }
						},

        
						
						{
							$sort:{"appt_date":1}
						}
					   ]
				   )
				.then(function(patients) {
 
					
					
				console.log(patients.length);			
				console.log("Returning Patient Values: " + JSON.stringify(patients, null, 2));

				var options = {compact: true, spaces: 4};
				var inter = JSON.stringify(patients, null, 2);
				console.log(inter);
				var result = convert.json2xml(inter,options);

				console.log('********************************'  + result + '**********************************');
				
				res.json(result); // return all patients in JSON format
					
				})
				.catch(function(err) {
					res.json(err);
		});
	});
	
	
	
	
    
 	  app.get('/api/history', function(req, res, next) {
        // use mongoose to get all historical appointments in the database
        Appt.aggregate([
        
						{
							$match: { "appt_date": { $lt: dateObj } }
						},

						{
							$lookup:
								   {
									 from: "patients",
									 localField: "pt_ID",
									 foreignField: "pt_ID",
									 as: "PatientDetails"
								   }
						},

        
						
						{
							$sort:{"appt_date":1}
						}
					   ]
				   )
				.then(function(patients) {
 
					
					
				console.log(patients.length);			
				console.log("Returning Patient Values: " + JSON.stringify(patients, null, 2));
				res.json(patients); // return all patients in JSON format
					
				})
				.catch(function(err) {
					res.json(err);
		});
	});
  
    
    app.get('/api/patient/:practice', function(req, res, next) {
        // use mongoose to get all patients in the database
        Appt.aggregate([       
        				{
							$match: { "appt_date": { $gte: dateObj } }
						},

						{	
							$lookup:
							   {
								 from: "patients",
								 localField: "pt_ID",
								 foreignField: "pt_ID",
								 as: "PatientDetails"
							   }
							},
						
							{	
							$match: { "PatientDetails.pt_practice": req.params.practice }
							},
							
							
							{
								$sort:{"appt_date":1}
							}
						]
				   )
				.then(function(patients) {
 
					
					
				console.log(patients.length);			
				console.log("Returning Patient Values: " + JSON.stringify(patients, null, 2));
				res.json(patients); // return all gpios in JSON format
					
				})
				.catch(function(err) {
					res.json(err);
		});
	});
    
    
    
       app.get('/api/doctor', function(req, res, next) {

        // use mongoose to get all doctors in the database
        Doctor.find(function(err, doctors) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
		    console.log("Returning values: " + JSON.stringify(doctors, null, 2));
		    res.json(doctors); // return all gpios in JSON format
        });
    }); 
  
    
                 // delete a patient
    app.delete('/api/patient/:patient_id', function(req, res, next) {
		console.log("Delete: " + JSON.stringify(req.params, null, 2));
        Patient.remove({
            _id : req.params.patient_id
        }, function(err, patient) {
            if (err)
                res.send(err);

            // get and return all the resources after you create another
            Patient.find(function(err, patients) {
                if (err)
                    res.send(err)
                res.json(patients);
            });
        });
    }); 
    
    app.post('/api/doctor', function(req, res, next) {

        // create a doctor, information comes from AJAX request from Angular
        Doctor.create({
				doctor_name: req.body.doctor_name,
				doctor_speciality: req.body.doctor_speciality,
				doctor_email: req.body.doctor_email,
				doctor_telnum: req.body.doctor_telnum,
				doctor_location: req.body.doctor_location,
        }, function(err, doctor) {
            if (err)
                res.send(err);
			console.log("Creating: " + JSON.stringify(req.body, null, 2));
            // get and return all the doctors after you create another
            Doctor.find(function(err, doctors) {
                if (err)
                    res.send(err)
                res.json(doctors);
            });
        });

    });
    
    
     
 
     app.post('/api/practice', function(req, res, next) {

        // create a practice, information comes from AJAX request from Angular
        Practice.create({
				practice_location: req.body.practice_location,
				practice_faxnum: req.body.practice_faxnum,
				practice_email: req.body.practice_email,
				practice_telnum: req.body.practice_telnum,
				practice_tech: req.body.practice_tech,
				practice_address: req.body.practice_address,
								
        }, function(err, practice) {
            if (err)
                res.send(err);
			console.log("Creating: " + JSON.stringify(req.body, null, 2));
            // get and return all the doctors after you create another
            Practice.find(function(err, practices) {
                if (err)
                    res.send(err)
                res.json(practices);
            });
        });

    });
    
            // delete a practice
    app.delete('/api/practice/:practice_id', function(req, res, next) {
		console.log("Delete: " + JSON.stringify(req.params, null, 2));
        Practice.remove({
            _id : req.params.practice_id
        }, function(err, practice) {
            if (err)
                res.send(err);

            // get and return all the resources after you create another
            Practice.find(function(err, practices) {
                if (err)
                    res.send(err)
                res.json(practices);
            });
        });
    });
    
    
       app.get('/api/practice', function(req, res, next) {

        // use mongoose to get all practices in the database
        Practice.find(function(err, practices) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
		    console.log("Returning values: " + JSON.stringify(practices, null, 2));
		    res.json(practices); // return all gpios in JSON format
        });
    }); 
     
 
 
 
    app.post('/api/service', function(req, res, next) {

        // create a service, information comes from AJAX request from Angular
        Service.create({
				service_name: req.body.service_name,
				service_desc: req.body.service_desc,
				service_cost: req.body.service_cost,
				service_branch: req.body.service_branch,
				service_active: req.body.service_active,
				service_code: req.body.service_code,
				service_ICD10: req.body.service_ICD10,
				

        }, function(err, service) {
            if (err)
                res.send(err);
			console.log("Creating: " + JSON.stringify(req.body, null, 2));
            // get and return all the services after you create another
            Service.find(function(err, services) {
                if (err)
                    res.send(err)
                res.json(services);
            });
        });

    });
    
    
    
       app.get('/api/service', function(req, res, next) {

        // use mongoose to get all doctors in the database
        Service.find(function(err, services) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
		    console.log("Returning values: " + JSON.stringify(services, null, 2));
		    
			var xml = xmlify(services,{ root: 'Services', xmlDeclaration: true});
			console.log(xml);


		    res.json(services); // return all gpios in JSON format
        });
    }); 
        
            // update a service
    app.put('/api/service/:service_id/:service_name/:service_desc/:service_cost/:service_branch/:service_active/:service_code/:service_ICD10', function(req, res, next) {
		console.log("Updating: " + req.body.service_name);
		console.log("Body: " + JSON.stringify(req.body, null, 2));
		console.log("Test: " + req.originalUrl);
        Service.findByIdAndUpdate(req.params.service_id,{
			service_name 	: req.params.service_name,
			service_desc 	: req.params.service_desc,
			service_cost 	: req.params.service_cost,
			service_branch 	: req.params.service_branch,
			service_active 	: req.params.service_active,
			service_code 	: req.params.service_code,
			service_ICD10 	: req.params.service_ICD10,
			
			}
        , function(err, service) {
            if (err)
                res.send(err);
			
            // get and return all the vendors after you create another
            Service.find(function(err, services) {
                if (err)
                    res.send(err)
                res.json(services);
            }).sort({
				service_name : 'asc'});
        });
    });
    
            // delete a resource
    app.delete('/api/service/:service_id', function(req, res, next) {
		console.log("Delete: " + JSON.stringify(req.params, null, 2));
        Service.remove({
            _id : req.params.service_id
        }, function(err, service) {
            if (err)
                res.send(err);

            // get and return all the resources after you create another
            Service.find(function(err, services) {
                if (err)
                    res.send(err)
                res.json(services);
            });
        });
    });
   
 
     app.get('/api/uploads', function(req, res, next) {

        // use mongoose to get all uploads in the database
        Upload.find(function(err, uploads) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
		    console.log("Returning values: " + JSON.stringify(uploads, null, 2));
		    res.json(uploads); // return all gpios in JSON format
        });
    });  
   
	app.post('/api/uploads', upload.single('file'), function (req, res, next) {
		  console.log('Uploading files');	
		  console.log(JSON.stringify(req.body, null, 2));
		  console.log(req.file);
		  var newUpload = {
			name: req.body.name,
			originalname: req.file.originalname,
			resourceid: req.file.resourceID,
			mimetype: req.file.mimetype,
			created: Date.now(),
			file: req.file
		  };
			Upload.create(newUpload, function (err, next) {
			if (err) {
			  next(err);
			} else {
			res.send(newUpload);

			}
		  });
		});
	
	app.post('/api/uploadpatientdetails',  upload.any('files'), function (req, res, next) {
			console.log('Uploading files');	
			console.log(req.formData);
			console.log(req);


	/*	  var newUpload = {
			name: req.body.name,
			created: Date.now(),
		  };
			Upload.create(newUpload, function (err, next) {
			if (err) {
			  next(err);
			} else {
			res.send(newUpload);

			}
		  });

*/
		res.sendStatus(200);
		});
    
    app.get('/api/uploads/:uuid/:filename', function (req, res, next) {
		  console.log('Getting specific file' + req.params);
		  Upload.findOne({
			'file.filename': req.params.uuid,
			'file.originalname': req.params.filename
		  }, function (err, upload) {
			console.log(  JSON.stringify(upload, null, 2));
			if (err) next(err);
			else {
	//		  res.set({
	//			"Content-Disposition": 'attachment; filename="' + upload.originalname + '"',
	//			"Content-Type": upload.mimetype
	//		  });
	//		  fs.createReadStream(upload.file.path).pipe(res);
			}
		  });
		});
    
    app.get('/api/uploads2/:rid/:ftype', function (req, res, next) {
		  console.log('Checking specific file' + req.params);
		  Upload.findOne({
			'file.resourceid': req.params.rid,
			'file.filetype': req.params.ftype
		  }, function (err, upload) {
			  
			if (err) next(err);
			else {
					if (!upload){
					  console.log('No file');	
					} else
					{
					  console.log('Found file: ' + upload.file.originalname);
					}
			}
		  });
		});    
    

    
   
 
 
   


   	var testDate = new Date();
	
	var checkPatients = function(res){
		 console.log('Test');

		return 1;
	}



/*
	
	setInterval( 
		function() {
		console.log("Running Interval " + Date.now());
		console.log(process.memoryUsage());
		//console.log(process.cpuUsage());
		//console.log(process);
		
		
		

	}, 6000);
	
	setInterval( 
		checkPatients
		
	, 18000);
*/


    // listen (start app with node server.js) ======================================
    app.listen(3100);
    console.log(app.settings );
    console.log("App listening on port 3100");


