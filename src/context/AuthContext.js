import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      // Get existing users
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if email already exists
      if (existingUsers.find(u => u.email === userData.email)) {
        throw new Error('Email already exists');
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        xp: 0,
        level: 1,
        totalQuizzes: 0,
        correctAnswers: 0,
        createdAt: new Date().toISOString(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`
      };

      // Save to users array
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      // Set as current user
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      setUser(newUser);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }

      localStorage.setItem('currentUser', JSON.stringify(user));
      setUser(user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const updateUserStats = (quizResults) => {
    if (!user) return;

    const { correctAnswers, totalQuestions, level: quizLevel } = quizResults;
    const xpGained = calculateXP(correctAnswers, totalQuestions, quizLevel);
    
    const updatedUser = {
      ...user,
      xp: user.xp + xpGained,
      totalQuizzes: user.totalQuizzes + 1,
      correctAnswers: user.correctAnswers + correctAnswers
    };

    // Calculate new level
    updatedUser.level = calculateLevel(updatedUser.xp);

    // Update in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
    }

    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setUser(updatedUser);

    return { xpGained, newLevel: updatedUser.level, oldLevel: user.level };
  };

  const calculateXP = (correct, total, quizLevel) => {
    const baseXP = 10;
    const correctBonus = (correct / total) * 50;
    const levelMultiplier = getLevelMultiplier(quizLevel);
    return Math.round((baseXP + correctBonus) * levelMultiplier);
  };

  const getLevelMultiplier = (quizLevel) => {
    if (quizLevel.includes('Grade_9')) return 1;
    if (quizLevel.includes('Grade_10')) return 1.2;
    if (quizLevel.includes('Grade_11')) return 1.5;
    if (quizLevel.includes('Grade_12')) return 2;
    return 1;
  };

  const calculateLevel = (xp) => {
    return Math.floor(xp / 100) + 1;
  };

  const getLeaderboard = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users
      .sort((a, b) => b.xp - a.xp)
      .slice(0, 10)
      .map((user, index) => ({
        ...user,
        rank: index + 1
      }));
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateUserStats,
    getLeaderboard,
    calculateLevel
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};