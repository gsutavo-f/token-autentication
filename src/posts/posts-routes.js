const postsController = require('./posts-controller');

module.exports = app => {
  app
    .route('/post')
    .get(postsController.lista)
    .post(postsController.adiciona);
};
