import express from 'express';
import bodyParser from 'body-parser';
import transactionRoutes from './routes/transaction.js';
import { errorHandler } from './utils/errorHandler.js';

const app = express();
const PORT = 8000;

app.use(bodyParser.json());

// Routes
app.use('/transaction', transactionRoutes);

// Error Handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
