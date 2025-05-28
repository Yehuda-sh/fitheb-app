import { store } from '../store';
import { setError } from '../store/slices/userSlice';

// הגדרת טיפוסים
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface ApiResponse<T> {
  data: T;
  error?: ApiError;
}

// הגדרת קבועים
const API_BASE_URL = 'https://api.fitheb.com'; // יוחלף בכתובת האמיתית
const DEFAULT_TIMEOUT = 30000; // 30 שניות

// פונקציית עזר לטיפול בשגיאות
const handleError = (error: any): ApiError => {
  if (error.response) {
    // שגיאת שרת
    return {
      code: error.response.status.toString(),
      message: error.response.data?.message || 'שגיאת שרת',
      details: error.response.data,
    };
  } else if (error.request) {
    // אין תשובה מהשרת
    return {
      code: 'NO_RESPONSE',
      message: 'לא התקבלה תשובה מהשרת',
    };
  } else {
    // שגיאה בהגדרת הבקשה
    return {
      code: 'REQUEST_ERROR',
      message: error.message || 'שגיאה בהגדרת הבקשה',
    };
  }
};

// פונקציית עזר לבניית URL
const buildUrl = (endpoint: string, params?: Record<string, string>): string => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  return url.toString();
};

// פונקציית עזר להגדרת headers
const getHeaders = (requiresAuth: boolean = true): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (requiresAuth) {
    const token = store.getState().user.currentUser?.id; // יוחלף בטוקן אמיתי
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

// פונקציית עזר לביצוע בקשה
const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout: number = DEFAULT_TIMEOUT
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

// פונקציות עיקריות
export const api = {
  // GET request
  async get<T>(
    endpoint: string,
    params?: Record<string, string>,
    requiresAuth: boolean = true
  ): Promise<ApiResponse<T>> {
    try {
      const url = buildUrl(endpoint, params);
      const response = await fetchWithTimeout(url, {
        method: 'GET',
        headers: getHeaders(requiresAuth),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      const apiError = handleError(error);
      store.dispatch(setError(apiError.message));
      return { data: null as T, error: apiError };
    }
  },

  // POST request
  async post<T>(
    endpoint: string,
    body: any,
    requiresAuth: boolean = true
  ): Promise<ApiResponse<T>> {
    try {
      const url = buildUrl(endpoint);
      const response = await fetchWithTimeout(url, {
        method: 'POST',
        headers: getHeaders(requiresAuth),
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      const apiError = handleError(error);
      store.dispatch(setError(apiError.message));
      return { data: null as T, error: apiError };
    }
  },

  // PUT request
  async put<T>(
    endpoint: string,
    body: any,
    requiresAuth: boolean = true
  ): Promise<ApiResponse<T>> {
    try {
      const url = buildUrl(endpoint);
      const response = await fetchWithTimeout(url, {
        method: 'PUT',
        headers: getHeaders(requiresAuth),
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      const apiError = handleError(error);
      store.dispatch(setError(apiError.message));
      return { data: null as T, error: apiError };
    }
  },

  // DELETE request
  async delete<T>(
    endpoint: string,
    requiresAuth: boolean = true
  ): Promise<ApiResponse<T>> {
    try {
      const url = buildUrl(endpoint);
      const response = await fetchWithTimeout(url, {
        method: 'DELETE',
        headers: getHeaders(requiresAuth),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      const apiError = handleError(error);
      store.dispatch(setError(apiError.message));
      return { data: null as T, error: apiError };
    }
  },
}; 