/**
 * Connection.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	schema : true,
	autoCreatedAt : false,
	autoUpdatedAt : false,

	attributes: {
  		user_id : {
	  		type : 'string',
	  		required : true
	  	},
	  	c_name : {
	  		type : 'string',
	  		required : true
	  	},
		c_profile_url : {
			type : 'string',
			required : true
		},
		c_public_id : {
			type : 'string',
			required : true
		},
		c_member_id : {
			type : 'string',
			required : true
		},
	  	date_conn_sent : {
	  		type : 'datetime'
	  	},
	  	date_accepted : {
	  		type : 'datetime'
	  	},
		invitation_message : {
			type : 'string',
			required : true
		},
		follow_up_message : {
			type : 'string'
		},
	  	is_accepted : {
	  		type : 'string',
  			enum : ['true', 'false', 'removed'],
  			defaultsTo : 'false'
	  	}
	}
};

