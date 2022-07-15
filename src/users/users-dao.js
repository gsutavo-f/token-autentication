const db = require('../../database');
const {InternalServerError} = require('../errors');

module.exports = {
   add: user => {
      return new Promise((resolve, reject) => {
         db.run(`
            INSERT INTO users (
                name,
                email,
                hashPassword
            ) VALUES (?, ?, ?)
        `, [user.name, user.email, user.hashPassword], error => {
            if (error) {
               reject(new InternalServerError('Error adding user!'));
            }
            return resolve();
         });
      });
   },

   findById: id => {
      return new Promise((resolve, reject) => {
         db.get(`
            SELECT *
            FROM users
            WHERE id = ?
        `, [id], (error, user) => {
            if (error) {
               return reject('User not found!');
            }
            return resolve(user);
         });
      });
   },

   findByEmail: email => {
      return new Promise((resolve, reject) => {
         db.get(`
            SELECT *
            FROM users
            WHERE email = ?
        `, [email], (error, user) => {
            if (error) {
               return reject('User not found!');
            }
            return resolve(user);
         });
      });
   },

   list: () => {
      return new Promise((resolve, reject) => {
         db.all(`
          SELECT * FROM users
        `, (error, users) => {
            if (error) {
               return reject('Error listing users');
            }
            return resolve(users);
         });
      });
   },

   delete: user => {
      return new Promise((resolve, reject) => {
         db.run(`
          DELETE FROM users
          WHERE id = ?
        `, [user.id], error => {
            if (error) {
               return reject('Error deleting user');
            }
            return resolve();
         });
      });
   }
};
