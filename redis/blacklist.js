// quando o usuário fizer o logout colocaremos o seu token em uma blacklist
// afim de invalidar este token até que o tempo de expiração chegue

const redis = require('redis');
module.exports = redis.createClient({prefix: 'blacklist:'});