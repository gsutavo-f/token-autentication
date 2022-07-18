const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const {InvalidArgumentError} = require('../errors');
const User = require('./users-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function verifyUser(user) {
   if (!user) {
      throw new InvalidArgumentError('User not found');
   }
}

async function verifyPassword(password, hashPassword) {
   const validPassword = await bcrypt.compare(password, hashPassword);
   if (!validPassword) {
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
      } catch (error) {
         done(error);
      }
   })
);

passport.use(
   new BearerStrategy(
      async (token, done) => {
         try {
            const payload = jwt.verify(token, process.env.JWT_KEY);
            const user = await User.findById(payload.id);
            done(null, user);
         } catch (error) {
            done(error);
         }
      }
   )
);