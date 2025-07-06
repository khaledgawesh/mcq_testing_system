import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SubmitConfirmationModal = ({ 
  isOpen,
  onClose,
  onConfirm,
  totalQuestions,
  answeredQuestions,
  markedQuestions,
  timeRemaining 
}) => {
  if (!isOpen) return null;

  const unansweredCount = totalQuestions - answeredQuestions;
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl border border-slate-200 p-6 m-4 max-w-md w-full">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
            <Icon name="Send" size={24} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Submit Test?</h3>
            <p className="text-sm text-slate-600">Review your answers before submitting</p>
          </div>
        </div>

        {/* Test Summary */}
        <div className="bg-slate-50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{answeredQuestions}</div>
              <div className="text-slate-600">Answered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-400">{unansweredCount}</div>
              <div className="text-slate-600">Unanswered</div>
            </div>
          </div>
          
          {markedQuestions > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-200">
              <div className="flex items-center justify-center space-x-2 text-yellow-600">
                <Icon name="Flag" size={16} />
                <span className="text-sm font-medium">
                  {markedQuestions} question{markedQuestions !== 1 ? 's' : ''} marked for review
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Warnings */}
        {unansweredCount > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-yellow-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800">Incomplete Test</p>
                <p className="text-yellow-700">
                  You have {unansweredCount} unanswered question{unansweredCount !== 1 ? 's' : ''}. 
                  These will be marked as incorrect.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Time Remaining */}
        {timeRemaining > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-blue-600" />
              <span className="text-sm text-blue-800">
                Time remaining: <span className="font-mono font-medium">{formatTime(timeRemaining)}</span>
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Review Answers
          </Button>
          <Button
            variant="primary"
            onClick={onConfirm}
            className="flex-1"
            iconName="Send"
            iconSize={16}
          >
            Submit Test
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubmitConfirmationModal;