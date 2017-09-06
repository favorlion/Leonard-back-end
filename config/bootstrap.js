/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  var CronJob = require('cron').CronJob;
  var job = new CronJob('00 00 00 * * *', function() {
  	User.update({},{'profile_views_remaining_today':'500','connection_requests_remaining_today':'500'}).exec(function(){
  		console.log("Done resetting view and requests count");
  	})
  	// User.update({remaining_today:500}, [], function(){
  	// 	console.log("Updated remaining_today for all users");
  	// });
  }, function(){
  	console.log("OMG!\nReset count job stopped.")
  },true);

  cb();
};
