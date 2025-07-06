import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TestSettings = ({ settings, onUpdate, onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    randomizeQuestions: settings.randomizeQuestions || false,
    randomizeOptions: settings.randomizeOptions || false,
    allowMultipleAttempts: settings.allowMultipleAttempts || false,
    maxAttempts: settings.maxAttempts || 1,
    showResultsImmediately: settings.showResultsImmediately || true,
    showCorrectAnswers: settings.showCorrectAnswers || true,
    allowReviewAfterSubmission: settings.allowReviewAfterSubmission || true,
    requireProctoring: settings.requireProctoring || false,
    preventCopyPaste: settings.preventCopyPaste || false,
    fullScreenMode: settings.fullScreenMode || false,
    availableFrom: settings.availableFrom || '',
    availableUntil: settings.availableUntil || '',
    publishImmediately: settings.publishImmediately || false,
    notifyStudents: settings.notifyStudents || true,
    ...settings
  });

  const handleToggle = (field) => {
    const newValue = !formData[field];
    setFormData(prev => ({ ...prev, [field]: newValue }));
    onUpdate({ ...formData, [field]: newValue });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    onUpdate({ ...formData, [field]: value });
  };

  const handleNext = () => {
    onNext();
  };

  const ToggleSwitch = ({ checked, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <label className="text-sm font-medium text-text-primary">{label}</label>
        {description && (
          <p className="text-xs text-text-secondary mt-1">{description}</p>
        )}
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          checked ? 'bg-primary' : 'bg-secondary-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="bg-surface rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
          <Icon name="Settings" size={16} color="white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Test Settings</h2>
          <p className="text-sm text-text-secondary">Configure test behavior and availability</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Question & Answer Settings */}
        <div className="space-y-6">
          <div>
            <h3 className="text-md font-medium text-text-primary mb-4 flex items-center">
              <Icon name="Shuffle" size={18} className="mr-2" />
              Question & Answer Settings
            </h3>
            <div className="space-y-1 bg-background rounded-lg p-4 border border-border">
              <ToggleSwitch
                checked={formData.randomizeQuestions}
                onChange={() => handleToggle('randomizeQuestions')}
                label="Randomize Question Order"
                description="Questions will appear in random order for each student"
              />
              <div className="border-t border-border"></div>
              <ToggleSwitch
                checked={formData.randomizeOptions}
                onChange={() => handleToggle('randomizeOptions')}
                label="Randomize Answer Options"
                description="Answer choices will be shuffled for each question"
              />
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium text-text-primary mb-4 flex items-center">
              <Icon name="RotateCcw" size={18} className="mr-2" />
              Attempt Settings
            </h3>
            <div className="space-y-1 bg-background rounded-lg p-4 border border-border">
              <ToggleSwitch
                checked={formData.allowMultipleAttempts}
                onChange={() => handleToggle('allowMultipleAttempts')}
                label="Allow Multiple Attempts"
                description="Students can retake the test if enabled"
              />
              
              {formData.allowMultipleAttempts && (
                <div className="pt-3 border-t border-border">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Maximum Attempts
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.maxAttempts}
                    onChange={(e) => handleInputChange('maxAttempts', parseInt(e.target.value) || 1)}
                    className="w-24"
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium text-text-primary mb-4 flex items-center">
              <Icon name="Calendar" size={18} className="mr-2" />
              Availability Schedule
            </h3>
            <div className="space-y-4 bg-background rounded-lg p-4 border border-border">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Available From
                </label>
                <Input
                  type="datetime-local"
                  value={formData.availableFrom}
                  onChange={(e) => handleInputChange('availableFrom', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Available Until
                </label>
                <Input
                  type="datetime-local"
                  value={formData.availableUntil}
                  onChange={(e) => handleInputChange('availableUntil', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Results & Security Settings */}
        <div className="space-y-6">
          <div>
            <h3 className="text-md font-medium text-text-primary mb-4 flex items-center">
              <Icon name="BarChart3" size={18} className="mr-2" />
              Results & Feedback
            </h3>
            <div className="space-y-1 bg-background rounded-lg p-4 border border-border">
              <ToggleSwitch
                checked={formData.showResultsImmediately}
                onChange={() => handleToggle('showResultsImmediately')}
                label="Show Results Immediately"
                description="Display score right after test submission"
              />
              <div className="border-t border-border"></div>
              <ToggleSwitch
                checked={formData.showCorrectAnswers}
                onChange={() => handleToggle('showCorrectAnswers')}
                label="Show Correct Answers"
                description="Reveal correct answers in results"
              />
              <div className="border-t border-border"></div>
              <ToggleSwitch
                checked={formData.allowReviewAfterSubmission}
                onChange={() => handleToggle('allowReviewAfterSubmission')}
                label="Allow Answer Review"
                description="Students can review their answers after submission"
              />
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium text-text-primary mb-4 flex items-center">
              <Icon name="Shield" size={18} className="mr-2" />
              Security & Proctoring
            </h3>
            <div className="space-y-1 bg-background rounded-lg p-4 border border-border">
              <ToggleSwitch
                checked={formData.requireProctoring}
                onChange={() => handleToggle('requireProctoring')}
                label="Require Proctoring"
                description="Enable webcam monitoring during test"
              />
              <div className="border-t border-border"></div>
              <ToggleSwitch
                checked={formData.preventCopyPaste}
                onChange={() => handleToggle('preventCopyPaste')}
                label="Prevent Copy/Paste"
                description="Disable copy and paste functionality"
              />
              <div className="border-t border-border"></div>
              <ToggleSwitch
                checked={formData.fullScreenMode}
                onChange={() => handleToggle('fullScreenMode')}
                label="Force Full Screen"
                description="Test must be taken in full screen mode"
              />
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium text-text-primary mb-4 flex items-center">
              <Icon name="Send" size={18} className="mr-2" />
              Publishing Options
            </h3>
            <div className="space-y-1 bg-background rounded-lg p-4 border border-border">
              <ToggleSwitch
                checked={formData.publishImmediately}
                onChange={() => handleToggle('publishImmediately')}
                label="Publish Immediately"
                description="Make test available to students right away"
              />
              <div className="border-t border-border"></div>
              <ToggleSwitch
                checked={formData.notifyStudents}
                onChange={() => handleToggle('notifyStudents')}
                label="Notify Students"
                description="Send email notification when test is published"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={onPrevious}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back to Questions
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="text-sm text-text-secondary">
            Ready to create your test
          </div>
          <Button
            variant="primary"
            onClick={handleNext}
            iconName="Check"
            iconPosition="right"
          >
            Create Test
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestSettings;