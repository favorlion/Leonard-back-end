/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcrypt');
const DEFAULT_SALT_ROUNDS = 8;

module.exports = {
	_config: { actions: false, rest: false, shortcuts: false },

	login : function AuthUser(req, res, next){
		var restReq = req.param('rest');
		User.findOneByEmail(req.param('email'), function foundUser(error, user){
			if(error){
				if(restReq){
					return res.send(400, error);
				} else {
					req.session.flash = {
						err : error
					};
					return res.redirect('/login');
				}
			}
			if(!user){
				if(restReq){
					return res.send(400, {
						error : 'Email / password is incorrect'
					});
				} else {
					var err = {
						'message' : 'Email / password is incorrect'
					};
					req.session.flash = {
						err : err
					}
					return res.redirect('/login');
				}
			}
			bcrypt.compare(req.param('password'), user.password, function(err, valid){
				if(valid){
					req.session.flash = {};
					if(restReq){
						user.success = '1';
						delete user.password;
						// console.log(user);
						return res.send(200, user);
					} else {
						req.session.authenticated = true;
						return res.redirect('https://www.linkedin.com/');
					}
				} else {
					var err = {
						'message' : 'Email / password is incorrect'
					};
					if(restReq){
						return res.send(400, err);
					} else {
						req.session.flash = {
							err : err
						}
						return res.redirect('/login');
					}
				}
			})
		});
	},
	
	logout : function logoutUser(req, res, next){
		req.session.authenticated = false;
		return res.redirect('/login');
	},

	forgotPassword : function forgotPassword(req, res, next){
		// send mail 
		req.session.flash = {
			success : {
				message : 'Your new password is sent to your email address'
			}
		}
		return res.redirect('/login');
	},

	addUser : function CreateUser(req, res, next){
		var userObj = {
			firstname : req.param('firstname'),
			email : req.param('email'),
			password : req.param('password'),
			date_joined : new Date(),
			linkedin_profile_id : req.param('linkedin_profile_id'),
			linkedin_profile_url : req.param('linkedin_profile_url'),
			user_type : req.param('user_type') || 'Paid'
		};
		if(userObj.user_type == 'Free'){
			userObj.profile_views_remaining_today = 500;
			userObj.connection_requests_remaining_today = 0;
		} else {
			userObj.profile_views_remaining_today = 500;		// for Admin and Paid also
			userObj.connection_requests_remaining_today = 500;
		}
		
		if(req.param('password') != req.param('confirmPassword')){
			req.session.flash = {
				err : {
					message : 'Password and Confirm password doesn\'t match.'
				}
			};
			return res.redirect('/signup');
		}

		var restReq = req.param('rest');

		bcrypt.hash(req.param('password'), DEFAULT_SALT_ROUNDS, function(err, hash){
			userObj.password = hash;
			User.create(userObj, function userCreated(err, user) {
				if(err) {
					// console.log(JSON.stringify(err));
					req.session.flash = {
						err : err
					};
					return res.redirect('/signup');
				}
				if(user){
					if(restReq){
						user.success = '1';
						return res.send(200, user);
					} else {
						req.session.flash = {
							success : {
								message : 'Your account has been created.<br />Please login with the credentials.'
							}
						};
						return res.redirect('/login');
					}
				}
			});
		})
	},

	getUsers : function getUsers(req, res, next){
		User.find(function foundUsers(err, users){
			if(err) return next(err);
			if (!users) return next('User doesn\'t exist.');
			res.view({
				users : users
			})
		})
	},

	getUser : function(req, res, next){
		User.findOne(req.param('user_id'), function foundUser(err, user){
			if(err) return next(err);
			if (!user) return next('User doesn\'t exist.');
			delete user.password;
			res.json(200,{user: user});
		})
	},

	resetFlash : function(req, res, next){
		// console.log(res.locals.flash);
		next();
	}
};




// req.session.user = user;
// req.logIn(user, function(){
// 	res.redirect('/');
// })
