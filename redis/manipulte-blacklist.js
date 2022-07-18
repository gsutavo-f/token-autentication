const blacklist = require('./blacklist');
const {promisify} = require('util');
const existsAsync = promisify(blacklist.exists).bind(blacklist);
const setAsync = promisify(blacklist.set).bind(blacklist);
const jwt = require('jsonwebtoken');
const {createHash} = require('crypto');

function generateHashToken(token) {
   return createHash('sha256').update(token).digest('hex');
}

module.exports = {
   add: async token => {
      const expirationDate = jwt.decode(token).exp;
      const hashToken = generateHashToken(token);
      await blacklist.set(hashToken, '');
      await blacklist.expireAt(hashToken, expirationDate);
   },
   containToken: async token => {
      const hashToken = generateHashToken(token);
      const result = await blacklist.exists(hashToken);
      return result === 1;
   }
}