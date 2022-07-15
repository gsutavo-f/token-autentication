const db = require('../../database');

module.exports = {
   add: post => {
      return new Promise((resolve, reject) => {
         db.run(`
            INSERT INTO posts (
                title, 
                content
            ) VALUES (?, ?)
      `, [post.title, post.content], error => {
            if (error) {
               return reject('Error adding post!');
            }
            return resolve();
         });
      });
   },

   list: () => {
      return new Promise((resolve, reject) => {
         db.all(`SELECT * FROM posts`, (error, results) => {
            if (error) {
               return reject('Error listing posts!');
            }
            return resolve(results);
         });
      });
   }
};
