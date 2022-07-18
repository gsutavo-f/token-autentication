module.exports = {
  routes: require('./users-routes'),
  controller: require('./users-controller'),
  model: require('./users-model'),
  authenticationStrategies: require('./authentication-strategies'),
  middlewaresAuthentication: require('./middlewares-authentication')
}