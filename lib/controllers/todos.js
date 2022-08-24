const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Todo = require('../models/todos');

module.exports = Router()
  .put('/:id', authenticate, async (req, res, next) => {
    try {
      const response = await Todo.updateByID(req.params.id, req.body);
      res.json(response);
    } catch (e) {
      next(e);
    }
  })
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
