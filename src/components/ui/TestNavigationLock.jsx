import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const TestNavigationLock = ({ 
  testTitle = 'Assessment in Progress',
  timeRemaining = 0,
  currentQuestion = 1,
  totalQuestions = 10,
  onExitTest,
  onSubmitTest,
  allowExit = true,
  showTimer = true,
  showProgress = true
}) => {
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeRemaining);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0 && showTimer) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Auto-submit when time runs out
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, showTimer]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeLeft <= 300) return 'text-error'; // Last 5 minutes
    if (timeLeft <= 900) return 'text-warning'; // Last 15 minutes
    return 'text-text-primary';
  };

  const handleExitTest = () => {
    if (allowExit) {
      setShowExitConfirm(true);
    }
  };

  const confirmExit = () => {
    setShowExitConfirm(false);
    if (onExitTest) {
      onExitTest();
    } else {
      navigate('/student-dashboard');
    }
  };

  const handleSubmitTest = () => {
    if (onSubmitTest) {
      onSubmitTest();
    } else {
      navigate('/student-dashboard');
    }
  };

  const progressPercentage = totalQuestions > 0 ? (currentQuestion / totalQuestions) * 100 : 0;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-1001 bg-surface border-b border-border shadow-elevation-1">
        <div className="flex items-center justify-between h-14 px-4 lg:px-6">
          {/* Minimal Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-7 h-7 bg-primary rounded-md">
              <Icon name="GraduationCap" size={16} color="white" />
            </div>
            <div>
              <h1 className="text-sm font-medium text-text-primary truncate max-w-48">
                {testTitle}
              </h1>
            </div>
          </div>

          {/* Center - Progress and Timer */}
          <div className="flex items-center space-x-6">
            {showProgress && (
              <div className="hidden sm:flex items-center space-x-3">
                <span className="text-sm text-text-secondary">
                  Question {currentQuestion} of {totalQuestions}
                </span>
                <div className="w-32 h-2 bg-secondary-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            )}

            {showTimer && timeLeft > 0 && (
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className={getTimeColor()} />
                <span className={`text-sm font-mono font-medium ${getTimeColor()}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            )}
          </div>

          {/* Right - Actions */}
          <div className="flex items-center space-x-2">
            {allowExit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExitTest}
                className="text-text-secondary hover:text-error"
                iconName="X"
                iconSize={16}
              >
                <span className="hidden sm:inline ml-1">Exit</span>
              </Button>
            )}
            
            <Button
              variant="primary"
              size="sm"
              onClick={handleSubmitTest}
              iconName="Send"
              iconSize={16}
            >
              <span className="hidden sm:inline ml-1">Submit</span>
            </Button>
          </div>
        </div>

        {/* Mobile Progress Bar */}
        {showProgress && (
          <div className="sm:hidden px-4 pb-2">
            <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
              <span>Question {currentQuestion} of {totalQuestions}</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <div className="w-full h-1.5 bg-secondary-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </header>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-1020 flex items-center justify-center bg-black bg-opacity-50 gentle-animation">
          <div className="bg-surface rounded-lg shadow-elevation-3 border border-border p-6 m-4 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-warning-100 rounded-full">
                <Icon name="AlertTriangle" size={20} className="text-warning" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Exit Test?</h3>
                <p className="text-sm text-text-secondary">Your progress will be lost</p>
              </div>
            </div>
            
            <p className="text-text-secondary mb-6">
              Are you sure you want to exit this test? All your answers will be lost and you may not be able to retake it.
            </p>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowExitConfirm(false)}
                className="flex-1"
              >
                Continue Test
              </Button>
              <Button
                variant="danger"
                onClick={confirmExit}
                className="flex-1"
              >
                Exit Test
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TestNavigationLock;