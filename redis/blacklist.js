// quando o usuário fizer o logout colocaremos o seu token em uma blacklist
// afim de invalidar este token até que o tempo de expiração chegue

const redis = require('redis');

let redisClient;
redisClient = redis.createClient(6379, "127.0.0.1", { prefix: "blacklist:" });
redisClient.on("connect", () => console.log("Connected to Redis!"));
redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.connect();

module.exports = redisClient;