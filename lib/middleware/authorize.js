const Todo = require('../models/todos');

module.exports = async (req, res, next) => {
  try {
    const data = await Todo.getByID(req.params.id);
    if (req.user.id !== data.user_id)
      throw new Error('You are not authorized to do this action');
    next();
  } catch (e) {
    e.status = 403;
    next(e);
  }
};
