const usersDao = require('./users-dao');
const { InvalidArgumentError } = require('../errors');
const validations = require('../common-validations');
const bcrypt = require("bcrypt");

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.hashPassword = user.hashPassword;

    this.validation();
  }

  async add() {
    if (await User.findByEmail(this.email)) {
      throw new InvalidArgumentError('User already exists!');
    }

    return usersDao.add(this);
  }

  async addPassword(password) {
    validations.textFieldNotNull(password, 'password');
    validations.fieldMinimumLength(password, 'password', 8);
    validations.fieldMaximumLength(password, 'password', 64);
    this.hashPassword = await User.generateHashPassword(password);
  }

  validation() {
    validations.textFieldNotNull(this.name, 'name');
    validations.textFieldNotNull(this.email, 'email');
  }
  
  async delete() {
    return usersDao.delete(this);
  }
  
  static async findById(id) {
    const user = await usersDao.findById(id);
    if (!user) {
      return null;
    }
    
    return new User(user);
  }
  
  static async findByEmail(email) {
    const user = await usersDao.findByEmail(email);
    if (!user) {
      return null;
    }
    
    return new User(user);
  }

  static list() {
    return usersDao.list();
  }

  static async generateHashPassword(password) {
    const cost = 12;
    return bcrypt.hash(password, cost);
  }

}

module.exports = User;
