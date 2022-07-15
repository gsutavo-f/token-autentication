const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {InvalidArgumentError} = require('../errors');
const User = require('./users-model');
const bcrypt = require('bcrypt');

function verifyUser(user) {
   if(!user) {
      throw new InvalidArgumentError('User not found');
   }
}

async function verifyPassword(password, hashPassword) {
   const validPassword = await bcrypt.compare(password, hashPassword);
   if(!validPassword) {
      throw new InvalidArgumentError('Invalid password or email');
   }
}

passport.use(
   new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      session: false
   }, async (email, password, done) => {
      try {
         const user = await User.findByEmail(email);
         verifyUser(user);
         await verifyPassword(password, user.hashPassword);
         done(null, user);
      } catch(error) {
         done(error);
      }
   })
);