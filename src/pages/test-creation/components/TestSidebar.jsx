import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestSidebar = ({ 
  currentStep, 
  testData, 
  onStepChange, 
  onSave,
  isSaving = false,
  lastSaved = null 
}) => {
  const steps = [
    {
      id: 'details',
      title: 'Test Details',
      icon: 'FileText',
      description: 'Basic information',
      isComplete: testData.testDetails?.title && testData.testDetails?.subject && testData.testDetails?.description
    },
    {
      id: 'questions',
      title: 'Questions',
      icon: 'HelpCircle',
      description: `${testData.questions?.length || 0} questions`,
      isComplete: testData.questions?.length > 0 && testData.questions.every(q => 
        q.question.trim() && q.options.every(opt => opt.trim())
      )
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: 'Settings',
      description: 'Test configuration',
      isComplete: true // Settings always have defaults
    },
    {
      id: 'preview',
      title: 'Preview',
      icon: 'Eye',
      description: 'Review & publish',
      isComplete: false
    }
  ];

  const getStepStatus = (step) => {
    if (step.id === currentStep) return 'active';
    if (step.isComplete) return 'complete';
    return 'pending';
  };

  const getStepIcon = (step) => {
    const status = getStepStatus(step);
    if (status === 'complete') return 'CheckCircle';
    if (status === 'active') return step.icon;
    return step.icon;
  };

  const getStepColor = (step) => {
    const status = getStepStatus(step);
    if (status === 'complete') return 'text-success';
    if (status === 'active') return 'text-primary';
    return 'text-text-muted';
  };

  const canNavigateToStep = (stepId) => {
    const stepIndex = steps.findIndex(s => s.id === stepId);
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    
    // Can always go back
    if (stepIndex < currentIndex) return true;
    
    // Can go forward if previous steps are complete
    for (let i = 0; i < stepIndex; i++) {
      if (!steps[i].isComplete) return false;
    }
    
    return true;
  };

  const formatLastSaved = () => {
    if (!lastSaved) return 'Not saved';
    
    const now = new Date();
    const saved = new Date(lastSaved);
    const diffMinutes = Math.floor((now - saved) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Saved just now';
    if (diffMinutes < 60) return `Saved ${diffMinutes}m ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `Saved ${diffHours}h ago`;
    
    return saved.toLocaleDateString();
  };

  const getCompletionPercentage = () => {
    const completedSteps = steps.filter(step => step.isComplete).length;
    return Math.round((completedSteps / steps.length) * 100);
  };

  return (
    <div className="w-80 bg-background border-r border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="Plus" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Create Test</h2>
            <p className="text-sm text-text-secondary">Step-by-step builder</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Progress</span>
            <span className="font-medium text-text-primary">{getCompletionPercentage()}%</span>
          </div>
          <div className="w-full h-2 bg-secondary-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${getCompletionPercentage()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="flex-1 p-6 space-y-2">
        <h3 className="text-sm font-medium text-text-primary mb-4">Steps</h3>
        
        {steps.map((step, index) => {
          const canNavigate = canNavigateToStep(step.id);
          const status = getStepStatus(step);
          
          return (
            <button
              key={step.id}
              onClick={() => canNavigate && onStepChange(step.id)}
              disabled={!canNavigate}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-150 ${
                status === 'active' ?'bg-primary-50 border-primary text-primary'
                  : status === 'complete' ?'bg-success-50 border-success-100 text-success hover:bg-success-100'
                  : canNavigate
                  ? 'bg-surface border-border text-text-secondary hover:border-primary/50 hover:text-text-primary' :'bg-surface border-border text-text-muted cursor-not-allowed opacity-60'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  status === 'active' ?'bg-primary text-white'
                    : status === 'complete' ?'bg-success text-white' :'bg-secondary-100 text-text-muted'
                }`}>
                  <Icon name={getStepIcon(step)} size={16} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{step.title}</span>
                    <span className="text-xs">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-xs mt-1 opacity-80">{step.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Test Summary */}
      <div className="p-6 border-t border-border space-y-4">
        <h3 className="text-sm font-medium text-text-primary">Test Summary</h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Title:</span>
            <span className="font-medium text-text-primary truncate ml-2">
              {testData.testDetails?.title || 'Untitled Test'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Questions:</span>
            <span className="font-medium text-text-primary">
              {testData.questions?.length || 0}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Time Limit:</span>
            <span className="font-medium text-text-primary">
              {testData.testDetails?.timeLimit || 60}m
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Subject:</span>
            <span className="font-medium text-text-primary truncate ml-2">
              {testData.testDetails?.subject || 'Not set'}
            </span>
          </div>
        </div>

        {/* Save Status */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-text-secondary">{formatLastSaved()}</span>
            {isSaving && (
              <div className="flex items-center space-x-1 text-xs text-primary">
                <Icon name="Loader2" size={12} className="animate-spin" />
                <span>Saving...</span>
              </div>
            )}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onSave}
            disabled={isSaving}
            iconName="Save"
            iconSize={14}
            className="w-full"
          >
            {isSaving ? 'Saving...' : 'Save Draft'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestSidebar;