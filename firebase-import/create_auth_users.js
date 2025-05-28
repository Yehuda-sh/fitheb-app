
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// טען את מפתח השירות
const serviceAccount = require('./serviceAccountKey.json');

// אתחול Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();

const dataPath = path.join(__dirname, 'mock_trainers_and_trainees.json');
const mockData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const createUserIfNotExists = async (email, password, displayName, photoURL) => {
  try {
    const userRecord = await auth.getUserByEmail(email);
    console.log(`ℹ️ משתמש כבר קיים: ${email}`);
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      const newUser = await auth.createUser({
        email,
        password,
        displayName,
        photoURL,
      });
      console.log(`✅ נוצר משתמש חדש: ${email}`);
    } else {
      console.error(`❌ שגיאה בבדיקת משתמש ${email}:`, err.message);
    }
  }
};

const createUsers = async () => {
  for (const trainer of mockData.trainers) {
    await createUserIfNotExists(trainer.email, trainer.password, trainer.fullName, trainer.photoUrl);
    for (const trainee of trainer.trainees) {
      await createUserIfNotExists(trainee.email, trainee.password, trainee.fullName, trainee.photoUrl);
    }
  }

  console.log('🎉 יצירת משתמשים הסתיימה');
};

createUsers().catch(err => {
  console.error('❌ שגיאה כללית:', err);
});
