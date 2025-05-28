import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// הגדרת טיפוסים
export interface Notification {
  id: string;
  type: 'system' | 'workout' | 'message' | 'achievement';
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  data?: any; // מידע נוסף ספציפי לסוג ההתראה
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}

// מצב התחלתי
const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
};

// יצירת ה-slice
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    // התחלת טעינת התראות
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    // שמירת רשימת התראות
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter(n => !n.read).length;
      state.error = null;
    },
    // הוספת התראה חדשה
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.read) {
        state.unreadCount += 1;
      }
    },
    // סימון התראה כנקראה
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount -= 1;
      }
    },
    // סימון כל ההתראות כנקראו
    markAllAsRead: (state) => {
      state.notifications.forEach(n => n.read = true);
      state.unreadCount = 0;
    },
    // מחיקת התראה
    deleteNotification: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.read) {
        state.unreadCount -= 1;
      }
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    // מחיקת כל ההתראות
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
    // שמירת שגיאה
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

// ייצוא ה-actions וה-reducer
export const {
  setLoading,
  setNotifications,
  addNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearNotifications,
  setError,
} = notificationSlice.actions;
export default notificationSlice.reducer; 