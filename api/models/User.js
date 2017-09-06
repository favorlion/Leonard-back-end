/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	schema : true,
	autoCreatedAt : false,
	autoUpdatedAt : false,

  attributes: {
  	firstname : {
  		type : 'string',
  		required : true
  	},
  	email : {
  		type : 'email',
  		unique : true,
  		required : true
  	},
  	password : {
  		type : 'string',
  		required : true
  	},
  	date_joined : {
  		type : 'datetime',
  		required : true
  	},
  	linkedin_profile_id : {
  		type : 'string',
  		required : true
  	},
  	linkedin_profile_url : {
  		type : 'string',
  		required : true
  	},
  	user_type : {
  		type : 'string',
  		enum : ['Free', 'Paid', 'Admin'],
  		defaultsTo : 'Free',
  		required : true
  	},
    profile_views_remaining_today : {
      type : 'string',
      required : true
    },
    connection_requests_remaining_today : {
      type : 'string',
      required : true
    }
  },
  toJSON: function() {
    var obj = this.toObject();
    delete obj.password;
    delete obj._csrf;
    return obj;
  }
};

