const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Todo = require('../models/todos');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const response = await Todo.getAll(req.user.id);
      res.json(response);
    } catch (e) {
      next(e);
    }
  })
  .post('/', authenticate, async (req, res, next) => {
    try {
      const response = await Todo.insert(req.body, req.user.id);
      res.json(response);
    } catch (e) {
      next(e);
    }
  });
