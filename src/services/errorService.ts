import { store } from '../store';
import { setError } from '../store/slices/userSlice';

// הגדרת טיפוסים
export interface ErrorDetails {
  code: string;
  message: string;
  timestamp: number;
  stack?: string;
  metadata?: Record<string, any>;
}

export interface ErrorReport {
  error: ErrorDetails;
  userInfo?: {
    id?: string;
    role?: string;
    deviceInfo?: string;
  };
  context?: {
    screen?: string;
    action?: string;
    data?: any;
  };
}

// קבועים
const ERROR_CODES = {
  // שגיאות רשת
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  
  // שגיאות אימות
  AUTH_ERROR: 'AUTH_ERROR',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  INVALID_TOKEN: 'INVALID_TOKEN',
  
  // שגיאות קלט
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  
  // שגיאות מערכת
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  SYSTEM_ERROR: 'SYSTEM_ERROR',
} as const;

// פונקציית עזר להמרת שגיאה לפורמט אחיד
const normalizeError = (error: any): ErrorDetails => {
  if (error instanceof Error) {
    return {
      code: ERROR_CODES.UNKNOWN_ERROR,
      message: error.message,
      timestamp: Date.now(),
      stack: error.stack,
    };
  }

  if (typeof error === 'string') {
    return {
      code: ERROR_CODES.UNKNOWN_ERROR,
      message: error,
      timestamp: Date.now(),
    };
  }

  if (error && typeof error === 'object') {
    return {
      code: error.code || ERROR_CODES.UNKNOWN_ERROR,
      message: error.message || 'שגיאה לא ידועה',
      timestamp: Date.now(),
      metadata: error.metadata,
    };
  }

  return {
    code: ERROR_CODES.UNKNOWN_ERROR,
    message: 'שגיאה לא ידועה',
    timestamp: Date.now(),
  };
};

// שירות ניהול שגיאות
export const errorService = {
  // טיפול בשגיאה
  handleError(error: any, context?: ErrorReport['context']): void {
    const normalizedError = normalizeError(error);
    const errorReport: ErrorReport = {
      error: normalizedError,
      userInfo: {
        id: store.getState().user.currentUser?.id,
        role: store.getState().user.currentUser?.role,
      },
      context,
    };

    // שליחת השגיאה לשרת
    this.reportError(errorReport);

    // הצגת הודעת שגיאה למשתמש
    store.dispatch(setError(normalizedError.message));

    // רישום השגיאה לקונסול במצב פיתוח
    if (__DEV__) {
      console.error('Error Report:', errorReport);
    }
  },

  // דיווח על שגיאה לשרת
  async reportError(errorReport: ErrorReport): Promise<void> {
    try {
      // שליחת הדוח לשרת
      await fetch('https://api.fitheb.com/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorReport),
      });
    } catch (error) {
      // אם יש שגיאה בשליחת הדוח, נרשם לקונסול
      console.error('Failed to report error:', error);
    }
  },

  // יצירת שגיאה מותאמת אישית
  createError(code: keyof typeof ERROR_CODES, message: string, metadata?: Record<string, any>): ErrorDetails {
    return {
      code: ERROR_CODES[code],
      message,
      timestamp: Date.now(),
      metadata,
    };
  },

  // בדיקה האם שגיאה היא מסוג מסוים
  isErrorType(error: any, type: keyof typeof ERROR_CODES): boolean {
    const normalizedError = normalizeError(error);
    return normalizedError.code === ERROR_CODES[type];
  },

  // קבלת הודעת שגיאה ידידותית למשתמש
  getUserFriendlyMessage(error: any): string {
    const normalizedError = normalizeError(error);
    
    // מיפוי קודי שגיאה להודעות ידידותיות
    const friendlyMessages: Record<string, string> = {
      [ERROR_CODES.NETWORK_ERROR]: 'אין חיבור לאינטרנט. אנא בדוק את החיבור ונסה שוב.',
      [ERROR_CODES.TIMEOUT_ERROR]: 'הבקשה ארכה זמן רב מדי. אנא נסה שוב.',
      [ERROR_CODES.SERVER_ERROR]: 'אירעה שגיאה בשרת. אנא נסה שוב מאוחר יותר.',
      [ERROR_CODES.AUTH_ERROR]: 'אירעה שגיאה באימות. אנא התחבר מחדש.',
      [ERROR_CODES.PERMISSION_DENIED]: 'אין לך הרשאה לבצע פעולה זו.',
      [ERROR_CODES.INVALID_TOKEN]: 'פג תוקף ההתחברות. אנא התחבר מחדש.',
      [ERROR_CODES.VALIDATION_ERROR]: 'הנתונים שהוזנו אינם תקינים.',
      [ERROR_CODES.INVALID_INPUT]: 'הקלט שהוזן אינו תקין.',
      [ERROR_CODES.UNKNOWN_ERROR]: 'אירעה שגיאה לא צפויה. אנא נסה שוב.',
      [ERROR_CODES.SYSTEM_ERROR]: 'אירעה שגיאת מערכת. אנא נסה שוב מאוחר יותר.',
    };

    return friendlyMessages[normalizedError.code] || normalizedError.message;
  },
}; 