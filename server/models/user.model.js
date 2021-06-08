class UserModel {
  constructor() {
    this.username = "admin";
    this.password = "admin";
    this._id = "123456";
  }

  findUser(username) {
    if (this.username === username) return this; 
  }

  validPass(password) {
    return this.password === password;
  }
}

module.exports = UserModel;
