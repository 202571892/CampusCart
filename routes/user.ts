import express from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Register: Only @ufs4life.ac.za emails
router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;
  if (!email.endsWith('@ufs4life.ac.za')) {
    return res.status(400).json({ error: 'Only ufs4life.ac.za emails allowed' });
  }
  try {
    const user = new User({ email, username, password });
    await user.save();
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'secret');
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email.endsWith('@ufs4life.ac.za')) {
    return res.status(400).json({ error: 'Only ufs4life.ac.za emails allowed' });
  }
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'secret');
  res.json({ user, token });
});

export default router;
