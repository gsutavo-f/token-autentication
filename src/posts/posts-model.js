const postsDao = require('./posts-dao');
const validations = require('../common-validations');

class Post {
  constructor(post) {
    this.title = post.title;
    this.content = post.content;
    this.validation();
  }

  add() {
    return postsDao.add(this);
  }

  validation() {
    validations.textFieldNotNull(this.title, 'title');
    validations.fieldMinimumLength(this.title, 'title', 5);

    validations.textFieldNotNull(this.content, 'content');
    validations.fieldMaximumLength(this.content, 'content', 140);
  }

  static list() {
    return postsDao.list();
  }
}

module.exports = Post;
