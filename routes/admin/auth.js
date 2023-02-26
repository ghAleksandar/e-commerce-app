import express from 'express';

import { handleErrors } from './middlewares.js';
import usersRepo from '../../repositories/users.js';
import signupTemplate from '../../views/admin/auth/signup.js';
import signinTemplate from '../../views/admin/auth/signin.js';
import {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireEmailExists,
  requireValidPasswordForUser
} from './validators.js';

const router = express.Router();

router.get('/signup', (req, res) => {
  // @TODO check this how to add dynamic pages for capoHub 385 lesson
  // This comes from ../../views/admin/auth/signup.js
  res.send(signupTemplate({ req }));
});

router.post('/signup', [
    requireEmail,
    requirePassword,
    requirePasswordConfirmation
  ],
  handleErrors(signupTemplate),
  async (req, res) => {
    // console.log(errors)
    const { email, password } = req.body;

    // Create a user repo to represent this person
    const user = await usersRepo.create({ email, password });

    // Store the ID of that user  inside the users cookie
    req.session.userId = user.id //added by cookie session
    console.log(errors)
    // console.log(req.body)
    res.redirect('/admin/products');
});

router.get('/signout', (req, res) => {
  req.session = null;
  res.send('You are logged out!')
});

router.get('/signin', (req, res) => {
  res.send(signinTemplate({}));
});

router.post('/signin',
  [ requireEmailExists, requireValidPasswordForUser ],
  handleErrors(signinTemplate),
  async (req, res) => {
    const { email } = req.body;

    const user = await usersRepo.getOneBy({ email });

    req.session.userId = user.id;

    res.redirect('/admin/products');
  });

export default router;
