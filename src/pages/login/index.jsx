import React, { useState } from 'react';
import AuthenticationWrapper from '../../components/ui/AuthenticationWrapper';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginBackground from './components/LoginBackground';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store user session (mock)
    localStorage.setItem('userSession', JSON.stringify({
      email: formData.email,
      role: formData.role,
      rememberMe: formData.rememberMe,
      loginTime: new Date().toISOString()
    }));
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <LoginBackground />
      
      <AuthenticationWrapper
        title="MCQ Testing System"
        subtitle="Educational Assessment Platform"
        showBackButton={false}
      >
        <div className="relative z-10">
          <LoginHeader />
          <LoginForm onLogin={handleLogin} isLoading={isLoading} />
        </div>
      </AuthenticationWrapper>
    </div>
  );
};

export default Login;