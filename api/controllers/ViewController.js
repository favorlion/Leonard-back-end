/**
 * ViewController
 *
 * @description :: Server-side logic for managing views
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	_config: { actions: false, rest: false, shortcuts: false },

	addView : function(req, res, next){
		var user_id = req.param('user_id');
		var viewObj = {
			user_id : user_id,
			viewed_linkedin_profile_id : req.param('viewed_linkedin_profile_id'),
			date_viewed : new Date(),
			firstname : req.param('firstname'),
			lastname : req.param('lastname'),
			email : req.param('email'),
			phone : req.param('phone'),
			country : req.param('country'),
			industry : req.param('industry'),
			websites : req.param('websites'),
			current_companies : req.param('current_companies'),
			birthday : req.param('birthday'),
			twitter_accounts : req.param('twitter_accounts'),
			viewed_linkedin_profile_url : req.param('viewed_linkedin_profile_url')
		};
		View.create(viewObj, function viewCreated(err, view){
			if(err) {
				return res.send(400, err);
			}
			if(view){
				view.success = '1';
				User.findOne(req.param('user_id'), function foundUser(err, user){
					if(err) return next(err);
					var rem_today = parseInt(user.profile_views_remaining_today);
					rem_today--;
					user.profile_views_remaining_today = rem_today.toString();
					user.save(function(error, user){
						if(rem_today == 0){
							return res.send(200, {"error":"You\'ve completed your views for today!"});
						} else {
							return res.send(200, {"success":"1","message":"Views updated"});
						}
					})
				});
				/*second method*/
				// User.native(function(error, col){
				// 	if(error) return res.send(400, error)
				// 	col.findAndModify({
				// 		_id : user_id
				// 	},{
				// 		$inc : {
				// 			remaining_today : -1
				// 		}
				// 	},{
				// 		new : true,
				// 		upsert : true
				// 	},function(db_err, data){
				// 		return res.send(200, view);
				// 	})
				// })
			}
		})
	},

	updateView : function(req, res, next){
		var viewObj = {
			user_id : req.param('user_id'),
			viewed_linkedin_profile_id : req.param('viewed_linkedin_profile_id'),
			date_viewed : new Date(),
			firstname : req.param('firstname'),
			lastname : req.param('lastname'),
			email : req.param('email'),
			phone : req.param('phone'),
			country : req.param('country'),
			industry : req.param('industry'),
			websites : req.param('websites'),
			current_companies : req.param('current_companies'),
			birthday : req.param('birthday'),
			twitter_accounts : req.param('twitter_accounts'),
			viewed_linkedin_profile_url : req.param('viewed_linkedin_profile_url')
		};
		View.update(req.param('view_id'),viewObj).exec(function(err, updatedRecs){
			if(err) return res.send(400, err);
			if(updatedRecs){
				updatedRecs.success = '1';
				return res.send(200, updatedRecs);
			}
		})
	},

	getViews : function(req, res, next){
		View.find({"user_id":req.param("user_id")}).exec(function(err, views){
			var resp = {};
			if(err) return res.send(400, err);
			if(views){
				resp.success = '1';
				resp.views = views;
				return res.send(200, resp);
			}
		})
	}
};

