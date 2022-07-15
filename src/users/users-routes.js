const usersController = require('./users-controller');
const passport = require('passport');

module.exports = app => {
  app
     .route('/user/login')
     .post(passport.authenticate('local', {session : false}), usersController.login);

  app
    .route('/user')
    .post(usersController.adiciona)
    .get(usersController.lista);

  app.route('/user/:id').delete(usersController.deleta);
};
