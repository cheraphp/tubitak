import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import PrivacyPolicy from '../Legal/PrivacyPolicy';
import TermsOfService from '../Legal/TermsOfService';

function Register({ onClose, switchToLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false,
    acceptedPrivacy: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (!formData.acceptedTerms) {
      setError('Kullanım Koşulları\'nı kabul etmelisiniz');
      setLoading(false);
      return;
    }

    if (!formData.acceptedPrivacy) {
      setError('Gizlilik Politikası\'nı kabul etmelisiniz');
      setLoading(false);
      return;
    }

    const result = await register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      acceptedTerms: formData.acceptedTerms,
      acceptedPrivacy: formData.acceptedPrivacy
    });
    
    if (result.success) {
      onClose();
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div 
      className="modal-overlay animate-fade-in" 
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-secondary-600 to-pink-600 text-white p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative">
            <button 
              className="absolute top-0 right-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              onClick={onClose}
            >
              <i className="bi bi-x-lg text-sm"></i>
            </button>
            <h2 className="text-2xl font-bold mb-2">Join VocQuiz!</h2>
            <p className="opacity-90">Create your account and start learning</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
              <i className="bi bi-exclamation-triangle"></i>
              <span>{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Choose a username"
              minLength="3"
              className="input"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="input"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
              minLength="6"
              className="input"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              className="input"
            />
          </div>

          <div className="space-y-3 border-t border-gray-200 pt-4">
  {/* Terms of Service Checkbox */}
  <div className="flex items-start gap-3">
    <input
      type="checkbox"
      id="acceptedTerms"
      name="acceptedTerms"
      checked={formData.acceptedTerms}
      onChange={handleChange}
      required
      className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
    />
    <label htmlFor="acceptedTerms" className="text-sm text-gray-700">
      <button
        type="button"
        onClick={() => setShowTerms(true)}
        className="text-primary-600 hover:text-primary-700 font-medium underline"
      >
        Terms of Service
      </button>
      {' '}I have read and agree to the terms
    </label>
  </div>

  {/* Privacy Policy Checkbox */}
  <div className="flex items-start gap-3">
    <input
      type="checkbox"
      id="acceptedPrivacy"
      name="acceptedPrivacy"
      checked={formData.acceptedPrivacy}
      onChange={handleChange}
      required
      className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
    />
    <label htmlFor="acceptedPrivacy" className="text-sm text-gray-700">
      <button
        type="button"
        onClick={() => setShowPrivacy(true)}
        className="text-primary-600 hover:text-primary-700 font-medium underline"
      >
        Privacy Policy
      </button>
      {' '}I have read and agree to the policy
    </label>
  </div>
</div>


          <button type="submit" className="btn btn-secondary w-full" disabled={loading}>
            {loading ? (
              <>
                <div className="loading-spinner"></div>
                Creating Account...
              </>
            ) : (
              <>
                <i className="bi bi-person-plus"></i>
                Create Account
              </>
            )}
          </button>
        </form>

        <div className="px-6 pb-6 text-center border-t border-gray-200 pt-4">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              className="text-secondary-600 hover:text-secondary-700 font-medium"
              onClick={switchToLogin}
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>

      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
      {showTerms && <TermsOfService onClose={() => setShowTerms(false)} />}
    </div>
  );
}

export default Register;