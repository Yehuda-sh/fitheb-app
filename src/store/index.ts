import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import workoutReducer from './slices/workoutSlice';
import exerciseReducer from './slices/exerciseSlice';
import notificationReducer from './slices/notificationSlice';

// הגדרת ה-store הראשי
export const store = configureStore({
  reducer: {
    user: userReducer,
    workout: workoutReducer,
    exercise: exerciseReducer,
    notification: notificationReducer,
  },
});

// הגדרת טיפוסים
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 