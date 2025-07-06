import React from 'react';
import Button from '../../../components/ui/Button';

const NavigationControls = ({ 
  currentQuestion,
  totalQuestions,
  onPrevious,
  onNext,
  onSubmit,
  hasAnswer,
  isMarkedForReview 
}) => {
  const isFirstQuestion = currentQuestion === 1;
  const isLastQuestion = currentQuestion === totalQuestions;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-40">
      <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="md"
          onClick={onPrevious}
          disabled={isFirstQuestion}
          iconName="ChevronLeft"
          iconSize={18}
          className="min-w-[100px]"
        >
          Previous
        </Button>

        {/* Status Indicator */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {hasAnswer && (
              <div className="flex items-center space-x-1 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs font-medium">Answered</span>
              </div>
            )}
            {isMarkedForReview && (
              <div className="flex items-center space-x-1 text-yellow-600">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-xs font-medium">Marked</span>
              </div>
            )}
            {!hasAnswer && !isMarkedForReview && (
              <div className="flex items-center space-x-1 text-slate-400">
                <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                <span className="text-xs font-medium">Not Answered</span>
              </div>
            )}
          </div>
        </div>

        {/* Next/Submit Button */}
        {isLastQuestion ? (
          <Button
            variant="primary"
            size="md"
            onClick={onSubmit}
            iconName="Send"
            iconSize={18}
            className="min-w-[100px]"
          >
            Submit Test
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            onClick={onNext}
            iconName="ChevronRight"
            iconPosition="right"
            iconSize={18}
            className="min-w-[100px]"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavigationControls;