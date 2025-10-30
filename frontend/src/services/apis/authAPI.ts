import api from '../../config/api';
import { getErrorMessage, getErrorDetails } from '../../utils/apiUtils';

/**
 * Authentication API Service
 * Handles all authentication-related API calls
 */

export interface RegisterUserData {
  username: string;
  email: string;
  password: string;
  avatar?: File;
}

export interface LoginUserData {
  usernameOrEmail: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  user: {
    id: string;
    username: string;
    email: string;
    avatar?: string;
  };
  accessToken: string;
  refreshToken?: string;
}

/**
 * Register a new user
 */
export const registerUser = async (data: RegisterUserData): Promise<AuthResponse> => {
  try {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    
    if (data.avatar) {
      formData.append('avatar', data.avatar);
    }

    const response: AuthResponse = await api.post('/auth/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Store tokens in localStorage
    if (response && response.accessToken) {
      localStorage.setItem('accessToken', response.accessToken);
      if (response.refreshToken) {
        localStorage.setItem('refreshToken', response.refreshToken);
      }
    }

    return response;
  } catch (error) {
    throw getErrorDetails(error);
  }
};

/**
 * Login user
 */
export const loginUser = async (data: LoginUserData): Promise<AuthResponse> => {
  try {
    const response: AuthResponse = await api.post('/auth/login', {
      usernameOrEmail: data.usernameOrEmail,
      password: data.password,
    });

    // Store tokens in localStorage
    if (response && response.accessToken) {
      localStorage.setItem('accessToken', response.accessToken);
      if (response.refreshToken) {
        localStorage.setItem('refreshToken', response.refreshToken);
      }
    }

    return response;
  } catch (error) {
    throw getErrorDetails(error);
  }
};

/**
 * Logout user
 */
export const logoutUser = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    // Even if API call fails, clear local storage
    console.error('Logout API error:', error);
  } finally {
    // Clear tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};

/**
 * Refresh access token
 */
export const refreshAccessToken = async (): Promise<string> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response: { accessToken: string } = await api.post('/auth/refresh', {
      refreshToken,
    });

    if (response && response.accessToken) {
      localStorage.setItem('accessToken', response.accessToken);
    }

    return response.accessToken;
  } catch (error) {
    // If refresh fails, clear tokens and redirect to login
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    throw getErrorDetails(error);
  }
};

/**
 * Get current user profile
 */
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response;
  } catch (error) {
    throw getErrorDetails(error);
  }
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
};

