import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import TestSidebar from './components/TestSidebar';
import TestDetailsForm from './components/TestDetailsForm';
import QuestionManager from './components/QuestionManager';
import TestSettings from './components/TestSettings';
import TestPreview from './components/TestPreview';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TestCreation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('details');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const [testData, setTestData] = useState({
    testDetails: {
      title: '',
      description: '',
      subject: '',
      timeLimit: 60,
      instructions: '',
      difficulty: 'medium',
      category: '',
      passingScore: 70
    },
    questions: [
      {
        id: Date.now(),
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: '',
        points: 1,
        difficulty: 'medium'
      }
    ],
    settings: {
      randomizeQuestions: false,
      randomizeOptions: false,
      allowMultipleAttempts: false,
      maxAttempts: 1,
      showResultsImmediately: true,
      showCorrectAnswers: true,
      allowReviewAfterSubmission: true,
      requireProctoring: false,
      preventCopyPaste: false,
      fullScreenMode: false,
      availableFrom: '',
      availableUntil: '',
      publishImmediately: false,
      notifyStudents: true
    }
  });

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (testData.testDetails.title.trim()) {
        handleSave(true); // Silent save
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [testData]);

  const handleSave = async (silent = false) => {
    if (!silent) setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage as backup
      localStorage.setItem('test-draft', JSON.stringify({
        ...testData,
        lastSaved: new Date().toISOString()
      }));
      
      setLastSaved(new Date());
      
      if (!silent) {
        // Show success message
        console.log('Test saved successfully');
      }
    } catch (error) {
      console.error('Failed to save test:', error);
    } finally {
      if (!silent) setIsSaving(false);
    }
  };

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  const handleTestDetailsUpdate = (details) => {
    setTestData(prev => ({
      ...prev,
      testDetails: { ...prev.testDetails, ...details }
    }));
  };

  const handleQuestionsUpdate = (questions) => {
    setTestData(prev => ({
      ...prev,
      questions
    }));
  };

  const handleSettingsUpdate = (settings) => {
    setTestData(prev => ({
      ...prev,
      settings: { ...prev.settings, ...settings }
    }));
  };

  const handleNext = () => {
    const steps = ['details', 'questions', 'settings', 'preview'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const steps = ['details', 'questions', 'settings', 'preview'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handlePublish = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API call to publish test
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear draft from localStorage
      localStorage.removeItem('test-draft');
      
      // Navigate to teacher dashboard with success message
      navigate('/teacher-dashboard', { 
        state: { 
          message: 'Test published successfully!',
          testTitle: testData.testDetails.title 
        }
      });
    } catch (error) {
      console.error('Failed to publish test:', error);
      setIsSaving(false);
    }
  };

  const handleSaveDraft = async () => {
    await handleSave();
    navigate('/teacher-dashboard', { 
      state: { 
        message: 'Test saved as draft',
        testTitle: testData.testDetails.title 
      }
    });
  };

  const handleExit = () => {
    if (testData.testDetails.title.trim() || testData.questions.some(q => q.question.trim())) {
      setShowExitConfirm(true);
    } else {
      navigate('/teacher-dashboard');
    }
  };

  const confirmExit = () => {
    setShowExitConfirm(false);
    navigate('/teacher-dashboard');
  };

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('test-draft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setTestData(draft);
        setLastSaved(new Date(draft.lastSaved));
      } catch (error) {
        console.error('Failed to load draft:', error);
      }
    }
  }, []);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'details':
        return (
          <TestDetailsForm
            testDetails={testData.testDetails}
            onUpdate={handleTestDetailsUpdate}
            onNext={handleNext}
          />
        );
      case 'questions':
        return (
          <QuestionManager
            questions={testData.questions}
            onUpdate={handleQuestionsUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 'settings':
        return (
          <TestSettings
            settings={testData.settings}
            onUpdate={handleSettingsUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 'preview':
        return (
          <TestPreview
            testData={testData}
            onEdit={setCurrentStep}
            onPublish={handlePublish}
            onSaveDraft={handleSaveDraft}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        userRole="teacher" 
        userName="Dr. Sarah Johnson"
        onLogout={() => navigate('/login')}
      />
      
      <div className="pt-16 h-screen flex">
        {/* Sidebar */}
        <TestSidebar
          currentStep={currentStep}
          testData={testData}
          onStepChange={handleStepChange}
          onSave={handleSave}
          isSaving={isSaving}
          lastSaved={lastSaved}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div className="bg-surface border-b border-border px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExit}
                iconName="ArrowLeft"
                iconSize={16}
                className="text-text-secondary hover:text-text-primary"
              >
                Exit
              </Button>
              <div className="h-4 w-px bg-border"></div>
              <div>
                <h1 className="text-lg font-semibold text-text-primary">
                  {testData.testDetails.title || 'New Test'}
                </h1>
                <p className="text-sm text-text-secondary">
                  {currentStep === 'details' && 'Configure basic test information'}
                  {currentStep === 'questions' && 'Add and manage test questions'}
                  {currentStep === 'settings' && 'Set test behavior and availability'}
                  {currentStep === 'preview' && 'Review and publish your test'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {isSaving && (
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  <span>Saving...</span>
                </div>
              )}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSave()}
                disabled={isSaving}
                iconName="Save"
                iconSize={16}
              >
                Save Draft
              </Button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-6xl mx-auto">
              {renderCurrentStep()}
            </div>
          </div>
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-1020 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-surface rounded-lg shadow-elevation-3 border border-border p-6 m-4 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-warning-100 rounded-full">
                <Icon name="AlertTriangle" size={20} className="text-warning" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Unsaved Changes</h3>
                <p className="text-sm text-text-secondary">You have unsaved changes</p>
              </div>
            </div>
            
            <p className="text-text-secondary mb-6">
              Are you sure you want to exit? Your changes will be lost unless you save them first.
            </p>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowExitConfirm(false)}
                className="flex-1"
              >
                Continue Editing
              </Button>
              <Button
                variant="outline"
                onClick={async () => {
                  await handleSave();
                  confirmExit();
                }}
                className="flex-1"
              >
                Save & Exit
              </Button>
              <Button
                variant="danger"
                onClick={confirmExit}
                className="flex-1"
              >
                Exit Without Saving
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestCreation;