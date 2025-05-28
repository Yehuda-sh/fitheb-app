const admin = require('firebase-admin');
const exercises = require('./exercises.json');

// מומלץ ליצור ולשים serviceAccountKey.json בספריה הראשית
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function importExercises() {
  const batch = db.batch();

  exercises.forEach((ex, idx) => {
    const ref = db.collection('exercises').doc(); // אוטומטי id
    batch.set(ref, {
      name: ex.name,
      description: ex.description,
      type: ex.type,
      difficulty: ex.difficulty,
      youtube: ex.youtube
    });
  });

  try {
    await batch.commit();
    console.log('הייבוא הסתיים בהצלחה!');
  } catch (err) {
    console.error('שגיאה בייבוא:', err);
  }
}

importExercises();
