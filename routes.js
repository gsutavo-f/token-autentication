const passport = require('passport');
const posts = require('./src/posts');
const users = require('./src/users');

module.exports = app => {
  app.use(passport.initialize());
  app.get('/', (req, res) => {res.send('This is your server :)!')});
  posts.routes(app);
  users.routes(app);
};