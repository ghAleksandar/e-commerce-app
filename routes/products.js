import express from 'express';

import productsRepo from '../repositories/products.js';
import productIndexTemplate from '../views/products/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await productsRepo.getAll();

  res.send(productIndexTemplate({ products }));
})

export default router;
