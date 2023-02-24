import express from 'express';
import { check, validationResult } from 'express-validator';

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
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send(signupTemplate({ req, errors }));
    }

    // console.log(errors)
    const { email, password, passwordConfirmation } = req.body;

    // Create a user repo to represent this person
    const user = await usersRepo.create({ email, password });

    // Store the ID of that user  inside the users cookie
    req.session.userId = user.id //added by cookie session
    console.log(errors)
    // console.log(req.body)
    res.send('Account Created')
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
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send(signinTemplate({ errors }))
    }

    console.log(errors)

    const { email } = req.body;

    const user = await usersRepo.getOneBy({ email });

    req.session.userId = user.id;
    res.send('You are signed in!')
  });

export default router;
