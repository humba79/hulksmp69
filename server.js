const express = require('express');
const path = require('path');
const admin = require('firebase-admin');
const serviceAccount = require('./firebaseKey.json');

const app = express();
const PORT = process.env.PORT || 3000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://zerox-only-default-rtdb.firebaseio.com"
});
const db = admin.database();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // parse JSON bodies

// Serve admin page (using ejs or static html, adjust accordingly)
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/admin.html'));
});

// API to update order status securely
app.put('/api/orders/:id/status', async (req, res) => {
  const orderId = req.params.id;
  const newStatus = req.body.status;
  const validStatuses = ['pending', 'completed', 'cancelled'];

  if (!validStatuses.includes(newStatus)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    await db.ref(`orders/${orderId}/status`).set(newStatus);
    res.json({ success: true });
  } catch (err) {
    console.error('Failed to update order status:', err);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
