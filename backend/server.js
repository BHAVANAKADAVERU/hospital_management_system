const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const patientsRouter = require('./routes/patients');
const doctorsRouter = require('./routes/doctors');
const appointmentsRouter = require('./routes/appointments');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/patients', patientsRouter);
app.use('/doctors', doctorsRouter);
app.use('/appointments', appointmentsRouter);

// MongoDB Connection
const dbURI = 'mongodb+srv://bhavanakadaveru123:HbLeNuzLvjzUypMn@cluster0.oz0hmv1.mongodb.net/hospital'; // Use 127.0.0.1 instead of localhost to avoid potential IPv6 issues
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB database connection established successfully');

    // Start the server after connecting to the database
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    // Exit the process if MongoDB connection fails
    process.exit(1);
  });

// Catch all route
app.use((req, res) => {
  res.status(404).send('Route not found');
});
