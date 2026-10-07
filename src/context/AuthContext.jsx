import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('movie_explorer_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('movie_explorer_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('movie_explorer_user');
    }
  }, [user]);

  const login = (username, password) => {
    setAuthError(null);
    if (!username || !username.trim()) {
      setAuthError('Please enter your username');
      return { success: false, error: 'Please enter your username' };
    }
    if (!password || password.trim().length < 4) {
      setAuthError('Password must be at least 4 characters');
      return { success: false, error: 'Password must be at least 4 characters' };
    }

    // Authentic demo user profile
    const newUser = {
      username: username.trim(),
      name: username.charAt(0).toUpperCase() + username.slice(1),
      email: `${username.toLowerCase().replace(/\s+/g, '')}@example.com`,
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}`,
      joinedAt: new Date().toLocaleDateString(),
    };

    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    setAuthError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        authError,
        login,
        logout,
        setAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
