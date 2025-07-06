import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl shadow-elevation-1">
          <Icon name="GraduationCap" size={24} color="white" />
        </div>
      </div>

      {/* Title and Subtitle */}
      <h1 className="text-2xl font-semibold text-text-primary mb-2">
        Welcome Back
      </h1>
      <p className="text-text-secondary">
        Sign in to access your MCQ assessment platform
      </p>
    </div>
  );
};

export default LoginHeader;