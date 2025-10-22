import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current user from Supabase
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const sessionUser = JSON.parse(localStorage.getItem('currentUser'));
      if (sessionUser) {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', sessionUser.id)
          .maybeSingle();

        if (data && !error) {
          setUser(data);
          localStorage.setItem('currentUser', JSON.stringify(data));
        } else {
          localStorage.removeItem('currentUser');
        }
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      // Check if email already exists
      const { data: existingEmail } = await supabase
        .from('users')
        .select('email')
        .eq('email', userData.email)
        .maybeSingle();

      if (existingEmail) {
        throw new Error('Email already exists');
      }

      // Check if username already exists
      const { data: existingUsername } = await supabase
        .from('users')
        .select('username')
        .eq('username', userData.username)
        .maybeSingle();

      if (existingUsername) {
        throw new Error('Username already taken');
      }

      // Create new user
      const newUser = {
        email: userData.email,
        password: userData.password,
        username: userData.username,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`,
        xp: 0,
        level: 1,
        total_quizzes: 0,
        correct_answers: 0,
        accepted_terms: userData.acceptedTerms || false,
        accepted_privacy: userData.acceptedPrivacy || false
      };

      const { data, error } = await supabase
        .from('users')
        .insert([newUser])
        .select()
        .single();

      if (error) throw error;

      // Set as current user
      localStorage.setItem('currentUser', JSON.stringify(data));
      setUser(data);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .maybeSingle();

      if (error || !data) {
        throw new Error('Invalid email or password');
      }

      if (data.status === 'suspended' && data.suspended_until) {
        const suspendedUntil = new Date(data.suspended_until);
        if (suspendedUntil <= new Date()) {
          await supabase
            .from('users')
            .update({ status: 'active', suspended_until: null })
            .eq('id', data.id);
          data.status = 'active';
          data.suspended_until = null;
        }
      }

      localStorage.setItem('currentUser', JSON.stringify(data));
      setUser(data);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const updateUserStats = async (quizResults) => {
    if (!user) return;

    const { correctAnswers, totalQuestions, level: quizLevel } = quizResults;
    const xpGained = calculateXP(correctAnswers, totalQuestions, quizLevel);
    const percentage = (correctAnswers / totalQuestions) * 100;

    const newXp = user.xp + xpGained;
    const newLevel = calculateLevel(newXp);
    const oldLevel = user.level;

    const completedUnits = user.completed_units || [];
    const unitProgress = user.unit_progress || {};

    const isUnitComplete = percentage >= 70;

    if (isUnitComplete && !completedUnits.includes(quizLevel)) {
      completedUnits.push(quizLevel);
    }

    unitProgress[quizLevel] = {
      correct: correctAnswers,
      total: totalQuestions,
      percentage: Math.round(percentage),
      last_attempt: new Date().toISOString()
    };

    try {
      const { data: updatedUser, error: userError } = await supabase
        .from('users')
        .update({
          xp: newXp,
          level: newLevel,
          total_quizzes: user.total_quizzes + 1,
          correct_answers: user.correct_answers + correctAnswers,
          completed_units: completedUnits,
          unit_progress: unitProgress
        })
        .eq('id', user.id)
        .select()
        .single();

      if (userError) throw userError;

      const { error: resultError } = await supabase
        .from('quiz_results')
        .insert([{
          user_id: user.id,
          quiz_level: quizLevel,
          score: Math.round(percentage),
          total_questions: totalQuestions,
          correct_answers: correctAnswers,
          xp_gained: xpGained
        }]);

      if (resultError) throw resultError;

      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setUser(updatedUser);

      return { xpGained, newLevel, oldLevel };
    } catch (error) {
      console.error('Error updating user stats:', error);
      return { xpGained: 0, newLevel: oldLevel, oldLevel };
    }
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

  const getLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, username, avatar, xp, level')
        .order('xp', { ascending: false })
        .limit(10);

      if (error) throw error;

      return data.map((user, index) => ({
        ...user,
        rank: index + 1
      }));
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }
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