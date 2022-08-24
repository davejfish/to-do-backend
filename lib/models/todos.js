const pool = require('../utils/pool');


module.exports = class Todo {
  id;
  user_id;
  content;
  finished;

  constructor({ id, user_id, content, finished }) {
    this.id = id;
    this.user_id = user_id;
    this.content = content;
    this.finished = finished;
  }

  static async insert({ content }, userID) {
    const { rows } = await pool.query(`
      INSERT INTO todos
      (user_id, content)
      VALUES ($1, $2)
      RETURNING *`, [userID, content]);
    return new Todo(rows[0]);
  }

  static async getAll(id) {
    const { rows } = await pool.query(`
      SELECT * FROM todos
      WHERE user_id = $1`, [id]);
    if (!rows[0]) return null;
    return rows.map(row => new Todo(row));
  }

  static async getByID(id) {
    const { rows } = await pool.query(`
      SELECT * FROM todos
      WHERE id = $1`, [id]);
    if (!rows[0]) return null;
    return new Todo(rows[0]);
  }

  static async updateByID(id, data) {
    const oldData = await Todo.getByID(id);
    const newData = {
      ...oldData,
      ...data,
    };
    const { rows } = await pool.query(`
      UPDATE todos
      SET user_id = $1, content = $2, finished = $3
      WHERE id = $4
      RETURNING *`, [
      newData.user_id,
      newData.content,
      newData.finished,
      id,
    ]);
    return new Todo(rows[0]);
  }
};
