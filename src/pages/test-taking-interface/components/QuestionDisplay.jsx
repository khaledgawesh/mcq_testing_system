import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const QuestionDisplay = ({ 
  question, 
  selectedAnswer, 
  onAnswerSelect,
  isMarkedForReview,
  onToggleReview 
}) => {
  if (!question) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
      {/* Question Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-slate-500">
              Question {question.questionNumber}
            </span>
            {question.difficulty && (
              <span className={`px-2 py-1 text-xs rounded-full ${
                question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                question.difficulty === 'medium'? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
              }`}>
                {question.difficulty}
              </span>
            )}
          </div>
          <h2 className="text-lg font-medium text-slate-800 leading-relaxed">
            {question.text}
          </h2>
        </div>
        
        <Button
          variant={isMarkedForReview ? "warning" : "ghost"}
          size="sm"
          onClick={onToggleReview}
          iconName="Flag"
          iconSize={16}
          className="ml-4 flex-shrink-0"
        >
          <span className="hidden sm:inline ml-1">
            {isMarkedForReview ? 'Marked' : 'Mark'}
          </span>
        </Button>
      </div>

      {/* Question Image (if exists) */}
      {question.image && (
        <div className="mb-6">
          <img 
            src={question.image} 
            alt="Question illustration"
            className="max-w-full h-auto rounded-lg border border-slate-200"
          />
        </div>
      )}

      {/* Answer Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
          const isSelected = selectedAnswer === option.id;
          
          return (
            <label
              key={option.id}
              className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? 'border-blue-500 bg-blue-50' :'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-3 w-full">
                <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 flex-shrink-0 ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-500' :'border-slate-300'
                }`}>
                  {isSelected && (
                    <Icon name="Check" size={14} color="white" />
                  )}
                </div>
                
                <div className="flex items-center space-x-3 flex-1">
                  <span className={`text-sm font-medium ${
                    isSelected ? 'text-blue-700' : 'text-slate-600'
                  }`}>
                    {optionLetter}.
                  </span>
                  <span className={`text-sm ${
                    isSelected ? 'text-blue-800' : 'text-slate-700'
                  }`}>
                    {option.text}
                  </span>
                </div>
              </div>
              
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option.id}
                checked={isSelected}
                onChange={() => onAnswerSelect(option.id)}
                className="sr-only"
              />
            </label>
          );
        })}
      </div>

      {/* Question Footer */}
      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Select one answer</span>
          {question.points && (
            <span>{question.points} point{question.points !== 1 ? 's' : ''}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;