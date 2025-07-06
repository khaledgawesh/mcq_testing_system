import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestHeader = ({ 
  testTitle, 
  currentQuestion, 
  totalQuestions, 
  timeRemaining, 
  onSubmit,
  onExit 
}) => {
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
    if (timeRemaining <= 300) return 'text-red-500'; // Last 5 minutes
    if (timeRemaining <= 900) return 'text-yellow-500'; // Last 15 minutes
    return 'text-slate-700';
  };

  const progressPercentage = totalQuestions > 0 ? (currentQuestion / totalQuestions) * 100 : 0;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo and Test Title */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
            <Icon name="GraduationCap" size={20} color="white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-800 truncate max-w-48">
              {testTitle}
            </h1>
            <p className="text-xs text-slate-500 -mt-1">Assessment in Progress</p>
          </div>
        </div>

        {/* Question Counter and Timer */}
        <div className="flex items-center space-x-6">
          <div className="hidden sm:flex items-center space-x-3">
            <span className="text-sm text-slate-600">
              Question {currentQuestion} of {totalQuestions}
            </span>
            <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className={getTimeColor()} />
            <span className={`text-sm font-mono font-medium ${getTimeColor()}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onExit}
            iconName="X"
            iconSize={16}
            className="text-slate-500 hover:text-red-500"
          >
            <span className="hidden sm:inline ml-1">Exit</span>
          </Button>
          
          <Button
            variant="primary"
            size="sm"
            onClick={onSubmit}
            iconName="Send"
            iconSize={16}
          >
            <span className="hidden sm:inline ml-1">Submit</span>
          </Button>
        </div>
      </div>

      {/* Mobile Progress Bar */}
      <div className="sm:hidden px-4 pb-2">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span>Question {currentQuestion} of {totalQuestions}</span>
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>
        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </header>
  );
};

export default TestHeader;