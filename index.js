import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import authRouter from './routes/admin/auth.js'
import productsRouter from './routes/admin/products.js';

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  keys: ['kjkdjdkjdkjdk']
}));

app.use(authRouter);
app.use(productsRouter);

app.listen(3000, () => {
  console.log('Listening on Port 3000');
});
