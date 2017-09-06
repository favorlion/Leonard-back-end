/**
 * TagController
 *
 * @description :: Server-side logic for managing tags
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
        _config: { actions: false, rest: false, shortcuts: false },

/*
        addTag : function(req, res, next){
            var tagObj = {
                user_id : req.param('user_id'),
                tag_name : req.param('tag_name'),
                connection_id : req.param('connection_id')
            };
            // one connection, many tags
            if(tagObj.connection_id){
                Tag.findOne({connection_id:tagObj.connection_id}, function(err, tag){
                    if(tag == null){
                        Tag.create(tagObj, function(cerr, ctag){
                            if(cerr) {
                                return res.send(400, cerr);
                            }
                            return res.send(200, {"success":"1","message":"Tag Created"});
                        })
                    } else {
                        tag.tag_name = tagObj.tag_name;
                        tag.save(function(){
                            return res.send(200, {"success":"1","message":"Tag updated"});
                        });
                    }
                });
            }
        },
*/

	addTag : function(req, res, next){
		var tagObj = {
			user_id : req.param("user_id"),
			tag_name : req.param("tag_name")
		}
		Tag.findOne({tag_name:tagObj.tag_name,user_id:req.param('user_id')}, function(err, tag){
			if(err) return res.send(400, err);
			if(tag) return res.send(200, {"success":"0","message":"Tag already exists"});
			else {
				Tag.create(tagObj, function(cerr, ctag){
		                    if(cerr) return res.send(400, cerr);
		                    return res.send(200, {"success":"1","message":"Tag Created"});
		                })
			}
		});
	},

        getTagsOfConn : function(req, res, next){
                Tag.find({"user_id":req.param("user_id"),"connection_id":req.param("connection_id")}).exec(function(err, tags){
                        var resp = {};
                        if(err) return res.send(400, err);
                        if(tags){
                                resp.success = '1';
                                resp.tags = tags;
                                return res.send(200, resp);
                        }
                })
        },

        getTagsOfUser : function(req, res, next){
                Tag.find({"user_id":req.param("user_id")}).exec(function(err, tags){
                        var resp = {};
                        if(err) return res.send(400, err);
                        if(tags){
                                resp.success = '1';
                                resp.tags = tags;
                                return res.send(200, resp);
                        }
                })
        },

        removeTag : function(req, res, next){
                Tag.destroy(req.param('tag_id')).exec(function(err, temp){
                        if(err) return res.send(400, err);
                        temp.success = "1";
                        return res.send(200, temp);
                })
        }
};


