const usersController = require('./users-controller');

module.exports = app => {
  app
    .route('/user')
    .post(usersController.adiciona)
    .get(usersController.lista);

  app.route('/user/:id').delete(usersController.deleta);
};
