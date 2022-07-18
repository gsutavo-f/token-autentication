const postsController = require('./posts-controller');
const {middlewaresAuthentication} = require('../users');

module.exports = app => {
   app
      .route('/post')
      .get(postsController.list)
      .post(
         middlewaresAuthentication.bearer,
         postsController.add
      );
};
