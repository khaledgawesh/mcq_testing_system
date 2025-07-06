import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuestionManager = ({ questions, onUpdate, onNext, onPrevious }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showBulkImport, setShowBulkImport] = useState(false);

  const addNewQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
      points: 1,
      difficulty: 'medium'
    };
    
    const updatedQuestions = [...questions, newQuestion];
    onUpdate(updatedQuestions);
    setActiveQuestion(updatedQuestions.length - 1);
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    onUpdate(updatedQuestions);
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    onUpdate(updatedQuestions);
  };

  const deleteQuestion = (index) => {
    if (questions.length <= 1) return;
    
    const updatedQuestions = questions.filter((_, i) => i !== index);
    onUpdate(updatedQuestions);
    
    if (activeQuestion >= updatedQuestions.length) {
      setActiveQuestion(updatedQuestions.length - 1);
    }
  };

  const duplicateQuestion = (index) => {
    const questionToDuplicate = { ...questions[index] };
    questionToDuplicate.id = Date.now();
    questionToDuplicate.question = `${questionToDuplicate.question} (Copy)`;
    
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index + 1, 0, questionToDuplicate);
    onUpdate(updatedQuestions);
    setActiveQuestion(index + 1);
  };

  const moveQuestion = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= questions.length) return;
    
    const updatedQuestions = [...questions];
    const [movedQuestion] = updatedQuestions.splice(fromIndex, 1);
    updatedQuestions.splice(toIndex, 0, movedQuestion);
    onUpdate(updatedQuestions);
    setActiveQuestion(toIndex);
  };

  const validateQuestions = () => {
    return questions.every(q => 
      q.question.trim() && 
      q.options.every(opt => opt.trim()) &&
      q.options[q.correctAnswer]?.trim()
    );
  };

  const handleNext = () => {
    if (validateQuestions()) {
      onNext();
    }
  };

  const currentQuestion = questions[activeQuestion] || {};

  return (
    <div className="bg-surface rounded-lg border border-border">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
            <Icon name="HelpCircle" size={16} color="white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Question Management</h2>
            <p className="text-sm text-text-secondary">
              {questions.length} question{questions.length !== 1 ? 's' : ''} created
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowBulkImport(true)}
            iconName="Upload"
            iconSize={16}
          >
            Bulk Import
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={addNewQuestion}
            iconName="Plus"
            iconSize={16}
          >
            Add Question
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Question List Sidebar */}
        <div className="w-80 border-r border-border bg-background">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-medium text-text-primary mb-3">Questions</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  onClick={() => setActiveQuestion(index)}
                  className={`p-3 rounded-md border cursor-pointer transition-colors duration-150 ${
                    activeQuestion === index
                      ? 'bg-primary-50 border-primary text-primary' :'bg-surface border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Question {index + 1}
                    </span>
                    <div className="flex items-center space-x-1">
                      {question.question.trim() && question.options.every(opt => opt.trim()) ? (
                        <Icon name="CheckCircle" size={14} className="text-success" />
                      ) : (
                        <Icon name="AlertCircle" size={14} className="text-warning" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-text-secondary mt-1 truncate">
                    {question.question || 'Untitled question'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Question Editor */}
        <div className="flex-1 p-6">
          {questions.length > 0 ? (
            <div className="space-y-6">
              {/* Question Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-text-primary">
                  Question {activeQuestion + 1}
                </h3>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveQuestion(activeQuestion, activeQuestion - 1)}
                    disabled={activeQuestion === 0}
                    iconName="ArrowUp"
                    iconSize={16}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveQuestion(activeQuestion, activeQuestion + 1)}
                    disabled={activeQuestion === questions.length - 1}
                    iconName="ArrowDown"
                    iconSize={16}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => duplicateQuestion(activeQuestion)}
                    iconName="Copy"
                    iconSize={16}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteQuestion(activeQuestion)}
                    disabled={questions.length <= 1}
                    iconName="Trash2"
                    iconSize={16}
                    className="text-error hover:text-error"
                  />
                </div>
              </div>

              {/* Question Content */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Question Text *
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter your question here..."
                  value={currentQuestion.question || ''}
                  onChange={(e) => updateQuestion(activeQuestion, 'question', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                />
              </div>

              {/* Answer Options */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Answer Options *
                </label>
                <div className="space-y-3">
                  {(currentQuestion.options || []).map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name={`correct-answer-${activeQuestion}`}
                        checked={currentQuestion.correctAnswer === optionIndex}
                        onChange={() => updateQuestion(activeQuestion, 'correctAnswer', optionIndex)}
                        className="w-4 h-4 text-primary border-border focus:ring-primary"
                      />
                      <div className="flex-1">
                        <Input
                          type="text"
                          placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                          value={option}
                          onChange={(e) => updateOption(activeQuestion, optionIndex, e.target.value)}
                        />
                      </div>
                      <span className="text-sm text-text-secondary w-8">
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-text-secondary mt-2">
                  Select the radio button next to the correct answer
                </p>
              </div>

              {/* Additional Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Points
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={currentQuestion.points || 1}
                    onChange={(e) => updateQuestion(activeQuestion, 'points', parseInt(e.target.value) || 1)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Difficulty
                  </label>
                  <select
                    value={currentQuestion.difficulty || 'medium'}
                    onChange={(e) => updateQuestion(activeQuestion, 'difficulty', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              {/* Explanation */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Explanation (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Explain why this is the correct answer..."
                  value={currentQuestion.explanation || ''}
                  onChange={(e) => updateQuestion(activeQuestion, 'explanation', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                />
                <p className="text-xs text-text-secondary mt-1">
                  This will be shown to students after they submit their answers
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon name="HelpCircle" size={48} className="text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">No Questions Yet</h3>
              <p className="text-text-secondary mb-4">Start by adding your first question</p>
              <Button variant="primary" onClick={addNewQuestion} iconName="Plus">
                Add First Question
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center p-6 border-t border-border">
        <Button
          variant="outline"
          onClick={onPrevious}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back to Details
        </Button>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-text-secondary">
            {questions.filter(q => q.question.trim() && q.options.every(opt => opt.trim())).length} of {questions.length} questions complete
          </div>
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={!validateQuestions()}
            iconName="ArrowRight"
            iconPosition="right"
          >
            Continue to Settings
          </Button>
        </div>
      </div>

      {/* Bulk Import Modal */}
      {showBulkImport && (
        <div className="fixed inset-0 z-1020 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-surface rounded-lg shadow-elevation-3 border border-border p-6 m-4 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Bulk Import Questions</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBulkImport(false)}
                iconName="X"
                iconSize={16}
              />
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-text-secondary">
                Upload a CSV file with questions. Format: Question, Option A, Option B, Option C, Option D, Correct Answer (A/B/C/D), Explanation
              </p>
              
              <Input type="file" accept=".csv,.xlsx,.xls" />
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowBulkImport(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    // Handle bulk import
                    setShowBulkImport(false);
                  }}
                  className="flex-1"
                >
                  Import
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionManager;