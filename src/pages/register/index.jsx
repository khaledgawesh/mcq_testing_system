import React, { useState } from 'react';
import AuthenticationWrapper from '../../components/ui/AuthenticationWrapper';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';
import RegistrationSuccess from './components/RegistrationSuccess';

const Register = () => {
  const [registrationStep, setRegistrationStep] = useState('form'); // 'form', 'success'
  const [userData, setUserData] = useState(null);

  const handleRegistrationSuccess = (user) => {
    setUserData(user);
    setRegistrationStep('success');
  };

  const handleSocialRegister = (socialUserData) => {
    setUserData(socialUserData);
    setRegistrationStep('success');
  };

  const handleResendVerification = (email) => {
    console.log('Resending verification email to:', email);
    // Handle resend verification logic here
  };

  return (
    <AuthenticationWrapper
      title="MCQ Testing System"
      subtitle="Educational Assessment Platform"
      showBackButton={true}
    >
      {registrationStep === 'form' ? (
        <div className="space-y-6">
          <RegistrationForm onRegister={handleRegistrationSuccess} />
          <SocialRegistration onSocialRegister={handleSocialRegister} />
        </div>
      ) : (
        <RegistrationSuccess 
          userData={userData}
          onResendVerification={handleResendVerification}
        />
      )}
    </AuthenticationWrapper>
  );
};

export default Register;