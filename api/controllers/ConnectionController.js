/**
 * ConnectionController
 *
 * @description :: Server-side logic for managing connections
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    _config: {
        actions: false,
        rest: false,
        shortcuts: false
    },

    addConnection: function(req, res, next) {
        var connectionObj = {
            user_id: req.param('user_id'),
            c_name: req.param('c_name'),
            c_profile_url: req.param('c_profile_url'),
            c_public_id: req.param('c_public_id'),
	    c_member_id: req.param('c_member_id'),
            date_conn_sent: new Date(),
            date_accepted: new Date(),
            invitation_message: req.param('invitation_message'),
            follow_up_message: req.param('follow_up_message'),
            is_accepted: 'false'
        };
        Connection.create(connectionObj, function(err, conn) {
            if (err) return res.send(400, err);
            if (conn) {
                User.findOne(req.param('user_id'), function foundUser(err, user) {
                    if (err) return next(err);
                    var rem_today = parseInt(user.connection_requests_remaining_today);
                    rem_today--;
                    user.connection_requests_remaining_today = rem_today.toString();
                    user.save(function(error, user) {
                        if (rem_today == 0) {
                            conn.success = '1';
                            conn.message = "You\'ve completed your views for today!";
                            return res.send(200, conn);
                        } else {
                            conn.success = '1';
                            return res.send(200, conn);
                        }
                    })
                });
            }
        })
    },

    updateConnection: function(req, res, next) {
        Connection.findOne(req.param('connection_id'), function foundConn(err, conn) {
	    conn.follow_up_message = req.param('follow_up_message');
            conn.save(function() {
                return res.send(200, {
                    "success": "1",
                    "message": "Connection updated"
                });
            })
        })

    },

    acceptedConnection: function(req, res, next){
	Connection.findOne(req.param('connection_id'), function foundConn(err, conn){
	    conn.is_accepted = 'true';
	    conn.date_accepted = new Date();
	    conn.save(function(){
		return res.send(200, {
		    "success" : "1",
		    "message" : "Connection invitation updated"
		})
	    })
	});
    },

    getConnections: function(req, res, next) {
        var searchRes = Connection.find({
            "user_id": req.param("user_id")
        });
	searchRes.sort("date_accepted DESC");
	searchRes.exec(function(err, conns) {
            var resp = {};
            if (err) return res.send(400, err);
            if (conns) {
                resp.success = '1';
                resp.conns = conns;
                return res.send(200, resp);
            }
        })
    },

    removeConnection: function(req, res, next) {
	Connection.findOne(req.param('connection_id'), function foundConn(err, conn){
		if(err) return res.send(400, err);
		conn.is_accepted = 'removed';
		conn.save(function(){
			return res.ok();
		})
	});
	/*
	Connection.destroy(req.param('connection_id')).exec(function(err){
		if(err) return res.send(400, err);
		return res.ok();
	});
	*/
	/*
	Connection.findOne(req.param('connection_id'), function(err, rec){
		if(err) return res.send(400, err);
		console.log(rec);
		return false;
		rec.remove().exec(function(){
			return res.send(200,{
				"success" : "1",
				"deleted" : rec
			})
		})
	})
	*/
    },
    
    removeConnections: function(req, res, next){
	Connection.update({is_accepted:'true',user_id:req.param('user_id')},{is_accepted:'removed'}).exec(function(err, rem){
		if(err) return res.send(400, err);
		return res.send(200, {
			"success" : "1",
			"removed" : rem
		})
	})
	/*
	Connection.destroy({'is_accepted':true,'user_id':req.param('user_id')}).exec(function(err, removedIds){
	    if(err) return res.send(400, err);
	    return res.send(200,{'success': removedIds});
	})
	*/
    },

    removeConnectionsById: function(req, res, next){
	var conn_ids = req.param('conn_ids');
	if(conn_ids){
	    conn_ids = conn_ids.split(',');
	} else {
	    conn_ids = [];
	}
	try{
	    var conn_ids_str = JSON.stringify(conn_ids);
	    console.log(conn_ids_str);
	    /*
	    Connection.find(conn_ids_str[0], function(err, resp){
		if(err) return res.send(400, err)
		return res.send(200, resp);
	    })
	    */
	    /*
	    Connection.native(function(err, collection){
	        if(err) return res.serverError(err);
	        collection.find({'_id':{$in:conn_ids_str}}).toArray(function(error, results){
	 	    if(error) return res.serverError(error);
		    return res.send(200,results);
	        })
	    });
	    */
	    /* 
	    Connection.find({_id:conn_ids_str}).exec(function(err, res){
		console.log(res);
		if(err) return res.send(400, err);
		return res.send(200, res);
	    })
	    */
	    Connection.find({
		user_id: req.param("user_id"),
		c_public_id : ["debbieireland", "dimartinobooth"]
	    }).exec(function(err, resp){
		console.log(resp)
	    })
	} catch(err){
	    console.log(err);
	}
    }
};



