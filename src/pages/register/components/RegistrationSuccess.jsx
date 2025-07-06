import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationSuccess = ({ userData, onResendVerification }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResendVerification = async () => {
    setIsResending(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onResendVerification) {
        onResendVerification(userData.email);
      }
      
      // Reset countdown
      setCountdown(60);
      setCanResend(false);
    } catch (error) {
      console.error('Failed to resend verification:', error);
    } finally {
      setIsResending(false);
    }
  };

  const handleContinue = () => {
    // Navigate based on user role
    if (userData.role === 'teacher') {
      navigate('/teacher-dashboard');
    } else {
      navigate('/student-dashboard');
    }
  };

  return (
    <div className="text-center space-y-6">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center">
          <Icon name="CheckCircle" size={32} className="text-accent" />
        </div>
      </div>

      {/* Success Message */}
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-2">
          Account Created Successfully!
        </h2>
        <p className="text-text-secondary">
          Welcome to MCQ Testing System, {userData.fullName}
        </p>
      </div>

      {/* User Info Card */}
      <div className="bg-secondary-50 rounded-lg p-4 text-left">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Icon 
              name={userData.role === 'teacher' ? 'GraduationCap' : 'BookOpen'} 
              size={20} 
              color="white" 
            />
          </div>
          <div>
            <p className="font-medium text-text-primary">{userData.fullName}</p>
            <p className="text-sm text-text-secondary capitalize">{userData.role}</p>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Mail" size={16} className="text-text-secondary" />
            <span className="text-text-secondary">{userData.email}</span>
          </div>
          
          {userData.institution && (
            <div className="flex items-center space-x-2">
              <Icon name="Building" size={16} className="text-text-secondary" />
              <span className="text-text-secondary">{userData.institution}</span>
            </div>
          )}
          
          {userData.gradeLevel && (
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={16} className="text-text-secondary" />
              <span className="text-text-secondary capitalize">
                {userData.gradeLevel.replace('-', ' ')}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Email Verification Notice */}
      {!userData.isVerified && (
        <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Mail" size={20} className="text-warning mt-0.5" />
            <div className="text-left">
              <h4 className="text-sm font-medium text-text-primary mb-1">
                Verify Your Email Address
              </h4>
              <p className="text-sm text-text-secondary mb-3">
                We've sent a verification link to <strong>{userData.email}</strong>. 
                Please check your inbox and click the link to activate your account.
              </p>
              
              {/* Resend Verification */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResendVerification}
                  disabled={!canResend || isResending}
                  loading={isResending}
                  iconName="RefreshCw"
                  iconSize={14}
                >
                  {isResending ? 'Sending...' : 'Resend Email'}
                </Button>
                
                {!canResend && (
                  <span className="text-xs text-text-secondary">
                    Resend in {countdown}s
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Next Steps */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-text-primary mb-2">
          What's Next?
        </h4>
        <div className="text-left space-y-2 text-sm text-text-secondary">
          {userData.role === 'teacher' ? (
            <>
              <div className="flex items-center space-x-2">
                <Icon name="Plus" size={14} className="text-primary" />
                <span>Create your first MCQ test</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={14} className="text-primary" />
                <span>Invite students to join your tests</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="BarChart3" size={14} className="text-primary" />
                <span>Monitor student performance</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-2">
                <Icon name="FileText" size={14} className="text-primary" />
                <span>Browse available tests</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Target" size={14} className="text-primary" />
                <span>Practice with sample questions</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={14} className="text-primary" />
                <span>Track your progress</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="primary"
          fullWidth
          onClick={handleContinue}
          iconName="ArrowRight"
          iconSize={18}
        >
          Continue to Dashboard
        </Button>
        
        <Button
          variant="ghost"
          fullWidth
          onClick={() => navigate('/login')}
          iconName="LogIn"
          iconSize={16}
        >
          Sign In Later
        </Button>
      </div>

      {/* Support */}
      <div className="pt-4 border-t border-border">
        <p className="text-xs text-text-secondary mb-2">
          Need help getting started?
        </p>
        <div className="flex justify-center space-x-4 text-xs">
          <button className="text-primary hover:underline">
            Contact Support
          </button>
          <span className="text-text-muted">•</span>
          <button className="text-primary hover:underline">
            User Guide
          </button>
          <span className="text-text-muted">•</span>
          <button className="text-primary hover:underline">
            FAQ
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;