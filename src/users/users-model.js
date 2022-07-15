const usersDao = require('./users-dao');
const { InvalidArgumentError } = require('../errors');
const validations = require('../common-validations');
const bcrypt = require("bcrypt");

class User {
  constructor(user) {
    this.id = user.id;
    this.nome = user.nome;
    this.email = user.email;
    this.hashPassword = user.hashPassword;

    this.valida();
  }

  async adiciona() {
    if (await User.findByEmail(this.email)) {
      throw new InvalidArgumentError('O usuário já existe!');
    }

    return usersDao.adiciona(this);
  }

  async addPassword(password) {
    validations.campoStringNaoNulo(password, 'senha');
    validations.campoTamanhoMinimo(password, 'senha', 8);
    validations.campoTamanhoMaximo(password, 'senha', 64);
    this.hashPassword = await User.generateHashPassword(password);
  }

  valida() {
    validations.campoStringNaoNulo(this.nome, 'nome');
    validations.campoStringNaoNulo(this.email, 'email');
  }

  
  async deleta() {
    return usersDao.deleta(this);
  }
  
  static async findById(id) {
    const user = await usersDao.buscaPorId(id);
    if (!user) {
      return null;
    }
    
    return new User(user);
  }
  
  static async findByEmail(email) {
    const user = await usersDao.buscaPorEmail(email);
    if (!user) {
      return null;
    }
    
    return new User(user);
  }

  static lista() {
    return usersDao.lista();
  }

  static async generateHashPassword(password) {
    const cost = 12;
    return bcrypt.hash(password, cost);
  }

}

module.exports = User;
