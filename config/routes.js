/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  //all get requests

  // 'get /*': 'UserController.resetFlash',
  

  //views

  'get /login': {
    view: 'login'
  },
  'get /signup': {
    view: 'signup'
  },
  'get /forgotpassword': {
    view: 'forgotpassword'
  },
  
  //authentication

  'post /login': 'UserController.login',
  'post /forgotpassword' : 'UserController.forgotPassword',
  '/logout': 'UserController.logout',

  //user

  'post /add_user': 'UserController.addUser',
  'get /users' : 'UserController.getUsers',
  'get /user/:user_id' : 'UserController.getUser',
  '/user' : false,

  //view

  'post /add_view': 'ViewController.addView',
  'post /update_view/:view_id': 'ViewController.updateView',
  'get /get_views/:user_id': 'ViewController.getViews',

  //connection

  'post /add_connection': 'ConnectionController.addConnection',
  'post /remove_connection': 'ConnectionController.removeConnection',
  'post /remove_connections': 'ConnectionController.removeConnections',
  'post /update_connection/:connection_id': 'ConnectionController.updateConnection',
  'post /accepted_connection': 'ConnectionController.acceptedConnection',
  'get /get_connections/:user_id': 'ConnectionController.getConnections',
  'post /remove_connections_by_id': 'ConnectionController.removeConnectionsById',

  //template

  'post /add_template': 'TemplateController.addTemplate',
  'get /get_templates/*': 'TemplateController.getTemplates',
  'post /update_template/:template_id' : 'Templatecontroller.updateTemplate',
  'post /remove_template/:template_id': 'TemplateController.removeTemplate',

  //tag

  'post /add_tag' : 'TagController.addTag',
  'get /get_tags_of_connection/*' : 'TagController.getTagsOfConn',
  'get /get_tags' : 'TagController.getTagsOfUser',
  'post /remove_tag/:tag_id' : 'TagController.removeTag',

  //tagconnection
  'post /add_tag_to_connection' : 'TagConnectionController.addTagsToConnection',
  'get /get_tagged_connections_of_user' : 'TagConnectionController.getTaggedConnectionsOfUser'
};
