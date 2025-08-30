import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Api from '@/api/api';
import logoImg from '@/assets/logo.png';

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const { token } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    if (!token) {
      setError('Invalid reset token. Please request a new password reset link.');
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        data: {
          token: token,
          password: formData.password
        }
      };

      await Api.post('/auth/reset-password', payload);

      setSuccess('Your password has been successfully reset! You can now sign in with your new password.');

      // Clear form
      setFormData({
        password: '',
      });

      // Redirect to login after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (error) {
      console.error('Reset password error:', error);
      setError(
        error.response?.data?.message ||
        error.message ||
        'An error occurred while resetting your password. The token may have expired. Please request a new password reset link.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-fern-50 via-white to-razzmatazz-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-fern-200/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-razzmatazz-200/30 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-md w-full">
          <div className="px-8 pt-6 pb-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 animate-fade-in">
            <img
              src={logoImg}
              alt="Foursquare Logo"
              className="h-10 w-10"
            />
            <h2 className="mt-6 font-bold text-2xl">Invalid reset link</h2>

            <div className="rounded-xl bg-red-50 border border-red-200 p-4">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div className="text-sm text-red-700 font-medium">
                  Invalid reset token. Please request a new password reset link.
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/forgot-password"
                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-fern-600 to-fern-700 hover:from-fern-700 hover:to-fern-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fern-500 cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Request New Reset Link
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-fern-50 via-white to-razzmatazz-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-fern-200/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-razzmatazz-200/30 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-md w-full">
        {/* Main card */}
        <div className="px-8 pt-6 pb-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 animate-fade-in">
          <img
            src={logoImg}
            alt="Foursquare Logo"
            className="h-10 w-10"
          />
          <h2 className="mt-6 font-bold text-2xl">Reset password</h2>
          <p className="mt-1 text-sm text-gray-500">
            Remember your password?{' '}
            <Link to="/login" className="font-semibold text-fern-600 hover:text-fern-500 transition-colors duration-200">
              Sign in here
            </Link>
          </p>

          <form className="mt-10" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-4 animate-fade-in">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm text-red-700 font-medium">{error}</div>
                </div>
              </div>
            )}

            {success && (
              <div className="rounded-xl bg-green-50 border border-green-200 p-4 animate-fade-in">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm text-green-700 font-medium">{success}</div>
                </div>
              </div>
            )}

            <div className="space-y-5">
              {/* New Password Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-fern-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 bg-gray-50/50 hover:bg-gray-100 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-fern-500/20 focus:border-fern-500 focus:bg-white transition-all duration-200 text-sm"
                  placeholder="Create a new password (min 8 characters)"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Password requirements */}
            <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Password requirements:</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li className="flex items-center">
                  <svg className={`h-3 w-3 mr-2 ${formData.password.length >= 8 ? 'text-green-500' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  At least 8 characters
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-fern-600 to-fern-700 hover:from-fern-700 hover:to-fern-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fern-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-white/80 group-hover:text-white transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </span>
                {isLoading ? 'Resetting Password...' : 'Reset Password'}
              </button>
            </div>

            {/* Back to login */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Remember your password?{' '}
                <Link to="/login" className="font-semibold text-fern-600 hover:text-fern-500 transition-colors duration-200">
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
