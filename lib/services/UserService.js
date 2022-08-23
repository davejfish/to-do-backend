const bcrypt = require('bcrypt');
const User = require('../models/users');

module.exports = class UserService {
  static async create({ email, password, }) {
    let user = await User.getByEmail(email);

    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    if (user) {
      if (user.passwordHash === passwordHash) return user;
    }

    user = await User.insert({
      email,
      passwordHash
    });

    return user;
  }
};

