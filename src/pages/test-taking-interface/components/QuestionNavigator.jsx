import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuestionNavigator = ({ 
  questions,
  currentQuestion,
  answers,
  markedForReview,
  onQuestionSelect,
  isCollapsed,
  onToggleCollapse 
}) => {
  const getQuestionStatus = (questionNumber) => {
    const hasAnswer = answers[questionNumber] !== undefined;
    const isMarked = markedForReview.includes(questionNumber);
    
    if (hasAnswer && isMarked) return 'answered-marked';
    if (hasAnswer) return 'answered';
    if (isMarked) return 'marked';
    return 'unanswered';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'answered':
        return 'bg-green-500 text-white border-green-500';
      case 'marked':
        return 'bg-yellow-500 text-white border-yellow-500';
      case 'answered-marked':
        return 'bg-blue-500 text-white border-blue-500';
      default:
        return 'bg-white text-slate-600 border-slate-300 hover:border-slate-400';
    }
  };

  const getStatusCount = () => {
    const answered = Object.keys(answers).length;
    const marked = markedForReview.length;
    const unanswered = questions.length - answered;
    
    return { answered, marked, unanswered };
  };

  const statusCount = getStatusCount();

  return (
    <div className={`fixed right-0 top-16 bottom-16 bg-white border-l border-slate-200 shadow-lg transition-all duration-300 z-30 ${
      isCollapsed ? 'w-12' : 'w-80'
    }`}>
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleCollapse}
        className="absolute -left-10 top-4 bg-white border border-slate-200 shadow-sm"
        iconName={isCollapsed ? "ChevronLeft" : "ChevronRight"}
        iconSize={16}
      />

      {!isCollapsed && (
        <div className="p-4 h-full flex flex-col">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Questions</h3>
            
            {/* Status Summary */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center p-2 bg-green-50 rounded">
                <div className="font-semibold text-green-700">{statusCount.answered}</div>
                <div className="text-green-600">Answered</div>
              </div>
              <div className="text-center p-2 bg-yellow-50 rounded">
                <div className="font-semibold text-yellow-700">{statusCount.marked}</div>
                <div className="text-yellow-600">Marked</div>
              </div>
              <div className="text-center p-2 bg-slate-50 rounded">
                <div className="font-semibold text-slate-700">{statusCount.unanswered}</div>
                <div className="text-slate-600">Remaining</div>
              </div>
            </div>
          </div>

          {/* Question Grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-5 gap-2">
              {questions.map((_, index) => {
                const questionNumber = index + 1;
                const status = getQuestionStatus(questionNumber);
                const isCurrent = currentQuestion === questionNumber;
                
                return (
                  <button
                    key={questionNumber}
                    onClick={() => onQuestionSelect(questionNumber)}
                    className={`relative w-12 h-12 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                      isCurrent 
                        ? 'ring-2 ring-blue-400 ring-offset-2' :''
                    } ${getStatusColor(status)}`}
                  >
                    {questionNumber}
                    
                    {/* Status Indicators */}
                    {status === 'answered-marked' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border border-white">
                        <Icon name="Flag" size={8} className="text-white" />
                      </div>
                    )}
                    {status === 'marked' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border border-white">
                        <Icon name="Flag" size={8} className="text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded border"></div>
                <span className="text-slate-600">Answered</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded border"></div>
                <span className="text-slate-600">Marked for Review</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded border"></div>
                <span className="text-slate-600">Answered & Marked</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-white rounded border border-slate-300"></div>
                <span className="text-slate-600">Not Answered</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionNavigator;