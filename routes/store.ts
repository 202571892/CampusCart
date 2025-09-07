import express from 'express';
import Store from '../models/Store';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Create store (profile)
router.post('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const store = new Store({ ...req.body, owner: req.user.id });
    await store.save();
    res.status(201).json(store);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Edit store
router.put('/:id', authMiddleware, async (req: AuthRequest, res) => {
  const store = await Store.findById(req.params.id);
  if (!store) return res.status(404).json({ error: 'Store not found' });
  if (store.owner.toString() !== req.user.id) return res.status(403).json({ error: 'Not authorized' });
  Object.assign(store, req.body);
  await store.save();
  res.json(store);
});

// Delete store
router.delete('/:id', authMiddleware, async (req: AuthRequest, res) => {
  const store = await Store.findById(req.params.id);
  if (!store) return res.status(404).json({ error: 'Store not found' });
  if (store.owner.toString() !== req.user.id) return res.status(403).json({ error: 'Not authorized' });
  await store.deleteOne();
  res.json({ message: 'Store deleted' });
});

export default router;
