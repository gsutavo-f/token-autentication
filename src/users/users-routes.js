const usersController = require('./users-controller');
const middlewaresAuthentication = require('./middlewares-authentication');
const passport = require('passport');

module.exports = app => {
   app
      .route('/user/login')
      .post(
         middlewaresAuthentication.local,
         usersController.login
      );

   app
      .route('/user')
      .post(usersController.add)
      .get(usersController.list);

   app.route('/user/:id').delete(
      passport.authenticate('bearer', {session: false}),
      usersController.delete
   );
};
