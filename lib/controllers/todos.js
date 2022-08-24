const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Todo = require('../models/todos');

module.exports = Router()
  .delete('/:id', authenticate, authorize, async (req, res, next) => {
    try {
      const response = await Todo.delete(req.params.id);
      res.json(response);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', authenticate, authorize, async (req, res, next) => {
    try {
      const response = await Todo.updateByID(req.params.id, req.body);
      res.json(response);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', authenticate, async (req, res, next) => {
    try {
      const response = await Todo.getByID(req.params.id);
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
