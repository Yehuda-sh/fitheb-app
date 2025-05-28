// firebase-import/import_trainers_and_trainees.js

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// טען את מפתח השירות
const serviceAccount = require('./serviceAccountKey.json');

// אתחול Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// קרא את הקובץ
const dataPath = path.join(__dirname, 'mock_trainers_and_trainees.json');
const mockData = JSON.parse(fs.readFileSync(dataPath, 'utf8')); // כאן mockData הוא מערך של מאמנים

const importData = async () => {
  for (const trainer of mockData) {
    const trainerRef = db.collection('users').doc(trainer.id);
    await trainerRef.set({
      ...trainer,
      role: 'trainer'
    });

    for (const trainee of trainer.trainees || []) {
      const traineeRef = db.collection('users').doc(trainee.id);
      await traineeRef.set({
        ...trainee,
        role: 'trainee',
        trainerId: trainer.id
      });
    }
  }

  console.log('✅ כל הנתונים הוזנו ל־Firestore בהצלחה!');
};

importData().catch(err => {
  console.error('❌ שגיאה בהעלאה:', err);
});
