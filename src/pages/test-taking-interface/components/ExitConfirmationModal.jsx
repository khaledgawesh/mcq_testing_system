import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExitConfirmationModal = ({ 
  isOpen,
  onClose,
  onConfirm,
  hasUnsavedChanges = false 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl border border-slate-200 p-6 m-4 max-w-md w-full">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
            <Icon name="AlertTriangle" size={24} className="text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Exit Test?</h3>
            <p className="text-sm text-slate-600">Your progress will be saved</p>
          </div>
        </div>

        {/* Warning Message */}
        <div className="mb-6">
          <p className="text-slate-700 mb-3">
            Are you sure you want to exit this test? You can resume from where you left off, 
            but make sure to complete it before the deadline.
          </p>
          
          {hasUnsavedChanges && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Icon name="AlertCircle" size={16} className="text-yellow-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800">Unsaved Changes</p>
                  <p className="text-yellow-700">
                    Your recent answers will be saved automatically before exiting.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Continue Test
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            className="flex-1"
            iconName="LogOut"
            iconSize={16}
          >
            Exit Test
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExitConfirmationModal;