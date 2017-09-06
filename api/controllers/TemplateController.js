/**
 * TemplateController
 *
 * @description :: Server-side logic for managing templates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	_config: { actions: false, rest: false, shortcuts: false },

	addTemplate : function(req, res, next){
		var templateObj = {
			user_id : req.param('user_id'),
			template_name : req.param('template_name'),
			template_content : req.param('template_content'),
			template_type : req.param('template_type')
		}
		Template.create(templateObj, function(err, temp){
			if(err) {
				return res.send(400, err);
			}
			return res.send(200, {"success":"1","message":"Template Created"});
		})
	},
	
	updateTemplate : function(req, res, next){
		Template.findOne(req.param('template_id'), function(err, temp){
			temp.template_name = req.param('template_name');
			temp.template_content = req.param('template_content');
			temp.save(function(){
				return res.send(200,{'success':'1', 'message': 'Template updated'});
			})
		})
	},

	getTemplates : function(req, res, next){
		Template.find({"user_id":req.param("user_id"),"template_type":req.param("template_type")}).exec(function(err, templates){
			var resp = {};
			if(err) return res.send(400, err);
			if(templates){
				resp.success = '1';
				resp.templates = templates;
				return res.send(200, resp);
			}
		})
	},

	removeTemplate : function(req, res, next){
		Template.destroy(req.param('template_id')).exec(function(err, temp){
			if(err) return res.send(400, err);
			temp.success = "1";
			return res.send(200, temp);
		})
	}
};

