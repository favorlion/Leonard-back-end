/**
 * View.js
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
  	viewed_linkedin_profile_id : {
  		type : 'string',
  		required : true
  	},
  	date_viewed : {
  		type : 'datetime',
  		required : true
  	},
    firstname : {
      type : 'string'
    },
    lastname : {
      type : 'string'
    },
    email : {
      type : 'string'
    },
    phone : {
      type : 'string'
    },
    country : {
      type : 'string'
    },
    industry : {
      type : 'string'
    },
    websites : {
      type : 'string'
    },
    current_companies : {
      type : 'string'
    },
    birthday : {
      type : 'string'
    },
    twitter_accounts : {
      type : 'string'
    },
    viewed_linkedin_profile_url : {
      type : 'string'
    }
  }
};

