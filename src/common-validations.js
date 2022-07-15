const { InvalidArgumentError } = require('./errors');


module.exports = {
  textFieldNotNull: (value, name) => {
    if (typeof value !== 'string' || value === 0)
      throw new InvalidArgumentError(`It is necessary to fill the field ${name}!`);
  },

  fieldMinimumLength: (value, name, minimum) => {
    if (value.length < minimum)
      throw new InvalidArgumentError(
        `The field ${name} needs to be bigger than ${minimum} characters!`
      );
  },

  fieldMaximumLength: (value, name, maximum) => {
    if (value.length > maximum)
      throw new InvalidArgumentError(
        `The field ${name} needs to be smaller than ${maximum} characters!`
      );
  }
};
