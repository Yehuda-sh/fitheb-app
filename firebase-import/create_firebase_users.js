const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// טען מפתח שירות
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();
const db = admin.firestore();

// קריאת הקובץ
const dataPath = path.join(__dirname, 'mock_trainers_and_trainees.json');
const users = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const createAuthUsers = async () => {
  let count = 0;

  for (const user of users) {
    try {
      // ננסה ליצור את המשתמש
      const userRecord = await auth.createUser({
        uid: user.id,
        email: user.email,
        password: user.password,
        displayName: user.fullName,
        photoURL: user.url,
      });

      console.log(`✅ נוצר: ${user.email}`);
      count++;
    } catch (error) {
      if (error.code === 'auth/email-already-exists') {
        console.log(`ℹ️ קיים כבר: ${user.email}`);
      } else {
        console.error(`❌ שגיאה עבור ${user.email}:`, error.message);
      }
    }
  }

  console.log(`הסתיים: ${count} משתמשים חדשים נוצרו`);
};

createAuthUsers();
