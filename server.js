// server.js

    // set up ========================
    
    var express  				= require('express');
    var app      				= express();                               // create our app w/ express
    var path 					= require('path');
    var mongoose 				= require('mongoose'), Schema = mongoose.Schema;                     // mongoose for mongodb
    var morgan 					= require('morgan');             // log requests to the console (express4)
    var bodyParser 				= require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride 		    = require('method-override'); // simulate DELETE and PUT (express4)
	var nodemailer 				= require('nodemailer');
	var scheduler 				= require('node-schedule');
	var multer 					= require('multer');
	var AppointmentPicker	    = require('appointment-picker');
	var moment					= require('moment');
	var xmlify 					= require('xmlify');
	var convert 				= require('xml-js');
	var MobileDetect 			= require('mobile-detect');
	var http 					= require('http');
    var CryptoJS 				= require("crypto-js");
    var FTPClient 				= require('ftp');
	var MobileResult 			= 1;
    var axios                   = require('axios')

    const http2 				= require("https");
	const qs 					= require("querystring");   
	const NTP 					= require('ntp-time').Client;
   
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
	var Request 			= require("request");
	
		var bodyText = "";
			const options2 = {
			  "method": "POST",
			  "hostname": "api.mtn.com",
			  "port": null,
			  "path": "/v1/oauth/access_token?grant_type=client_credentials",
			  "headers": {
				"Content-Type": "application/x-www-form-urlencoded"
			  }
			};
	
	
	
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

   // mongoose.connect('mongodb://localhost:27017/MAC',{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});     // connect to mongoDB database
    
    mongoose.connect('mongodb+srv://zeabre:Ze%40bre13@zeabre.qyr9v.mongodb.net/MAC',{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});     // connect to mongoDB database
    
   // mongodb+srv://zeabre:Ze%40bre13@zeabre.qyr9v.mongodb.net/MAC
    const connection = mongoose.connection;
    
    console.log(connection);
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
				fname:			{	type: 	String},
				sname:			{	type: 	String},
				ID:				{	type: String, unique: true},
				username: 		{	type: 	String},
				password:		{	type: 	String},
				cell: 				{ type:		String},
				tech:				{ type: 	Boolean, default:0},
				admin:				{ type: 	Boolean, default:0},
				fullname: 		{ type:		String},
				mb_tag: 		 {type: String, default: ""},
				
				
			});
		AccountSchema.plugin(passportLocaLMongoose);			
		var Account = mongoose.model('Account',AccountSchema);
		

		var MedAidSchema = new Schema(
			{
				Plan:				{	type: 	String},
				scheme:			{	type: 	String},
				status: 			{	type: 	String},	
			});
		MedAidSchema.plugin(passportLocaLMongoose);			
		var MedAid = mongoose.model('MedAid',MedAidSchema);		
		
		
		


	

		var MemberSchema = new Schema(
			{
				mb_tag: {type: String, default: ""},
				mb_num: String,
				mb_ID: String,
				mb_password: String,
				mb_email: String,
				mb_fname: String,
				mb_title: String,
				mb_sname: String,
				mb_address: String,
				mb_email: String,
				mb_telnum: {type: String, default: 'None'},
				mb_ASA: {type: String, default: ""},
				mb_5kmAvg:  { type: Date, default: "0:0:0" },
			
				
			
		});
		var Member = mongoose.model('Member',MemberSchema);	
		
		var PollSchema = new Schema(
			{
				pl_date: Date,
				pl_active: {type: Boolean, default: true},
				pl_ID: String,
				pl_name: String,
				pl_desc: String,
				pl_question1: {pl_question: String, pl_result: Number},
				pl_question2: {pl_question: String, pl_result: Number},
				pl_question3: {pl_question: String, pl_result: Number},
				pl_question4: {pl_question: String, pl_result: Number},
				pl_question5: {pl_question: String, pl_result: Number},
				pl_question6: {pl_question: String, pl_result: Number},
				pl_question7: {pl_question: String, pl_result: Number},
				pl_question8: {pl_question: String, pl_result: Number},
				pl_question9: {pl_question: String, pl_result: Number},
				pl_question10: {pl_question: String, pl_result: Number},
				pl_IPs: {type : Array, "default" : []},
			
				
			
		});
		var Poll = mongoose.model('Poll',PollSchema);
		
		var QuestionSchema = new Schema(
			{
				qs_date: { type: Date, default: Date.now },
				qs_active: {type: Boolean, default: true},
				qs_ID: String,
				qs_name: String,
				qs_answer: {type : Array, "default" : []},
				qs_IPs: {type : Array, "default" : []},
			
		
			
		});
		var Questions = mongoose.model('Questions',QuestionSchema);		
		
		var RaceSchema = new Schema(
			{
				race_tag: String,
				race_id: String,
				race_distance: String,
				race_date: { type: Date, default: Date.now },
				race_start: { type: Date, default: ""},
				race_end: { type: Date, default: ""},
				race_time: { type: Date, default: ""   },
				race_status: String,

		});
		var Race = mongoose.model('Race',RaceSchema);
		
		
		var MemberDetailsSchema = new Schema(
			{
				mb_ID: String,
				mb_post_add1: String,
				mb_post_add2: String,
				mb_post_code: String,
				mb_pay_mac: {type: Number, default: 0},
				mb_pay_asa:  {type: Number, default: 0},	
				mb_pay_clothing:  {type: Number, default: 0},	
			
				
			
		});
		var MemberDetails = mongoose.model('MemberDetails',MemberDetailsSchema);
				
		var AdminSchema = new Schema(
			{
				admin_key: String,
				admin_value: String,
				

		});
		var Admin = mongoose.model('Admin',AdminSchema);


        var ProductSchema = new Schema({
            imagePath: {type: String, required: true},
            title: {type: String, required: true},
            description: {type: String, required: true},
            price: {type: Number, required: true},
        });

        var Product = mongoose.model('Product', ProductSchema);



	passport.use(new LocalStrategy(Account.authenticate()));
	passport.serializeUser(Account.serializeUser());
	passport.deserializeUser(Account.deserializeUser());
	
	app.get('/', function(req,res) {
		
		
		res.render('index', {user :req.user});

	});
	
	app.get('/api/register', function(req, res) {
		res.status(200).send({});
	});
	
	
	
	app.get('/api/sendSMS/:access_token', function(req, res1) {

		
		const options = {
		  "method": "POST",
		  "hostname": "api.mtn.com",
		  "port": null,
		  "path": "/v2/messages/sms/outbound",
		  "headers": {
			"Content-Type": "application/json",
			"Authorization": "" + req.params.access_token
		  }
		};
		
			const req1 = http2.request(options, function (res) {
			  const chunks = [];
				console.log(options);
				res.on("data", function (chunk) {
					chunks.push(chunk);
				});

				res.on("end", function () {
					const body = Buffer.concat(chunks);
					console.log("SMS Result: "+ body.toString());
					//console.log("SMS res: "+ body.toString());
					
					//access_token = res;
				});
				}
			);
					
	
	
		
				req1.write(JSON.stringify({
					senderAddress: '27835565746',
					receiverAddress: ['27760516382'],
					message: 'Testing',
					clientCorrelator: 'string'
				}));

				
				req1.end();			
				
			

			
		res1.status(200).send(req1.status);
	});
	
	
	
	
	
	app.post('/api/register',function(req, res) {
		console.log('In new register');
		console.log(JSON.stringify(req.body, null, 2));
		Account.register(new Account({username : req.body.username, fname : req.body.fname,sname : req.body.sname, cell : req.body.cell, tech : req.body.tech, admin : req.body.admin, fullname : req.body.fname + ' ' + req.body.sname}),req.body.password, function(err, account) {
			if (err) {
				console.log(err);
				return res.status(500).json({err: err});
			}
			passport.authenticate('local')(req, res, function() {
				return res.status(200).json({status: 'Registration successful'});
			});
		});
	});
	
	app.post('/api/memberregister',function(req, res) {
		console.log('In new member register');
		console.log(JSON.stringify(req.body, null, 2));
		Account.register(new Account({username : req.body.username, ID : req.body.ID}),req.body.password, function(err, account) {
			if (err) {
				console.log(JSON.stringify(err, null, 2));
				return res.status(500).json(err);
			}
			console.log("New member added - checking login.");
			console.log("Account: " + account);
			user = "";
			Member.findOne(
						{ mb_ID: req.body.ID },
						function (err, user) {
							if (err) 
								res.send(err);
		 
							if (user) {
								console.log(user);
								
								 Account.updateOne(
									{ 
										"ID"	:req.body.ID  },
									{ 
										$set: {
									
									"fname"			: user.mb_fname,		
									"sname" 		: user.mb_sname,
									"fullname" 		: user.mb_fname + " " + user.mb_sname,
									"mb_tag"			: user.mb_tag,
									
										}
									}
									, function(err, member) {
										if (err) {
											res.send(err);
										} 
											user = member;	
									});	
							}
						});
						
						
			
			console.log(passport);			
			passport.authenticate('local')(req, res, function() {
				return res.status(200).json({status: 'Registration successful',user});
			});
		
		
		});
	});
	
	app.get('/api/login', function(req, res) {
		
		
		console.log("api/login req: " + req.user);
		
		var md = new MobileDetect(req.headers['user-agent']);
		var me =  JSON.stringify(md, null, 2);
		MobileResult = me.search('x86');
		
		console.log("md contains x86" + MobileResult);
		
		return res.status(200).json({
														user :req.user, 
														md : MobileResult
														});
	});
	
	app.get('/api/status',function(req,res) {
		if (!req.isAuthenticated()) {
			return res.status(200).json({status : false});
		}
		return res.status(200).json({status : true});	
	});
	
	app.post('/api/login', function(req, res, next) {
		console.log('In new login');
		console.log(req.passport);

		console.log("***");
		console.log(req.body);
		console.log("***");

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
				console.log('Login successful for: ' + user);
				res.status(200).json({status: 'Login successful',user});
			});
		})(req,res,next);
	});
	
	app.get('/api/logout', function(req, res) {
		req.logout(function(err) {
			if (err) { return next(err); }
		res.redirect('/');
  });

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
			
   

    
    
     
          
   
   
        app.post('/api/member', function(req, res, next) {

		if (req.body.mb_5kmAvg.length > 10) {
			kmAvg = req.body.mb_5kmAvg
		} else {
			
			var StaggerArray = req.body.mb_5kmAvg.split(":");
			
			
			var kmAvg = new Date();
		
			kmAvg.setHours(StaggerArray[0]);
			kmAvg.setMinutes(StaggerArray[1]);
			kmAvg.setSeconds(StaggerArray[2]);
		}
        // create a doctor, information comes from AJAX request from Angular
        Member.create({
				mb_num: "1",
				mb_ID: req.body.mb_ID,
				mb_fname: req.body.mb_fname,
				mb_title: req.body.mb_title,
				mb_sname: req.body.mb_sname,
				mb_address: req.body.mb_address,
				mb_email: req.body.mb_email,
				mb_telnum: req.body.mb_telnum,
				mb_ASA: req.body.mb_ASA,
				mb_5kmAvg: kmAvg,
				mb_tag: req.body.mb_tag,
			
        }, function(err, member) {
            if (err)
                res.send(err);
			console.log("Creating: " + JSON.stringify(req.body, null, 2));
            // get and return all the doctors after you create another
            Member.find(function(err, members) {
                if (err)
                    res.send(err)
                res.json(members);
            });
        });

    });
    
                // update a poll
    app.get('/api/pollresult/:poll_id/:question', function(req, res, next) {
		console.log("Updating: " + req.params.poll_id);
		console.log("Question: " + req.params.poll_id);

		var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
		
		var questionAsString = req.params.question + "";	
		questionLen = questionAsString.length;
		questionNumeric = !isNaN(req.params.question);
		pollIDValid = !format.test(req.params.poll_id);
		
		console.log("Length: "+ questionLen);
		console.log("!isNaN: "+ questionNumeric);
		console.log("Valid poll_id string: "+ pollIDValid);
		
		if (questionLen < 3 && questionNumeric && pollIDValid) {
			var name = "pl_question"  + req.params.question + ".pl_result";
			var query = {};
			query[name] = name;
			console.log("query[name] ***" + query[name] + "***");
			console.log("req.ip ***" + req.ip + "***");
		
			Poll.aggregate([
        
						{
							$match: { 	
										"pl_ID" : req.params.poll_id
												
									} 
						}
						
						,
							{
								$project : {
									
									"active" : "$pl_active"
									
									}
							}   
					   ]
				   )
				.then(function(poll_active) {
 			
 			
				console.log("Returning Poll active: " + JSON.stringify(poll_active, null, 2));
				var is_Active = JSON.stringify(poll_active[0].active, null, 2);
				console.log("Returning Poll status: " + is_Active);
				
				if ( is_Active == "true") {  
				
					Poll.findOneAndUpdate(
							{
								"pl_ID" : req.params.poll_id,
								"pl_IPs" : {
									"$nin" : [ req.ip ]
										},
								"pl_active" : true,		
							},
						
							{
							
								$push: { pl_IPs:  req.ip   }
							
							,
							
								$inc : { [name] : 1}
							}
						
					, function(err, service) {
						if (err)
							res.send(err);
					});
					
					res.setHeader('Content-type','text/html')
					res.status(200).send("<html><body><div align='center'><table style='width:350'><tr><td><div align='center'><img width='250' height='250' src='https://zeabre.tplinkdns.com:3300/images/mac.jpg'/></div></td></tr><tr><td></br><b><div style='font-size:30px;font-family:tahoma'></br></b></div></td></tr><tr><td><div style='font-size:30px;font-family:tahoma'></br>Results will be available shortly, and will be implemented during the next period. </br></br>Thank you for taking the time to make this a wonderful club!</div></td></tr></table></div></body></html>");
					//res.render("MAC Poll", { title: "Melkbos Athletic Club", message: "Thank you for your response" });
				} else {
					res.setHeader('Content-type','text/html')
					res.status(200).send("<html><body><div align='center'><table style='width:350'><tr><td><div align='center'><img width='250' height='250' src='https://zeabre.tplinkdns.com:3300/images/mac.jpg'/></div></td></tr><tr><td></br><b><div style='font-size:30px;font-family:tahoma'></br>This poll has closed.</b></div></td></tr><tr><td><div style='font-size:30px;font-family:tahoma'></br></div></td></tr></table></div></body></html>");
			
				}
					
				})
				.catch(function(err) {
					res.json(err);
				});
		
			
		} else {
			res.status(200).send("Nice try :p");
		}
        
    });
    
    
                  // update a question
    app.get('/api/answer/:question_id/:answer', function(req, res, next) {
		console.log("Updating: " + req.params.question_id);
		console.log("Adding: " + req.params.answer);

		var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
		
		var answerAsString = req.params.answer + "";	
		answerLen = answerAsString.length;
		questionIDValid = !format.test(req.params.question_id);
		
		console.log("Length: "+ answerLen);
		console.log("Valid poll_id string: "+ questionIDValid);
		
		if (answerLen < 100) {
			
			console.log("req.ip ***" + req.ip + "***");
		
			Questions.aggregate([
        
						{
							$match: { 	
										"qs_ID" : req.params.question_id
												
									} 
						}
						
						,
							{
								$project : {
									
									"active" : "$qs_active"
									
									}
							}   
					   ]
				   )
				.then(function(question_active) {
 			
 			
				console.log("Returning Question active: " + JSON.stringify(question_active, null, 2));
				var is_Active = JSON.stringify(question_active[0].active, null, 2);
				console.log("Returning Question status: " + is_Active);
				
				if ( is_Active == "true") {  
				
					Questions.findOneAndUpdate(
							{
								"qs_ID" : req.params.question_id,
							/*	"qs_IPs" : {
									"$nin" : [ req.ip ]
										},*/
								"qs_active" : true,		
							},
						
							{
							
								$push: { qs_IPs:  req.ip,
										qs_answer: 	answerAsString
									   }
							
							
							}
						
					, function(err, service) {
						if (err)
							res.send(err);
					});
					
					res.setHeader('Content-type','text/html')
					res.status(200).send("<html><body><div align='center'><table style='width:350'><tr><td><div align='center'><img width='250' height='250' src='https://zeabre.tplinkdns.com:3300/images/mac.jpg'/></div></td></tr><tr><td></br><b><div style='font-size:30px;font-family:tahoma'></br></b></div></td></tr><tr><td><div style='font-size:30px;font-family:tahoma'></br>Results will be available shortly, and will be implemented during the next period. </br></br>Thank you for taking the time to make this a wonderful club!</div></td></tr></table></div></body></html>");
					//res.render("MAC Poll", { title: "Melkbos Athletic Club", message: "Thank you for your response" });
				} else {
					res.setHeader('Content-type','text/html')
					res.status(200).send("<html><body><div align='center'><table style='width:350'><tr><td><div align='center'><img width='250' height='250' src='https://zeabre.tplinkdns.com:3300/images/mac.jpg'/></div></td></tr><tr><td></br><b><div style='font-size:30px;font-family:tahoma'></br>This poll has closed.</b></div></td></tr><tr><td><div style='font-size:30px;font-family:tahoma'></br></div></td></tr></table></div></body></html>");
			
				}
					
				})
				.catch(function(err) {
					res.json(err);
				});
		
			
		} else {
			res.status(200).send("Nice try :p");
		}
        
    });
    
    
                // update a poll
    app.get('/api/pollreset/:poll_id', function(req, res, next) {
		console.log("Resetting: " + req.params.poll_id);
		
		var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
		
		pollIDValid = !format.test(req.params.poll_id);
		
		console.log("Valid poll_id string: "+ pollIDValid);
		
		if (pollIDValid) {
			
			Poll.findOneAndUpdate({"pl_ID" : req.params.poll_id},
				
				{ 	
					$set: {
						"pl_question1.pl_result": 0,
						"pl_question2.pl_result": 0,
						"pl_question3.pl_result": 0,
						"pl_question4.pl_result": 0,
						"pl_question5.pl_result": 0,
						"pl_question6.pl_result": 0,
						"pl_question7.pl_result": 0,
						"pl_question8.pl_result": 0,
						"pl_question9.pl_result": 0,
						"pl_question10.pl_result": 0,
						"pl_IPs" : [],
					}
				}
			, function(err, service) {
				if (err)
					res.send(err);
			});
			
			
			res.send("Poll reset");
		} else {
			res.send("Nice try :p");
		}
        
    });
    
                    // update a poll
    app.get('/api/questionreset/:question_id', function(req, res, next) {
		console.log("Resetting: " + req.params.question_id);
		
		var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
		
		pollIDValid = !format.test(req.params.question_id);
		
		console.log("Valid poll_id string: "+ pollIDValid);
		
		if (pollIDValid) {
			
			Questions.findOneAndUpdate({"qs_ID" : req.params.question_id},
				
				{ 	
					$set: {
						"qs_answer" : [],
						"qs_IPs" : [],
					}
				}
			, function(err, service) {
				if (err)
					res.send(err);
			});
			
			
			res.send("Questions reset");
		} else {
			res.send("Nice try :p");
		}
        
    });
    
    app.get('/api/admin/:admin_key', function(req, res, next) {
		 
		console.log ("Request IP: " + req.ip);
		const ObjectId = mongoose.Types.ObjectId;
		
				var objectid = "Admin Key: "  + req.params.admin_key + "";
				var query = {};
				query[objectid] = objectid;
				console.log("***" + query[objectid] + "***");
	
			  Admin.aggregate([
        
						{
							$match: { 	
												admin_key: req.params.admin_key
												
									} 
						}
						
						
        
						

					   ]
				   )
				  .then(function(admin) {
 			
 			
				console.log(admin);			
				console.log("Returning Admin: " + JSON.stringify(admin, null, 2));

				res.json(admin); 
					
				})
				.catch(function(err) {
					res.json(err);
		});
	});
	
	app.post('/api/admin', function(req, res, next) {

		var Ips = [{ip_Address : "1"}, {ip_Address : "2"}];
		var admin_set =  JSON.stringify(req.body);
		console.log("Creating: " + admin_set);
        // create an admin item, information comes from AJAX request from Angular
        Admin.create({
				admin_key: req.body.admin_key,
				admin_value: req.body.admin_value,

			
        }, function(err, admin) {
            if (err)
                res.send(err);
		    // get and return all the polls after you create another
            Admin.find(function(err, admin) {
                if (err)
                    res.send(err)
                res.json(admin);
            });
        });

    });
                    // update a poll
    app.get('/api/polltoggle/:poll_id', function(req, res, next) {
		console.log("Toggling: " + req.params.poll_id);
		
		var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
		
		pollIDValid = !format.test(req.params.poll_id);
		
		console.log("Valid poll_id string: "+ pollIDValid);
		
		if (pollIDValid) {
			
			Poll.findOneAndUpdate({"pl_ID" : req.params.poll_id},
				
				 	
					[{$set: {
						"pl_active": { $eq: [false, "$pl_active"]}
					}}
					]
				
			, function(err, service) {
				if (err)
					res.send(err);
			});
			
			
			res.send("Poll toggled");
		} else {
			res.send("Nice try :p");
		}
        
    });

    app.post('/api/poll', function(req, res, next) {

		var Ips = [{ip_Address : "1"}, {ip_Address : "2"}];
		
        // create a poll, information comes from AJAX request from Angular
        Poll.create({
				pl_date: req.body.poll_date,
				pl_name: req.body.pl_name,
				pl_desc: req.body.pl_desc,
				pl_ID: req.body.pl_ID,
				pl_active: true,
				pl_question1: ({ pl_question: req.body.pl_question1, pl_result: 0}),
				pl_question2: ({ pl_question: req.body.pl_question2, pl_result: 0}),
				pl_question3: ({ pl_question: req.body.pl_question3, pl_result: 0}),
				pl_question4: ({ pl_question: req.body.pl_question4, pl_result: 0}),
				pl_question5: ({ pl_question: req.body.pl_question5, pl_result: 0}),
				pl_question6: ({ pl_question: req.body.pl_question6, pl_result: 0}),
				pl_question7: ({ pl_question: req.body.pl_question7, pl_result: 0}),
				pl_question8: ({ pl_question: req.body.pl_question8, pl_result: 0}),
				pl_question9: ({ pl_question: req.body.pl_question9, pl_result: 0}),
				pl_question10: ({ pl_question: req.body.pl_question10, pl_result: 0}),
				
				//pl_IPs: Ips,
			
        }, function(err, poll) {
            if (err)
                res.send(err);
			console.log("Creating: " + JSON.stringify(req.body, null, 2));
            // get and return all the polls after you create another
            Poll.find(function(err, polls) {
                if (err)
                    res.send(err)
                res.json(polls);
            });
        });

    });
   
    
    
    app.post('/api/question', function(req, res, next) {

		var Ips = [{ip_Address : "1"}, {ip_Address : "2"}];
		
        // create a poll, information comes from AJAX request from Angular
        Questions.create({
				qs_date: req.body.qs_date,
				qs_name: req.body.qs_name,
				qs_active: true,
				qs_ID: req.body.qs_ID,
				qs_IPs: Ips,
			
        }, function(err, question) {
            if (err)
                res.send(err);
			console.log("Creating: " + JSON.stringify(req.body, null, 2));
            // get and return all the questions after you create another
            Questions.find(function(err, questions) {
                if (err)
                    res.send(err)
                res.json(questions);
            });
        });

    });
    
    
    app.get('/api/question', function(req, res, next) {

		
        // use mongoose to get all questions in the database
        Questions.find(function(err, questions) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
		    console.log("Returning values: " + JSON.stringify(questions, null, 2));
		    res.json(questions); // return all questions in JSON format
        });
    });
    
      app.get('/api/poll/:poll_id', function(req, res, next) {
		 
		console.log (req.ip);
		console.log('Param: ' + req.params.poll_id);
		const ObjectId = mongoose.Types.ObjectId;
		
				var objectid = "pl_ID: '"  + req.params.poll_id + "";
				var query = {};
				query[objectid] = objectid;
				console.log("***" + query[objectid] + "***");
	
			  Poll.aggregate([
        
						{
							$match: { 	
												pl_ID: req.params.poll_id
												
									} 
						}
						
						,
							{
								$project : {
									
									"Poll" : "$pl_desc",
									"Option 1" : "$pl_question1.pl_question",
									"Option 2" : "$pl_question2.pl_question",
									"Option 3" : "$pl_question3.pl_question",
									"Option 4" : "$pl_question4.pl_question",
									"Option 5" : "$pl_question5.pl_question",
									"Option 6" : "$pl_question6.pl_question",
									"Option 7" : "$pl_question7.pl_question",
									"Option 8" : "$pl_question8.pl_question",
									"Option 9" : "$pl_question9.pl_question",
									"Option 10" : "$pl_question10.pl_question"
								
									}
							}   

        
						

					   ]
				   )
				  .then(function(polls) {
 			
 			
				console.log(polls);			
				console.log("Returning Poll" + JSON.stringify(polls, null, 2));

				res.json(polls); 
					
				})
				.catch(function(err) {
					res.json(err);
		});
	});
 
     // delete a poll
    app.delete('/api/poll/:poll_id', function(req, res, next) {
		console.log("Delete: " + JSON.stringify(req.params, null, 2));
        Poll.remove({
            pl_ID : req.params.poll_id
        }, function(err, poll) {
            if (err)
                res.send(err);

            // get and return all the resources after you create another
            Poll.find(function(err, polls) {
                if (err)
                    res.send(err)
                res.json(polls);
            });
        });
    });   
 
       app.get('/api/member', function(req, res, next) {

        // use mongoose to get all doctors in the database
        Member.find(function(err, members) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
		    console.log("Returning values: " + JSON.stringify(members, null, 2));
		    res.json(members); // return all gpios in JSON format
        });
    });
    

    
    app.get('/api/memberprofile/:mb_ID', function(req, res, next) {

        // use mongoose to get all doctors in the database
        Member.findOne(
        {mb_ID : req.params.mb_ID},
			
        function(err, members) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
		    console.log("Returning values: " + JSON.stringify(members, null, 2));
		    res.json(members); // return all members in JSON format
        });
    });
    
    



    app.post('/api/payshop', function(req,res,next) {
        const SECRET_KEY = 'sk_live_a1051961Q48825E24a946469744d'
//        const SECRET_KEY = 'sk_test_9a16f53bQ48825E6fee49b7bb05c'

        console.log(req.body);


        axios.post(
          'https://online.yoco.com/v1/charges/',
          {
            token: req.body.token,
            amountInCents: 299,
            currency: 'ZAR',
            name: 'MAC NODEJS API - LIVE TEST',
            description: 'MAC NodeJS Live',
            metadata : {'name' : 'MAC NODEJS API - TEST META'}
          },
          {
            headers: {
              'X-Auth-Secret-Key': SECRET_KEY,
            },
          },
        )

        .then(function(feedback) {
                console.log('*** Result Start ***');
                console.log(feedback.data);
                console.log('*** Result End ***');
    	        res.status(200).send(feedback .data);
            })
        .catch(function(error) {
                  console.log('*** Error Start ***');
                  console.log(error);
                  console.log('*** Error End ***');
                  res.status(200).send(error);
        });



    });


	app.get('/api/bookings/:practice_tech/:sYear/:sMonth/:sDay', function(req, res, next) {

		console.log('Param: ' + req.params.practice_tech);
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
												"practice_tech": req.params.practice_tech,
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
    
    
    

  
 	  app.get('/api/main', function(req, res, next) {
		console.log("/api/main");  
        // use mongoose to get all doctors in the database
			var dateObj = new Date();
			var sYear = dateObj.getUTCFullYear();
			var sMonth = dateObj.getUTCMonth();
			var sDay = dateObj.getDate();
			var sHr = dateObj.getDate();
			var sMin = dateObj.getDate();
			
			var sDate = new Date(sYear,sMonth,sDay);
		
	
		var momentDateStart = new Date(new Date(sDate).setHours(00,00,00));
		var momentDateEnd = new Date(new Date(sDate).setHours(23,59,59));
 
 		console.log('Check for Date: ' + momentDateStart + ' to ' + momentDateEnd);
		console.log('Check for sDate: ' + sDate);
		       
        Race.aggregate([
        
						{
							$match: { "race_date": {$gte: momentDateStart , $lte: momentDateEnd } }
						},

						{
							$lookup:
								   {
									 from: "Member",
									 localField: "race_tag",
									 foreignField: "mb_tag",
									 as: "MemberDetails"
								   }
						},

        
						
						{
							$sort:{"race_date":1}
						}
					   ]
				   )
				.then(function(race) {
 
					
					
				console.log(race.length);			
				console.log("Returning Athlete Values: " + JSON.stringify(race, null, 2));

				var xml = xmlify(race,{ root: 'Athletes', xmlDeclaration: true});
	////////////			console.log(xml);
				
				res.json(race); // return all patients in JSON format
					
				})
				.catch(function(err) {
					res.json(err);
		});
	});
	
	
	 app.get('/api/time', function(req, res, next) {
		
				var found_ip = "";	
				console.log("Inside /api/time");				
				
				startAll();
				async function startAll() {
				
					console.log("Starting getIP");				
					const getIPValue = await getIP();
					console.log("Resolve getIPValue: " + getIPValue);
					
					console.log("Starting setTimer");				
					var setTimerValue = await setTimer(found_ip);
					console.log("Resolve setTimerValue: " + JSON.stringify(setTimerValue, null, 2));
					console.log("Resolve setTimerValue time: " + setTimerValue.time);
				
					console.log("Starting updateRaceValue");				
					const updateRaceValue =  await updateRace();
					console.log("Resolve updateRaceValue: ***" + JSON.stringify(updateRaceValue, null, 2) + "***");
			
			
						
					var str = setTimerValue.time;
					var dateDiffJSON = null;
					
					if ( typeof str === 'undefined' ) {
						
						//console.log("setTimerValue.time == " + str);
						dateDiffJSON = JSON.parse('{"dateDiff" : "' + 0 + '"}');
						
						const str = new Date().toUTCString();
						
						const [dayValues, dateValues1, dateValues2, dateValues3, timeValues] = str.split(' ');
						console.log(dayValues); 
						console.log(dateValues1); 
						console.log(dateValues2); 
						console.log(dateValues3); 
						console.log(timeValues); 

						const [day, month, year] = [dateValues1,dateValues2,dateValues3-2000];
						const [hours, minutes, seconds] = timeValues.split(':');
						//const date1 = new Date(+(parseInt(year)), +getMonth(month) - 1, +day, +(parseInt(hours)+2),minutes, +seconds,0);
						const date1 = dayValues + " " + dateValues1 + "-" + dateValues2 +  "-" + dateValues3 + " " + timeValues + ".0";
						
						
						
						console.log("date1: " + date1);
						setTimerValue.time = date1;
						
					} else {

						console.log("setTimerValue.time == " + str);
						const [dayValues, dateValues, timeValues] = str.split(' ');
						console.log(dayValues); 
						console.log(dateValues); 
						console.log(timeValues); 

						const [day, month, year] = dateValues.split('-');
						const [hours, minutes, seconds] = timeValues.split(':');
						const [sseconds, mseconds] = seconds.split('.');
						console.log("seconds: " +seconds);	
						const date1 = new Date(+(parseInt(year)+2000), +getMonth(month) - 1, +day, +(parseInt(hours)+2),minutes, +sseconds,+mseconds);
						const date3 = new Date().toUTCString();
						console.log("date1: " + date1);
						
						console.log("date3: " + date3);
						
						const date2 = new Date();
						console.log(date2);
						
						const dateDiff =  Math.abs(date2.getTime() - date1.getTime());
				
						dateDiffJSON = JSON.parse('{"dateDiff" : "' + dateDiff + '"}');
					}
					
					final = Object.assign(setTimerValue,updateRaceValue,dateDiffJSON);
					
					res.json(final);
				};

	
				function getMonth(strMonth) {
					switch ( strMonth )
					{
						case "Mar" : return 3;	
						case "Apr" : return 4;
						
					}
					
					
				}
				
			
				function getIP() {

					return new Promise((resolve) => {
						Admin.aggregate([
			
							{
								$match: { 	
													admin_key: "timer-ip"
													
										} 
							}
						   ]
					   )
					  .then(function(admin) {
		
						console.log(admin);
					
							for ( var i in admin) {
								if (admin[i].admin_key == "timer-ip") {
									
									console.log(admin[i].admin_value);
									found_ip = admin[i].admin_value;
									console.log("Data found IP: " + found_ip);
									
								}
							
							}				
							resolve(found_ip);

								
							});
							
							
							});
						
				};
					
								 
				function setTimer(found_ip) {
					return new Promise((resolve) => {
						console.log("Found IP: " + found_ip);
						var new_url = 'http://' + found_ip + '/countdown?r=120&g=120&b=120'
						console.log(new_url);
						const url = new_url;
							h=1;
							m=1;
							s=1;
							var ms = (h * 60 * 60 * 1000) + (m * 60 * 1000) + (s * 1000);
							
							const params = { ms: ms, r: 120, g: 120, b: 120 };
							const customHeaders = {
								"Content-Type": "application/json",
							}
								fetch(url, {
									method: "POST",
									headers: customHeaders,
									body: JSON.stringify(params),
								})
									.then((response) => response.json())
									.then((ip) => {
										console.log("IP POST Data: " + ip);
										resolve(ip);
									})
									.catch(error => {
										console.log("IP POST Error: " + error);
										resolve(error);
									});
					
								
	
						});
						
						
				};
				 
				 
				function updateRace() {
						return new Promise((resolve) => {		
		
											var dateObj = new Date();
											var sYear = dateObj.getUTCFullYear();
											var sMonth = dateObj.getUTCMonth();
											var sDay = dateObj.getDate();
											var sHr = dateObj.getDate();
											var sMin = dateObj.getDate();
											
											var sDate = new Date(sYear,sMonth,sDay);
								
							
										var momentDateStart = new Date(new Date(sDate).setHours(00,00,00));
										var momentDateEnd = new Date(new Date(sDate).setHours(23,59,59));
								 
										console.log('Check for Date: ' + momentDateStart + ' to ' + momentDateEnd);
										console.log('Check for sDate: ' + sDate);
											   
										Race.aggregate([
								
												{
													$match: { "race_date": {$gte: momentDateStart , $lte: momentDateEnd } }
												},
						 
												
												{
													$sort:{"race_date":1}
												}
											   ]
										   )
										.then(function(race) {
						 
											resolve(race);	
										})
										.catch(function(err) {
											resolve(err);
									});
					});
				};
			
	});
	
	  app.get('/api/specificdates/:practice/:sYear/:sMonth/:sDay', function(req, res, next) {
		console.log("/api/specificdates/:practice/:sYear/:sMonth/:sDay");  
		console.log('Param: ' + req.params.practice);
		console.log('Body: ' + JSON.stringify(req.params, null, 2));
		var month = 1;
		month = Number(req.params.sMonth) + 1;
		var compareDate = req.params.sYear + '-' + month + '-' + req.params.sDay;
		console.log('compareDate: ' + compareDate);
		var compareDateStart = new Date(req.params.sYear,month,req.params.sDay);
		var compareDateEnd = new Date(req.params.sYear,month,req.params.sDay);
		

			
		var sDate = new Date(req.params.sYear,req.params.sMonth,req.params.sDay);
		
		var momentDateStart = new Date(new Date(compareDate).setHours(00,00,00));
		var momentDateEnd = new Date(new Date(compareDate).setHours(23,59,59));
				
		console.log('Check for Date: ' + momentDateStart + ' to ' + momentDateEnd);
		console.log('Check for sDate: ' + sDate);
		
        Race.aggregate([
        
						{
							$match: { 	
												
												"race_date": { $gte: momentDateStart , $lte: momentDateEnd}
											} 
						},

						{
							$lookup:
								   {
									 from: "Members",
									 localField: "race_tag",
									 foreignField: "mb_tag",
									 as: "MemberDEtails"
								   }
						},

        
						
						{
							$sort:{"race_date":1}
						}
					   ]
				   )
				.then(function(race) {
 
					
					
				console.log(race.length);			
				console.log("Returning Athlete Values: " + JSON.stringify(race, null, 2));

				var xml = xmlify(race,{ root: 'Race', xmlDeclaration: true});
				console.log(xml);
				
				res.json(race); // return all athletes in JSON format
					
				})
				.catch(function(err) {
					res.json(err);
		});
	});
	
	
	app.get('/api/main/:sYear/:sMonth/:sDay', function(req, res, next) {
					var dateObj = new Date();
			var sYear = dateObj.getUTCFullYear();
			var sMonth = dateObj.getUTCMonth();
			var sDay = dateObj.getDate();
			var sHr = dateObj.getDate();
			var sMin = dateObj.getDate();
			
			var sDate = new Date(sYear,sMonth,sDay);
		
	
		var momentDateStart = new Date(new Date(sDate).setHours(00,00,00));
		var momentDateEnd = new Date(new Date(sDate).setHours(23,59,59));
		
		
		console.log("/api/main/:sYear/:sMonth/:sDay");
		console.log('Body: ' + JSON.stringify(req.params, null, 2));
		var month = 1;
		month = Number(req.params.sMonth);
		
		var compareDate = new Date(req.params.sYear,month,req.params.sDay);
		
		var momentDateStart = new Date(new Date(compareDate).setHours(00,00,00));
		var momentDateEnd = new Date(new Date(compareDate).setHours(23,59,59));
				
				
		console.log('Check for Date: ' + momentDateStart + ' to ' + momentDateEnd);
		console.log('CompareDate: ' + compareDate);
        
        Race.aggregate([
        
						{
							$match: { "race_date": {$gte: momentDateStart , $lte: momentDateEnd } }
						},

						{ 
							$group: {	_id: { race_date: "$race_date" , race_distance: "$race_distance",race_start: "$race_start", race_id: "$race_id" }, numberofathletes:{$sum:1}}
						},
				
        
						
						{
							$sort:{"race_date":1}
						}
					   ]
				   )
				.then(function(race) {
 
					
					
				console.log(race.length);			
				console.log("Returning Athlete Values: " + JSON.stringify(race, null, 2));

				var xml = xmlify(race,{ root: 'Race', xmlDeclaration: true});
				//console.log(xml);
				
				res.json(race); // return race in JSON format
					
				})
				.catch(function(err) {
					res.json(err);
		});
	});
	
    
    
	
	app.get('/api/time/:sYear/:sMonth/:sDay', function(req, res, next) {
					var dateObj = new Date();
			var sYear = dateObj.getUTCFullYear();
			var sMonth = dateObj.getUTCMonth();
			var sDay = dateObj.getDate();
			var sHr = dateObj.getDate();
			var sMin = dateObj.getDate();
			
			var sDate = new Date(sYear,sMonth,sDay);
		
	
		var momentDateStart = new Date(new Date(sDate).setHours(00,00,00));
		var momentDateEnd = new Date(new Date(sDate).setHours(23,59,59));
		
		
		console.log("/api/time/:sYear/:sMonth/:sDay");
		console.log('Body: ' + JSON.stringify(req.params, null, 2));
		var month = 1;
		month = Number(req.params.sMonth);
		
		var compareDate = new Date(req.params.sYear,month,req.params.sDay);
		
		var momentDateStart = new Date(new Date(compareDate).setHours(00,00,00));
		var momentDateEnd = new Date(new Date(compareDate).setHours(23,59,59));
				
				
		console.log('Check for Date: ' + momentDateStart + ' to ' + momentDateEnd);
		console.log('CompareDate: ' + compareDate);
        
        Race.aggregate([
        
						{
							$match: { "race_date": {$gte: momentDateStart , $lte: momentDateEnd } }
						},

						{ 
							$group: {	_id: { race_date: "$race_date" , race_distance: "$race_distance",race_start: "$race_start", race_id: "$race_id" }, numberofathletes:{$sum:1}}
						},
				
        
						
						{
							$sort:{"race_date":1}
						}
					   ]
				   )
				.then(function(race) {
 
					
					
				console.log(race.length);			
				console.log("Returning Athlete Values: " + JSON.stringify(race, null, 2));

				var xml = xmlify(race,{ root: 'Race', xmlDeclaration: true});
				//console.log(xml);
				
				res.json(race); // return race in JSON format
					
				})
				.catch(function(err) {
					res.json(err);
		});
	});
	
    
       app.get('/api/athlete', function(req, res, next) {

		var start = new Date();
		start.setHours(0,0,0,0);

		var end = new Date();
		end.setHours(23,59,59,999);
		
        // use mongoose to get all doctors in the database
        Race.find({race_date: {$gte: start, $lt: end}},
			function(err, athletes) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
		    console.log("Returning values: " + JSON.stringify(athletes, null, 2));
		    res.json(athletes); // return all gpios in JSON format
        });
    }); 
    
    
    app.post('/api/athlete', function(req, res, next) {
		console.log("Loading: " + JSON.stringify(req.body, null, 2));
		console.log("Race date :"+ req.body.race_date);
		var dateObj = new Date(req.body.race_date);
		var sYear = dateObj.getUTCFullYear();
		var sMonth = dateObj.getUTCMonth();
		var sDay = '';
		var sDay = dateObj.getDate() + '';
		var newDate = new Date(sYear,sMonth,sDay);
		console.log("New Race date :"+ newDate);
		var CheckMonth = sMonth + 1;
		var uid = sYear + "." + CheckMonth + "." + sDay + "-" + req.body.race_distance;
		var start = new Date();
		start.setHours(0,0,0,0);

		var end = new Date();
		end.setHours(23,59,59,999);

        // create a doctor, information comes from AJAX request from Angular
        Race.create({
				race_tag: req.body.race_tag,
				race_date: newDate,
				race_id: uid,
				race_distance: req.body.race_distance,
        }, function(err, athlete) {
            if (err)
                res.send(err);
			console.log("Creating: " + JSON.stringify(req.body, null, 2));
            // get and return all the doctors after you create another
            Race.find({race_date: {$gte: start, $lt: end}},
				function(err, athletes) {
                if (err)
                    res.send(err)
                res.json(athletes);
            });
        });

    });
    
     app.get('/api/history/:race_tag', function(req, res, next) {
		console.log('Param: ' + req.params.race_id);
		console.log('Body: ' + JSON.stringify(req.params, null, 2));
		
	
				const pipeline = [ { $match: { "race_tag" : req.params.race_tag} }, 
				{$project : {race_tag:1,race_id:1,race_start:1,race_date:1,race_distance:1,race_end:1,"race_time" : { '$subtract' : [ "$race_end", "$race_start" ] }}} ];  
				
				connection.collection("races").aggregate(pipeline).toArray()
				.then(function(memberDetails) {
 
					
					
				console.log(memberDetails);
				
				res.json(memberDetails); // return all memberDetails in JSON format
					
				})
				.catch(function(err) {
					res.json(err);
		});
	});
    
     app.get('/api/raceDetails/:race_id', function(req, res, next) {
		console.log('Param: ' + req.params.race_id);
		console.log('Body: ' + JSON.stringify(req.params, null, 2));
		
	
				const pipeline = [ { $match: { "race_id" : req.params.race_id} }, { $lookup: {from: "members", localField: "race_tag", foreignField: "mb_tag", as: "MemberDetails",} }, 
				{$project : {"MemberDetails.mb_fname":1,"MemberDetails.mb_sname":1,"MemberDetails.mb_ASA":1,race_tag:1,race_start:1,race_end:1,"race_time" : { '$subtract' : [ "$race_end", "$race_start" ] }}} ];  
				
				connection.collection("races").aggregate(pipeline).toArray()
				.then(function(memberDetails) {
 
					
					
				console.log(memberDetails.length);			
				console.log("Returning memberDetails Values: " + JSON.stringify(memberDetails, null, 2));

				var xml = xmlify(memberDetails,{ root: 'memberDetails', xmlDeclaration: true});
				console.log(xml);
				
				res.json(memberDetails); // return all memberDetails in JSON format
					
				})
				.catch(function(err) {
					res.json(err);
		});
	});
    
    
    
                // update member details
    app.put('/api/member/:mb_ID/:mb_fname/:mb_sname/:mb_email/:mb_ASA/:mb_5kmAvg/:mb_tag/:mb_title', function(req, res, next) {
		console.log("Updating: " + req.params.mb_ID);
		console.log("Params: " + JSON.stringify(req.params, null, 2));
		console.log("Test: " + req.originalUrl);


        if (req.params.mb_5kmAvg.length > 10) {
			kmAvg = req.params.mb_5kmAvg
		} else {
			
			var StaggerArray = req.params.mb_5kmAvg.split(":");
			
			
			var kmAvg = new Date();
		
			kmAvg.setHours(StaggerArray[0]);
			kmAvg.setMinutes(StaggerArray[1]);
			kmAvg.setSeconds(StaggerArray[2]);
		}
		
        Member.updateOne(
			{ 
				"mb_ID"	:req.params.mb_ID  },
			{ 
				$set: {
			
			"mb_tag"		: req.params.mb_tag,		
			"mb_fname" 		: req.params.mb_fname,
			"mb_sname" 		: req.params.mb_sname,
			"mb_email"		: req.params.mb_email,
			"mb_ASA"		: req.params.mb_ASA,
			"mb_5kmAvg" 	: kmAvg,
			
				}
			}
        , function(err, member) {
			if (err) {
                res.send(err);
			} else { 
					Member.find(function(err, members) {
					}).sort({
					mb_tag : 'asc'})
			.then(function(members) {
						res.json(members); // return all members in JSON format
							
						})
						.catch(function(err) {
							res.json(err);
				});
			}			
					
        });
    });
    
    
                // update member details
    app.put('/api/memberprofile/:mb_ID/:mb_fname/:mb_sname/:mb_email/:mb_ASA/:mb_5kmAvg/:mb_tag/:mb_title/:mb_address/:mb_telnum', function(req, res, next) {
		console.log("Updating: " + req.params.mb_ID);
		console.log("Params: " + JSON.stringify(req.params, null, 2));
		console.log("Test: " + req.originalUrl);


        if (req.params.mb_5kmAvg.length > 10) {
			kmAvg = req.params.mb_5kmAvg
		} else {
			
			var StaggerArray = req.params.mb_5kmAvg.split(":");
			
			
			var kmAvg = new Date();
		
			kmAvg.setHours(StaggerArray[0]);
			kmAvg.setMinutes(StaggerArray[1]);
			kmAvg.setSeconds(StaggerArray[2]);
		}
		
        Member.updateOne(
			{ 
				"mb_ID"	:req.params.mb_ID  },
			{ 
				$set: {
			
			"mb_tag"		: req.params.mb_tag,
			"mb_address"	: req.params.mb_address,
			"mb_telnum"	: req.params.mb_telnum,
			
			"mb_fname" 		: req.params.mb_fname,
			"mb_sname" 		: req.params.mb_sname,
			"mb_email"		: req.params.mb_email,
			"mb_ASA"		: req.params.mb_ASA,
			"mb_5kmAvg" 	: kmAvg,
			
				}
			}
        , function(err, member) {
			if (err) {
                res.send(err);
			} else { 
					Member.findOne(
					{mb_ID : req.params.mb_ID},
					function(err, members) {
					})
			.then(function(members) {
						res.json(members); // return all members in JSON format
							
						})
						.catch(function(err) {
							res.json(err);
				});
			}			
					
        });
    });
    
    
                    // update a race
    app.put('/api/athlete/:race_id', function(req, res, next) {
	
		console.log("Updating : " + JSON.stringify(req.params.race_id, null, 2));
		var dateObj = new Date();
		

	    Race.updateMany(
			{	race_id: { $in  : req.params.race_id}
			},
			{ 
				$set: 	{ 
							"race_start" : dateObj
						} 
			}
			
			
        , function(err, service) {
            if (err) {
                res.send(err);
			} else {
				 Race.aggregate([
        
						{
							$match: { "race_id": req.params.race_id }
						},

						{ 
							$group: {	_id: { race_date: "$race_date" , race_distance: "$race_distance",race_start: "$race_start", race_id: "$race_id" }, numberofathletes:{$sum:1}}
						},
				
        
						
						{
							$sort:{"race_date":1}
						}
					   ]
				   )
				.then(function(race) {
 
					
					
				console.log(race.length);			
				console.log("Returning Athlete Values: " + JSON.stringify(race, null, 2));

				var xml = xmlify(race,{ root: 'Race', xmlDeclaration: true});
				//console.log(xml);
				
				res.json(race); // return race in JSON format
					
				})
						.catch(function(err) {
							res.json(err);
				});
			}
		    });
	});
	
		

		
	 app.put('/api/athleteFinish/:race_tag/:race_id', function(req, res, next) {
		var deferred = Q.defer();
		 
		console.log("Updating Race Finisher : " + req.params.race_tag);
		var dateObj = new Date();
		
		 Race.updateOne(
			{	
				
				 $and: [{ "race_tag" : req.params.race_tag}, {"race_id":req.params.race_id }]  
			},
			{ 
				$set: 	{ 
							"race_end" : dateObj
						} 
			},
			{
				upsert : true
				
				}
			
			
        ,function(err, result) {
			if (err) {
                deferred.reject(err);
			} else {
					console.log("WriteResult: " + JSON.stringify(result, null, 2));
					Member.findOne(
					{mb_tag : req.params.race_tag},
					function(err, members) {
					})
			.then(function(members) {
						response = { members, result};
						console.log(response);
						res.json(response); // return all members in JSON format
						deferred.resolve();
							
						})
						.catch(function(err) {
							deferred.reject(err);
				});
			}
			return deferred.promise;
		    });
	});
	
	
	 app.post('/api/createStaggeredAthlete/:race_tag/:race_id', function(req, res, next) {
	
		console.log("Creating Race Finisher : " + req.params.race_tag);
		
		var dateObj = new Date(req.body.race_date);
		var sYear = dateObj.getUTCFullYear();
		var sMonth = dateObj.getUTCMonth();
		var sDay = '';
		var sDay = dateObj.getDate() + '';
		var newDate = new Date(sYear,sMonth,sDay);
		console.log("New Race date :"+ newDate);
		var CheckMonth = sMonth + 1;
		var uid = sYear + "." + CheckMonth + "." + sDay + "-" + req.body.race_distance;
		var start = new Date();
		start.setHours(0,0,0,0);

		var end = new Date();
		end.setHours(23,59,59,999);

        // create a doctor, information comes from AJAX request from Angular
        Race.create({
				race_tag: req.body.race_tag,
				race_date: newDate,
				race_end : newDate,
				race_id: uid,
				race_distance: "SS",
        }, function(err, athlete) {
           if (err) {
                res.send(err);
			} else {
				res.send(200);
			}
		});
	});
     
     
 
     app.post('/api/memberdetail', function(req, res, next) {

        // create a memberdetail, information comes from AJAX request from Angular
        MemberDetails.create({
				mb_ID: req.body.mb_ID,
				mb_post_add1: req.body.mb_post_add1,
				mb_post_add2: req.body.mb_post_add2,
				mb_post_code: req.body.mb_post_code,
				mb_pay_mac: req.body.mb_pay_mac,
				mb_pay_asa:  req.body.mb_pay_asa,	
				mb_pay_clothing:  req.body.mb_pay_clothing,
								
        }, function(err, member) {
            if (err)
                res.send(err);
			console.log("Creating: " + JSON.stringify(req.body, null, 2));

            MemberDetails.find(function(err, members) {
                if (err)
                    res.send(err)
                res.json(members);
            });
        });

    });
    
            // delete a member
    app.delete('/api/member/:member_id', function(req, res, next) {
		console.log("Delete: " + JSON.stringify(req.params, null, 2));
        Member.remove({
            _id : req.params.member_id
        }, function(err, member) {
            if (err)
                res.send(err);

            // get and return all the resources after you create another
            Member.find(function(err, members) {
                if (err)
                    res.send(err)
                res.json(members);
            });
        });
    });
    
    

 
 
 
   


   	var testDate = new Date();
	
	var checkPatients = function(res){
		 console.log('Test');

		return 1;
	}




	const options = {
		key: fs.readFileSync('key.pem'),
		cert: fs.readFileSync('cert.pem')
	}


///////////////////////////////////
///////////////////// Shopping cart
///////////////////////////////////


    app.get('/api/shop', function(req, res, next) {
        // use mongoose to get all questions in the database
               Product.find(function(err, products) {

                   // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                   if (err)
                       res.send(err)
       		    console.log("Returning values: " + JSON.stringify(products, null, 2));
       		    res.json(products); // return all questions in JSON format
               });
    });










    // listen (start app with node server.js) ======================================
    
    
    http2.createServer(options,app).listen(3301,  function ( err , result ) {
    //app.listen(3301,  function ( err , result ) {
    if (err) {
		console.log("Fucking Error: " + err);
	} else { 
		console.log("Running fine for now.");
		
		
	}}
	);
	console.log(app.settings );
    console.log("App listening on port 3301");
    
    const client = new NTP('0.za.pool.ntp.org', 123, { timeout: 5000 });
 

	client
	.syncTime()
	.then(time => console.log(time)) // time is the whole NTP packet
	.catch(console.log);


	/*const req2 = http2.request(options2, function (res) {
		 // console.log(req);	
		  const chunks = [];

		  res.on("data", function (chunk) {
			chunks.push(chunk);
		  });

		  res.on("end", function () {
			const body = Buffer.concat(chunks);
			bodyText = JSON.parse(body.toString());
			console.log("Body: ***" + body.toString() + "***");
			});
		});
		
	req2.write(qs.stringify({client_id: '7OgXqeY802BYitJQZDDBz0dhQ4MsOg4S', client_secret: 'Pu5xRam6hEXsi3jR'}));
			
	req2.end();
		*/

