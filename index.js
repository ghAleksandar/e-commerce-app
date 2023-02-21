import express from 'express';
import bodyParser from 'body-parser';
import usersRepo from './repositories/users.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <div>
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passwordConfirmation" placeholder="password confirmation" />
        <button>Sign Up</button>
      </form>
    </div>
  `)
});

app.post('/', async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  const existingUser = await usersRepo.getOneBy({ email });

  if (existingUser) {
    return res.send('Email in use.')
  }

  if (password !== passwordConfirmation) {
    return res.send('Passwords do not match!')
  }

  console.log(req.body)
  res.send('Account Created')
});

app.listen(3000, () => {
  console.log('Listening on Port 3000');
});
