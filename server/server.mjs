import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createProxyMiddleware } from 'http-proxy-middleware';

import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import pg from 'pg';
const { Pool } = pg;
import { PrismaPg } from '@prisma/adapter-pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3002;

// --- Database Configuration ---
const connectionString = process.env.DATABASE_URL || "postgresql://angelrodriguez@localhost:5432/remotion_app";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
// ------------------------------

// --- JWT Configuration ---
// In a real application, this should be an environment variable.
const JWT_SECRET = 'your_jwt_secret_key'; 
// -------------------------

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client')));

// Enable CORS for all routes (for development purposes)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins for now
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Add Authorization header
  next();
});

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) return res.sendStatus(401); // No token

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token not valid
    req.user = user;
    next();
  });
};

// User registration
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  try {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    });

    res.status(201).send('User created successfully');
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('Internal server error');
  }
});

// User login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(`[Login Attempt] Email: ${email}`); // Log the email attempting to login

  if (!email || !password) {
    console.log('[Login Failed] Missing email or password');
    return res.status(400).send('Email and password are required');
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.log(`[Login Failed] User not found: ${email}`);
      return res.status(400).send('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`[Login Failed] Password mismatch for: ${email}`);
      return res.status(400).send('Invalid email or password');
    }

    // Generate JWT
    console.log(`[Login Success] User: ${email}`);
    const accessToken = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', accessToken });
  } catch (error) {
    console.error('[Login Error] Internal Server Error:', error);
    res.status(500).send('Internal server error');
  }
});

// Protected route example
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is protected data!', user: req.user });
});

// --- Proxy to Remotion Studio ---

// 1. Specific route for /studio -> redirects to Studio root
app.use('/studio', createProxyMiddleware({
  target: 'http://127.0.0.1:3000',
  changeOrigin: true,
  ws: true, // Enable Websocket support for HMR
  pathRewrite: {
    '^/studio': '', // Remove /studio from the path
  },
}));

// 2. Fallback for everything else (assets, HMR, internal Studio API)
// This will only trigger if no other Express route (static or API) matched.
app.use('/', createProxyMiddleware({
  target: 'http://127.0.0.1:3000',
  changeOrigin: true,
  ws: true,
  // We don't rewrite path here because we want /main.js to go to /main.js on port 3000
  onError: (err, req, res) => {
    console.error('Proxy Error:', err);
    res.status(500).send('Proxy Error');
  }
}));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});