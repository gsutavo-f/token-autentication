const db = require('../../database');
const {InternalServerError} = require('../errors');

module.exports = {
   adiciona: user => {
      return new Promise((resolve, reject) => {
         db.run(`
            INSERT INTO usuarios (
                nome,
                email,
                senha
            ) VALUES (?, ?, ?)
        `, [user.nome, user.email, user.senha], erro => {
            if (erro) {
               reject(new InternalServerError('Erro ao adicionar o usuário!'));
            }

            return resolve();
         });
      });
   },

   buscaPorId: id => {
      return new Promise((resolve, reject) => {
         db.get(`
            SELECT *
            FROM usuarios
            WHERE id = ?
        `, [id], (erro, usuario) => {
            if (erro) {
               return reject('Não foi possível encontrar o usuário!');
            }

            return resolve(usuario);
         });
      });
   },

   buscaPorEmail: email => {
      return new Promise((resolve, reject) => {
         db.get(`
          SELECT *
          FROM usuarios
          WHERE email = ?
        `, [email], (erro, usuario) => {
            if (erro) {
               return reject('Não foi possível encontrar o usuário!');
            }

            return resolve(usuario);
         });
      });
   },

   lista: () => {
      return new Promise((resolve, reject) => {
         db.all(`
          SELECT * FROM usuarios
        `, (erro, usuarios) => {
            if (erro) {
               return reject('Erro ao listar usuários');
            }
            return resolve(usuarios);
         });
      });
   },

   deleta: user => {
      return new Promise((resolve, reject) => {
         db.run(`
          DELETE FROM usuarios
          WHERE id = ?
        `, [user.id], erro => {
            if (erro) {
               return reject('Erro ao deletar o usuário');
            }
            return resolve();
         });
      });
   }
};
