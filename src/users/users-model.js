const usersDao = require('./users-dao');
const { InvalidArgumentError } = require('../errors');
const validations = require('../common-validations');

class User {
  constructor(user) {
    this.id = user.id;
    this.nome = user.nome;
    this.email = user.email;
    this.senha = user.senha;

    this.valida();
  }

  async adiciona() {
    if (await User.buscaPorEmail(this.email)) {
      throw new InvalidArgumentError('O usuário já existe!');
    }

    return usersDao.adiciona(this);
  }

  valida() {
    validations.campoStringNaoNulo(this.nome, 'nome');
    validations.campoStringNaoNulo(this.email, 'email');
    validations.campoStringNaoNulo(this.senha, 'senha');
    validations.campoTamanhoMinimo(this.senha, 'senha', 8);
    validations.campoTamanhoMaximo(this.senha, 'senha', 64);
  }

  
  async deleta() {
    return usersDao.deleta(this);
  }
  
  static async buscaPorId(id) {
    const user = await usersDao.buscaPorId(id);
    if (!user) {
      return null;
    }
    
    return new User(user);
  }
  
  static async buscaPorEmail(email) {
    const user = await usersDao.buscaPorEmail(email);
    if (!user) {
      return null;
    }
    
    return new User(user);
  }

  static lista() {
    return usersDao.lista();
  }
}

module.exports = User;
