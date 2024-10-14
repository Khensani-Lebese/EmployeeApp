import express from 'express';
import cors from 'cors';
import multer, { memoryStorage } from 'multer';
import { extname } from 'path';
import { readFileSync } from 'fs';
import bodyParserPkg from 'body-parser';
import admin from 'firebase-admin';
const { json, urlencoded } = bodyParserPkg;
const upload = multer({ dest: 'uploads/' }); 
// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Read and parse the JSON service account key
const serviceAccount = JSON.parse(readFileSync('./serviceAccountKey.json', 'utf8'));

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://employee-app-760d2.appspot.com",
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

// Base route
app.get('/', (req, res) => {
  res.send('Server is running!');
});



// Upload employee photo and data to Firestore
app.post('/employees/add', upload.single('photo'), async (req, res) => {
  try {
    const { name, surname, age, idNumber, role, email, position, department, phone, startDate } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No photo uploaded.' });
    }

    // Upload photo to Firebase Storage
    const blob = bucket.file(Date.now() + extname(req.file.originalname));
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: req.file.mimetype
      }
    });

    blobStream.on('error', err => {
      console.error('Error uploading file:', err);
      return res.status(500).json({ error: 'Failed to upload photo.' });
    });

    blobStream.on('finish', async () => {
      const photoUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      // Save employee data to Firestore
      await db.collection('employees').add({
        name, 
        surname, 
        age, 
        idNumber, 
        role, 
        email, 
        position, 
        department, 
        phone, 
        startDate, 
        photoUrl
      });

      return res.status(201).json({ message: 'Employee added successfully' });
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    console.error('Error adding employee:', error);
    return res.status(500).json({ error: 'Failed to add employee.' });
  }
});
//get employees
app.get('/employees', async (req, res) => {
    try {
      const snapshot = await db.collection('employees').get();
      const employees = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      return res.status(200).json(employees);
    } catch (error) {
      console.error('Error fetching employees:', error);
      return res.status(500).json({ error: 'Failed to fetch employees.' });
    }
  });

  // Delete employee by ID
app.delete('/employees/delete/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const employeeRef = db.collection('employees').doc(id);
      const doc = await employeeRef.get();
  
      if (!doc.exists) {
        return res.status(404).json({ error: 'Employee not found.' });
      }
  
      await employeeRef.delete();
      return res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      console.error('Error deleting employee:', error);
      return res.status(500).json({ error: 'Failed to delete employee.' });
    }
  });
  
  // Update employee data in Firestore
app.put('/employees/update/:id', upload.single('photo'), async (req, res) => {
    const { id } = req.params;
    const { name, surname, age, idNumber, role, email, position, department, phone, startDate } = req.body;
  
    try {
      const employeeRef = db.collection('employees').doc(id);
      const doc = await employeeRef.get();
  
      if (!doc.exists) {
        return res.status(404).json({ error: 'Employee not found.' });
      }
  
      let photoUrl = doc.data().photoUrl; // Get the existing photo URL
  
      // If a new photo is uploaded, upload it to Firebase Storage
      if (req.file) {
        // Upload photo to Firebase Storage
        const blob = bucket.file(Date.now() + extname(req.file.originalname));
        const blobStream = blob.createWriteStream({
          resumable: false,
          metadata: {
            contentType: req.file.mimetype
          }
        });
  
        await new Promise((resolve, reject) => {
          blobStream.on('error', err => {
            console.error('Error uploading file:', err);
            reject('Failed to upload photo.');
          });
  
          blobStream.on('finish', () => {
            photoUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`; // Update the photo URL
            resolve();
          });
  
          blobStream.end(req.file.buffer);
        });
      }
  
      // Update the employee data in Firestore, including the new photo URL if it was updated
      await employeeRef.update({
        name,
        surname,
        age,
        idNumber,
        role,
        email,
        position,
        department,
        phone,
        startDate,
        photoUrl // This will be the old or new URL based on the photo upload
      });
  
      return res.status(200).json({ message: 'Employee updated successfully' });
    } catch (error) {
      console.error('Error updating employee:', error);
      return res.status(500).json({ error: 'Failed to update employee.' });
    }
  });
  
// Other routes...

// Start server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
