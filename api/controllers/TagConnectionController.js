/**
 * TagConnectionController
 *
 * @description :: Server-side logic for managing Tagconnections
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addTagsToConnection : function(req, res, next){
		var tcObj = {
			connection_id : req.param("connection_id"),
			tags : req.param("tags"),
			user_id : req.param("user_id")
		}
		TagConnection.findOne({connection_id:tcObj.connection_id,user_id:tcObj.user_id}, function(err, tagConn){
			if(tagConn == null){
				TagConnection.create(tcObj, function(cerr, ctagConn){
					if(cerr) return res.send(400, cerr);
					return res.send(200, ctagConn);
				})
			} else {
				tagConn.tags = tcObj.tags;
				tagConn.save(function(){
					return res.send(200, {"success":"1", "message":"TagConnection updated"})
				})
			}
		})
	},
	
	getTaggedConnectionsOfUser : function(req, res, next){
		TagConnection.find({user_id:req.param("user_id")}, function(err, tagConns){
			if(err) return res.send(400, err);
			tagConns.success = "1";
			tagConns.message = "List of Tagged Connections";
			return res.send(200, tagConns);
		})
	}
};

