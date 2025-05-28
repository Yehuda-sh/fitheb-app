import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// הגדרת טיפוסים
export interface User {
  id: string;
  email: string;
  role: 'trainer' | 'trainee';
  fullName?: string;
  phone?: string;
  gender?: 'male' | 'female';
  profileImage?: string;
  createdAt: string;
  lastLogin?: string;
}

interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

// מצב התחלתי
const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

// יצירת ה-slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // התחלת טעינת משתמש
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    // שמירת משתמש נוכחי
    setUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
      state.error = null;
    },
    // שמירת שגיאה
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    // עדכון פרטי משתמש
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
    // התנתקות
    logout: (state) => {
      state.currentUser = null;
      state.error = null;
    },
  },
});

// ייצוא ה-actions וה-reducer
export const { setLoading, setUser, setError, updateUser, logout } = userSlice.actions;
export default userSlice.reducer; 