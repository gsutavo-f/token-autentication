const User = require('./users-model');
const jwt = require('jsonwebtoken');
const {InvalidArgumentError, InternalServerError} = require('../errors');
const blacklist = require('../../redis/manipulte-blacklist');

function createJWTToken(user) {
   const payload = {
      id: user.id
   };
   return jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '15m'});
}

module.exports = {
   add: async (req, res) => {
      const {name, email, password} = req.body;
      try {
         const user = new User({
            name,
            email
         });
         await user.addPassword(password);
         await user.add();
         res.status(201).json();
      } catch (error) {
         if (error instanceof InvalidArgumentError) {
            res.status(422).json({error: error.message});
         } else if (error instanceof InternalServerError) {
            res.status(500).json({error: error.message});
         } else {
            res.status(500).json({error: error.message});
         }
      }
   },

   login: (req, res) => {
      const token = createJWTToken(req.user);
      res.set('Authorization', token);
      res.status(204).json();
   },

   logout: async (req, res) => {
      try {
         const token = req.token;
         await blacklist.add(token);
         res.status(204).send();
      } catch (error) {
         res.status(500).json({error: error.message});
      }
   },

   list: async (req, res) => {
      const users = await User.list();
      res.json(users);
   },

   delete: async (req, res) => {
      const user = await User.findById(req.params.id);
      try {
         await user.delete();
         res.status(200).send();
      } catch (error) {
         res.status(500).json({error: error});
      }
   }
};
