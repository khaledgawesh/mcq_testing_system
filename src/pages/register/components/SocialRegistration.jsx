import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const SocialRegistration = ({ onSocialRegister }) => {
  const [isLoading, setIsLoading] = useState({
    google: false,
    microsoft: false,
    apple: false
  });

  const handleSocialLogin = async (provider) => {
    setIsLoading(prev => ({ ...prev, [provider]: true }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock social registration data
      const mockUserData = {
        id: Date.now(),
        fullName: provider === 'google' ? 'John Smith' : 
                 provider === 'microsoft' ? 'Sarah Johnson' : 'Mike Wilson',
        email: provider === 'google' ? 'john.smith@gmail.com' : 
               provider === 'microsoft' ? 'sarah.johnson@outlook.com' : 'mike.wilson@icloud.com',
        role: 'student', // Default role, can be changed later
        provider: provider,
        isVerified: true
      };

      if (onSocialRegister) {
        onSocialRegister(mockUserData);
      }
    } catch (error) {
      console.error(`${provider} registration failed:`, error);
    } finally {
      setIsLoading(prev => ({ ...prev, [provider]: false }));
    }
  };

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      icon: 'Square',
      bgColor: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'Apple',
      bgColor: 'bg-black hover:bg-gray-900',
      textColor: 'text-white',
      borderColor: 'border-black'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-surface text-text-secondary">Or continue with</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {socialProviders.map((provider) => (
          <button
            key={provider.id}
            onClick={() => handleSocialLogin(provider.id)}
            disabled={isLoading[provider.id]}
            className={`
              flex items-center justify-center px-4 py-3 border rounded-md text-sm font-medium
              transition-all duration-200 micro-interaction
              ${provider.bgColor} ${provider.textColor} ${provider.borderColor}
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            `}
          >
            {isLoading[provider.id] ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Icon 
                  name={provider.icon} 
                  size={18} 
                  className="mr-2" 
                />
                <span className="hidden sm:inline">{provider.name}</span>
                <span className="sm:hidden">{provider.name.charAt(0)}</span>
              </>
            )}
          </button>
        ))}
      </div>

      {/* Social Registration Benefits */}
      <div className="mt-6 p-4 bg-accent-50 rounded-lg border border-accent-100">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-1">
              Quick & Secure Registration
            </h4>
            <p className="text-xs text-text-secondary">
              Register instantly with your existing account. Your information is protected and we never store your social media passwords.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="text-center">
        <p className="text-xs text-text-secondary">
          By registering, you agree to our data handling practices outlined in our{' '}
          <button className="text-primary hover:underline">Privacy Policy</button>
        </p>
      </div>
    </div>
  );
};

export default SocialRegistration;