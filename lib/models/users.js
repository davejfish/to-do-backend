const pool = require('../utils/pool');


module.exports = class User {
  id;
  email;
  #passwordHash;

  constructor({ id, email, passwordHash }) {
    this.id = id;
    this.email = email;
    this.#passwordHash = passwordHash;
  }

  static async insert({ email, password }) {
    const { rows } = await pool.query(`
      INSERT INTO userbase
      (email, password)
      VALUES ($1, $2)
      RETURNING *`, [email, password]);
    return new User(rows[0]);
  }

};

