const passport = require('passport');
const posts = require('./src/posts');
const users = require('./src/users');

module.exports = app => {
  app.use(passport.initialize());
  app.get('/', (req, res) => {res.send('Olá pessoa!')});
  posts.routes(app);
  users.routes(app);
};