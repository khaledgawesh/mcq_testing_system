import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TestHeader from './components/TestHeader';
import QuestionDisplay from './components/QuestionDisplay';
import NavigationControls from './components/NavigationControls';
import QuestionNavigator from './components/QuestionNavigator';
import AutoSaveIndicator from './components/AutoSaveIndicator';
import SubmitConfirmationModal from './components/SubmitConfirmationModal';
import ExitConfirmationModal from './components/ExitConfirmationModal';
import Icon from '../../components/AppIcon';


const TestTakingInterface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Mock test data
  const mockTest = {
    id: 1,
    title: "Mathematics Assessment - Algebra & Geometry",
    duration: 3600, // 60 minutes in seconds
    totalQuestions: 15,
    instructions: "Choose the best answer for each question. You can mark questions for review and return to them later.",
    questions: [
      {
        id: 1,
        questionNumber: 1,
        text: "What is the value of x in the equation 2x + 5 = 13?",
        difficulty: "easy",
        points: 2,
        options: [
          { id: "a", text: "x = 3" },
          { id: "b", text: "x = 4" },
          { id: "c", text: "x = 5" },
          { id: "d", text: "x = 6" }
        ]
      },
      {
        id: 2,
        questionNumber: 2,
        text: "Which of the following is the correct formula for the area of a circle?",
        difficulty: "easy",
        points: 2,
        options: [
          { id: "a", text: "A = πr" },
          { id: "b", text: "A = πr²" },
          { id: "c", text: "A = 2πr" },
          { id: "d", text: "A = πd²" }
        ]
      },
      {
        id: 3,
        questionNumber: 3,
        text: "If a triangle has sides of length 3, 4, and 5 units, what type of triangle is it?",
        difficulty: "medium",
        points: 3,
        options: [
          { id: "a", text: "Equilateral triangle" },
          { id: "b", text: "Isosceles triangle" },
          { id: "c", text: "Right triangle" },
          { id: "d", text: "Obtuse triangle" }
        ]
      },
      {
        id: 4,
        questionNumber: 4,
        text: "What is the slope of the line passing through points (2, 3) and (6, 11)?",
        difficulty: "medium",
        points: 3,
        options: [
          { id: "a", text: "m = 1" },
          { id: "b", text: "m = 2" },
          { id: "c", text: "m = 3" },
          { id: "d", text: "m = 4" }
        ]
      },
      {
        id: 5,
        questionNumber: 5,
        text: "Which of the following represents the quadratic formula?",
        difficulty: "hard",
        points: 4,
        options: [
          { id: "a", text: "x = (-b ± √(b² - 4ac)) / 2a" },
          { id: "b", text: "x = (-b ± √(b² + 4ac)) / 2a" },
          { id: "c", text: "x = (b ± √(b² - 4ac)) / 2a" },
          { id: "d", text: "x = (-b ± √(b² - 4ac)) / a" }
        ]
      },
      {
        id: 6,
        questionNumber: 6,
        text: "What is the volume of a cylinder with radius 3 cm and height 8 cm? (Use π ≈ 3.14)",
        difficulty: "medium",
        points: 3,
        options: [
          { id: "a", text: "72π cm³" },
          { id: "b", text: "48π cm³" },
          { id: "c", text: "24π cm³" },
          { id: "d", text: "96π cm³" }
        ]
      },
      {
        id: 7,
        questionNumber: 7,
        text: "If log₂(x) = 5, what is the value of x?",
        difficulty: "hard",
        points: 4,
        options: [
          { id: "a", text: "x = 10" },
          { id: "b", text: "x = 25" },
          { id: "c", text: "x = 32" },
          { id: "d", text: "x = 64" }
        ]
      },
      {
        id: 8,
        questionNumber: 8,
        text: "What is the sum of the interior angles of a hexagon?",
        difficulty: "medium",
        points: 3,
        options: [
          { id: "a", text: "540°" },
          { id: "b", text: "720°" },
          { id: "c", text: "900°" },
          { id: "d", text: "1080°" }
        ]
      },
      {
        id: 9,
        questionNumber: 9,
        text: "Which of the following is equivalent to (x + 3)²?",
        difficulty: "easy",
        points: 2,
        options: [
          { id: "a", text: "x² + 6x + 9" },
          { id: "b", text: "x² + 3x + 9" },
          { id: "c", text: "x² + 6x + 6" },
          { id: "d", text: "x² + 9" }
        ]
      },
      {
        id: 10,
        questionNumber: 10,
        text: "What is the distance between points A(1, 2) and B(4, 6)?",
        difficulty: "medium",
        points: 3,
        options: [
          { id: "a", text: "3" },
          { id: "b", text: "4" },
          { id: "c", text: "5" },
          { id: "d", text: "7" }
        ]
      },
      {
        id: 11,
        questionNumber: 11,
        text: "If sin(θ) = 3/5 and θ is in the first quadrant, what is cos(θ)?",
        difficulty: "hard",
        points: 4,
        options: [
          { id: "a", text: "4/5" },
          { id: "b", text: "3/4" },
          { id: "c", text: "5/4" },
          { id: "d", text: "5/3" }
        ]
      },
      {
        id: 12,
        questionNumber: 12,
        text: "What is the derivative of f(x) = 3x² + 2x - 1?",
        difficulty: "hard",
        points: 4,
        options: [
          { id: "a", text: "f'(x) = 6x + 2" },
          { id: "b", text: "f'(x) = 6x - 2" },
          { id: "c", text: "f'(x) = 3x + 2" },
          { id: "d", text: "f'(x) = 6x + 1" }
        ]
      },
      {
        id: 13,
        questionNumber: 13,
        text: "Which of the following is the correct factorization of x² - 9?",
        difficulty: "easy",
        points: 2,
        options: [
          { id: "a", text: "(x - 3)(x - 3)" },
          { id: "b", text: "(x + 3)(x + 3)" },
          { id: "c", text: "(x - 3)(x + 3)" },
          { id: "d", text: "(x - 9)(x + 1)" }
        ]
      },
      {
        id: 14,
        questionNumber: 14,
        text: "What is the median of the data set: 2, 5, 7, 8, 9, 12, 15?",
        difficulty: "easy",
        points: 2,
        options: [
          { id: "a", text: "7" },
          { id: "b", text: "8" },
          { id: "c", text: "9" },
          { id: "d", text: "8.5" }
        ]
      },
      {
        id: 15,
        questionNumber: 15,
        text: "If a function f(x) = 2x + 3, what is f⁻¹(x)?",
        difficulty: "hard",
        points: 4,
        options: [
          { id: "a", text: "f⁻¹(x) = (x - 3)/2" },
          { id: "b", text: "f⁻¹(x) = (x + 3)/2" },
          { id: "c", text: "f⁻¹(x) = 2x - 3" },
          { id: "d", text: "f⁻¹(x) = (2x - 3)" }
        ]
      }
    ]
  };

  // State management
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(mockTest.duration);
  const [isNavigatorCollapsed, setIsNavigatorCollapsed] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Auto-save functionality
  const autoSave = useCallback(async () => {
    if (hasUnsavedChanges) {
      setIsSaving(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastSaved(new Date());
      setIsSaving(false);
      setHasUnsavedChanges(false);
    }
  }, [hasUnsavedChanges]);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  // Auto-save every 30 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(autoSave, 30000);
    return () => clearInterval(autoSaveInterval);
  }, [autoSave]);

  // Prevent accidental navigation
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Handle answer selection
  const handleAnswerSelect = (optionId) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: optionId
    }));
    setHasUnsavedChanges(true);
  };

  // Handle mark for review
  const handleToggleReview = () => {
    setMarkedForReview(prev => {
      const isMarked = prev.includes(currentQuestion);
      if (isMarked) {
        return prev.filter(q => q !== currentQuestion);
      } else {
        return [...prev, currentQuestion];
      }
    });
    setHasUnsavedChanges(true);
  };

  // Navigation handlers
  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < mockTest.totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleQuestionSelect = (questionNumber) => {
    setCurrentQuestion(questionNumber);
  };

  // Submit handlers
  const handleSubmitTest = async () => {
    await autoSave();
    // Navigate to results or dashboard
    navigate('/student-dashboard', { 
      state: { 
        testCompleted: true, 
        testId: mockTest.id,
        answers: answers,
        totalQuestions: mockTest.totalQuestions
      } 
    });
  };

  const handleExitTest = async () => {
    await autoSave();
    navigate('/student-dashboard');
  };

  // Get current question data
  const getCurrentQuestion = () => {
    return mockTest.questions.find(q => q.questionNumber === currentQuestion);
  };

  const currentQuestionData = getCurrentQuestion();
  const selectedAnswer = answers[currentQuestion];
  const isMarkedForReview = markedForReview.includes(currentQuestion);
  const hasAnswer = selectedAnswer !== undefined;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Test Header */}
      <TestHeader
        testTitle={mockTest.title}
        currentQuestion={currentQuestion}
        totalQuestions={mockTest.totalQuestions}
        timeRemaining={timeRemaining}
        onSubmit={() => setShowSubmitModal(true)}
        onExit={() => setShowExitModal(true)}
      />

      {/* Auto-save Indicator */}
      <AutoSaveIndicator
        lastSaved={lastSaved}
        isSaving={isSaving}
      />

      {/* Main Content */}
      <div className="pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Test Instructions (shown only on first question) */}
          {currentQuestion === 1 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-800 mb-1">Test Instructions</h3>
                  <p className="text-sm text-blue-700">{mockTest.instructions}</p>
                </div>
              </div>
            </div>
          )}

          {/* Question Display */}
          <QuestionDisplay
            question={currentQuestionData}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
            isMarkedForReview={isMarkedForReview}
            onToggleReview={handleToggleReview}
          />
        </div>
      </div>

      {/* Navigation Controls */}
      <NavigationControls
        currentQuestion={currentQuestion}
        totalQuestions={mockTest.totalQuestions}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={() => setShowSubmitModal(true)}
        hasAnswer={hasAnswer}
        isMarkedForReview={isMarkedForReview}
      />

      {/* Question Navigator */}
      <QuestionNavigator
        questions={mockTest.questions}
        currentQuestion={currentQuestion}
        answers={answers}
        markedForReview={markedForReview}
        onQuestionSelect={handleQuestionSelect}
        isCollapsed={isNavigatorCollapsed}
        onToggleCollapse={() => setIsNavigatorCollapsed(!isNavigatorCollapsed)}
      />

      {/* Submit Confirmation Modal */}
      <SubmitConfirmationModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        onConfirm={handleSubmitTest}
        totalQuestions={mockTest.totalQuestions}
        answeredQuestions={Object.keys(answers).length}
        markedQuestions={markedForReview.length}
        timeRemaining={timeRemaining}
      />

      {/* Exit Confirmation Modal */}
      <ExitConfirmationModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onConfirm={handleExitTest}
        hasUnsavedChanges={hasUnsavedChanges}
      />
    </div>
  );
};

export default TestTakingInterface;