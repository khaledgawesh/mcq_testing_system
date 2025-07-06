import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestPreview = ({ testData, onEdit, onPublish, onSaveDraft }) => {
  const [previewMode, setPreviewMode] = useState('desktop');
  const [showConfirmPublish, setShowConfirmPublish] = useState(false);

  const { testDetails, questions, settings } = testData;

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins} minutes`;
  };

  const getTotalPoints = () => {
    return questions.reduce((total, question) => total + (question.points || 1), 0);
  };

  const handlePublish = () => {
    setShowConfirmPublish(false);
    onPublish();
  };

  const PreviewHeader = () => (
    <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-2 mb-2">
        <Icon name="Eye" size={16} className="text-primary" />
        <span className="text-sm font-medium text-primary">Preview Mode</span>
      </div>
      <p className="text-sm text-text-secondary">
        This is how students will see your test. You can switch between desktop and mobile views.
      </p>
    </div>
  );

  const TestHeader = () => (
    <div className="text-center mb-8">
      <h1 className="text-2xl font-bold text-text-primary mb-2">{testDetails.title}</h1>
      <p className="text-text-secondary mb-4">{testDetails.description}</p>
      
      <div className="flex flex-wrap justify-center gap-4 text-sm text-text-secondary">
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={16} />
          <span>Time Limit: {formatTime(testDetails.timeLimit)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="HelpCircle" size={16} />
          <span>{questions.length} Questions</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Target" size={16} />
          <span>{getTotalPoints()} Points</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="BookOpen" size={16} />
          <span>{testDetails.subject}</span>
        </div>
      </div>
    </div>
  );

  const TestInstructions = () => (
    testDetails.instructions && (
      <div className="bg-background border border-border rounded-lg p-4 mb-6">
        <h3 className="font-medium text-text-primary mb-2 flex items-center">
          <Icon name="Info" size={16} className="mr-2" />
          Instructions
        </h3>
        <div className="text-sm text-text-secondary whitespace-pre-wrap">
          {testDetails.instructions}
        </div>
      </div>
    )
  );

  const QuestionPreview = ({ question, index }) => (
    <div className="bg-surface border border-border rounded-lg p-6 mb-4">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-medium text-text-primary">
          Question {index + 1}
        </h3>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <span>{question.points || 1} point{(question.points || 1) !== 1 ? 's' : ''}</span>
          <span className={`px-2 py-1 rounded text-xs ${
            question.difficulty === 'easy' ? 'bg-success-100 text-success' :
            question.difficulty === 'hard'? 'bg-error-100 text-error' : 'bg-warning-100 text-warning'
          }`}>
            {question.difficulty}
          </span>
        </div>
      </div>
      
      <p className="text-text-primary mb-4">{question.question}</p>
      
      <div className="space-y-3">
        {question.options.map((option, optionIndex) => (
          <label
            key={optionIndex}
            className="flex items-center space-x-3 p-3 border border-border rounded-md hover:bg-background cursor-pointer transition-colors duration-150"
          >
            <input
              type="radio"
              name={`question-${index}`}
              className="w-4 h-4 text-primary border-border focus:ring-primary"
              disabled
            />
            <span className="text-text-primary">
              {String.fromCharCode(65 + optionIndex)}. {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-surface rounded-lg border border-border">
      {/* Preview Controls */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
            <Icon name="Eye" size={16} color="white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Test Preview</h2>
            <p className="text-sm text-text-secondary">Review before publishing</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-background rounded-lg p-1">
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`px-3 py-1 rounded text-sm transition-colors duration-150 ${
                previewMode === 'desktop' ?'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="Monitor" size={16} className="mr-1" />
              Desktop
            </button>
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`px-3 py-1 rounded text-sm transition-colors duration-150 ${
                previewMode === 'mobile' ?'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="Smartphone" size={16} className="mr-1" />
              Mobile
            </button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="p-6">
        <div className={`mx-auto transition-all duration-300 ${
          previewMode === 'mobile' ? 'max-w-sm' : 'max-w-4xl'
        }`}>
          <PreviewHeader />
          
          <div className="bg-background rounded-lg border border-border p-6">
            <TestHeader />
            <TestInstructions />
            
            <div className="space-y-4">
              {questions.map((question, index) => (
                <QuestionPreview key={question.id} question={question} index={index} />
              ))}
            </div>

            {/* Mock Submit Button */}
            <div className="flex justify-center mt-8">
              <Button variant="primary" disabled iconName="Send">
                Submit Test (Preview)
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center p-6 border-t border-border">
        <Button
          variant="outline"
          onClick={() => onEdit('settings')}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back to Settings
        </Button>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={onSaveDraft}
            iconName="Save"
            iconPosition="left"
          >
            Save as Draft
          </Button>
          <Button
            variant="primary"
            onClick={() => setShowConfirmPublish(true)}
            iconName="Send"
            iconPosition="right"
          >
            Publish Test
          </Button>
        </div>
      </div>

      {/* Publish Confirmation Modal */}
      {showConfirmPublish && (
        <div className="fixed inset-0 z-1020 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-surface rounded-lg shadow-elevation-3 border border-border p-6 m-4 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-full">
                <Icon name="Send" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Publish Test?</h3>
                <p className="text-sm text-text-secondary">Make this test available to students</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Questions:</span>
                <span className="font-medium text-text-primary">{questions.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Total Points:</span>
                <span className="font-medium text-text-primary">{getTotalPoints()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Time Limit:</span>
                <span className="font-medium text-text-primary">{formatTime(testDetails.timeLimit)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Availability:</span>
                <span className="font-medium text-text-primary">
                  {settings.publishImmediately ? 'Immediate' : 'Scheduled'}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmPublish(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handlePublish}
                className="flex-1"
              >
                Publish Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestPreview;