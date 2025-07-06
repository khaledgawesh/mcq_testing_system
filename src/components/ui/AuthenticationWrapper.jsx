import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AuthenticationWrapper = ({ 
  children,
  showBackButton = true,
  title = 'MCQ Testing System',
  subtitle = 'Educational Assessment Platform'
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackNavigation = () => {
    // Navigate back or to home based on context
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  return (
    <div className="min-h-screen bg-background">
      {/* Simplified Header */}
      <header className="bg-surface border-b border-border shadow-elevation-1">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6 max-w-7xl mx-auto">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="GraduationCap" size={20} color="white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
              <p className="text-xs text-text-secondary -mt-1">{subtitle}</p>
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center space-x-3">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackNavigation}
                iconName="ArrowLeft"
                iconSize={16}
                className="text-text-secondary hover:text-text-primary"
              >
                <span className="hidden sm:inline ml-1">Back</span>
              </Button>
            )}

            {/* Toggle between Login/Register */}
            {isLoginPage && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/register')}
                iconName="UserPlus"
                iconSize={16}
              >
                <span className="ml-1">Register</span>
              </Button>
            )}

            {isRegisterPage && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/login')}
                iconName="LogIn"
                iconSize={16}
              >
                <span className="ml-1">Login</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            {/* Content Card */}
            <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-8 gentle-animation">
              {children}
            </div>

            {/* Footer Links */}
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center space-x-6 text-sm text-text-secondary">
                <button 
                  onClick={() => {/* Handle help */}}
                  className="hover:text-text-primary transition-colors duration-150"
                >
                  Need Help?
                </button>
                <span>•</span>
                <button 
                  onClick={() => {/* Handle privacy */}}
                  className="hover:text-text-primary transition-colors duration-150"
                >
                  Privacy Policy
                </button>
                <span>•</span>
                <button 
                  onClick={() => {/* Handle terms */}}
                  className="hover:text-text-primary transition-colors duration-150"
                >
                  Terms of Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <p>© 2024 MCQ Testing System. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <span>Secure • Reliable • Accessible</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthenticationWrapper;