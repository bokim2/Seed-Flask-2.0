import express, { Request, Response } from 'express';
import path from 'path';

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000;

// A simple API endpoint
app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the server!' });
});

// Serve static files from the React frontend app in production
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(path.join(__dirname, '../../dist/client')));

  // Handle React routing, return all requests to the React app
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../dist/client', 'index.html'));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
