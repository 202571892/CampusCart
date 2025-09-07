import express from 'express';
import Product from '../models/Product';
import Store from '../models/Store';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Add product
router.post('/', authMiddleware, async (req: AuthRequest, res) => {
  const store = await Store.findById(req.body.store);
  if (!store) return res.status(404).json({ error: 'Store not found' });
  if (store.owner.toString() !== req.user.id) return res.status(403).json({ error: 'Not authorized' });
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

// Edit product
router.put('/:id', authMiddleware, async (req: AuthRequest, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  const store = await Store.findById(product.store);
  if (store.owner.toString() !== req.user.id) return res.status(403).json({ error: 'Not authorized' });
  Object.assign(product, req.body);
  await product.save();
  res.json(product);
});

// Delete product
router.delete('/:id', authMiddleware, async (req: AuthRequest, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  const store = await Store.findById(product.store);
  if (store.owner.toString() !== req.user.id) return res.status(403).json({ error: 'Not authorized' });
  await product.deleteOne();
  res.json({ message: 'Product deleted' });
});

export default router;
