const User = require('./users-model');
const { InvalidArgumentError, InternalServerError } = require('../errors');

module.exports = {
  adiciona: async (req, res) => {
    const { nome, email, password } = req.body;

    try {
      const user = new User({
        nome,
        email
      });

      await user.addPassword(password);

      await user.adiciona();

      res.status(201).json();
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        res.status(422).json({ error: error.message });
      } else if (error instanceof InternalServerError) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  login: (req, res) => {
    res.status(204).json();
  },

  lista: async (req, res) => {
    const users = await User.lista();
    res.json(users);
  },

  deleta: async (req, res) => {
    const user = await User.findById(req.params.id);
    try {
      await user.deleta();
      res.status(200).send();
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
};
