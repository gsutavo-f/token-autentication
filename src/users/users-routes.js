const usersController = require('./users-controller');
const middlewaresAuthentication = require('./middlewares-authentication');

module.exports = app => {
   app
      .route('/user/login')
      .post(
         middlewaresAuthentication.local,
         usersController.login
      );

   app
      .route('/user/logout')
      .get(
         middlewaresAuthentication.bearer,
         usersController.logout
      );

   app
      .route('/user')
      .post(usersController.add)
      .get(usersController.list);

   app.route('/user/:id').delete(
      middlewaresAuthentication.bearer,
      usersController.delete
   );
};
