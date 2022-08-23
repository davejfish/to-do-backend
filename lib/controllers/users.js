const { Router } = require('express');
const UserService = require('../services/UserService');
const jwt = require('jsonwebtoken');

const ONE_DAY_IN_MS = 1000 * 24 * 24 * 60;

module.exports = Router()
  .post('/sessions', async (req, res, next) => {
    try {
      const response = await UserService.create(req.body);
      const token = jwt.sign({ ...response }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      res
        .cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          secure: process.env.SECURE_COOKIES === 'true',
          sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
          maxAge: ONE_DAY_IN_MS,
        })
        .json(response);
    } catch (e) {
      next(e);
    }
  });
