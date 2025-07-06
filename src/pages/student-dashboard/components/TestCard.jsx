import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestCard = ({ 
  test, 
  type = 'available', 
  onStartTest, 
  onReviewTest,
  onBookmarkTest 
}) => {
  const {
    id,
    title,
    subject,
    questionCount,
    timeLimit,
    dueDate,
    difficulty,
    estimatedTime,
    isNew,
    isUrgent,
    score,
    completedDate,
    isBookmarked
  } = test;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'easy': return 'text-success bg-success-50';
      case 'medium': return 'text-warning bg-warning-50';
      case 'hard': return 'text-error bg-error-50';
      default: return 'text-text-secondary bg-secondary-50';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const isOverdue = type === 'available' && dueDate && new Date(dueDate) < new Date();

  return (
    <div className={`card p-6 hover:shadow-elevation-2 transition-all duration-200 micro-interaction ${
      isUrgent ? 'border-l-4 border-l-warning' : ''
    } ${isOverdue ? 'border-l-4 border-l-error' : ''}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-text-primary line-clamp-1">
              {title}
            </h3>
            {isNew && (
              <span className="px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                New
              </span>
            )}
            {isUrgent && (
              <Icon name="AlertCircle" size={16} className="text-warning" />
            )}
          </div>
          <p className="text-sm text-text-secondary mb-2">{subject}</p>
          
          {difficulty && (
            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </span>
          )}
        </div>

        {type === 'available' && (
          <button
            onClick={() => onBookmarkTest?.(id)}
            className="p-2 rounded-md hover:bg-secondary-50 transition-colors duration-150"
          >
            <Icon 
              name={isBookmarked ? "Bookmark" : "BookmarkPlus"} 
              size={16} 
              className={isBookmarked ? "text-primary" : "text-text-secondary"} 
            />
          </button>
        )}
      </div>

      {/* Test Details */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-text-secondary">
              <Icon name="FileText" size={14} />
              <span>{questionCount} questions</span>
            </div>
            <div className="flex items-center space-x-1 text-text-secondary">
              <Icon name="Clock" size={14} />
              <span>{formatTime(timeLimit)}</span>
            </div>
          </div>
          
          {estimatedTime && (
            <div className="flex items-center space-x-1 text-text-secondary">
              <Icon name="Timer" size={14} />
              <span>~{formatTime(estimatedTime)}</span>
            </div>
          )}
        </div>

        {type === 'available' && dueDate && (
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={14} className={isOverdue ? "text-error" : "text-text-secondary"} />
            <span className={`text-sm ${isOverdue ? "text-error font-medium" : "text-text-secondary"}`}>
              Due: {formatDate(dueDate)}
              {isOverdue && " (Overdue)"}
            </span>
          </div>
        )}

        {type === 'completed' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Score:</span>
              <span className={`text-lg font-semibold ${getScoreColor(score)}`}>
                {score}%
              </span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-text-secondary">
              <Icon name="Calendar" size={14} />
              <span>Completed: {formatDate(completedDate)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex space-x-3">
        {type === 'available' ? (
          <Button
            variant="primary"
            onClick={() => onStartTest?.(id)}
            iconName="Play"
            iconSize={16}
            fullWidth
            className={isOverdue ? "bg-error hover:bg-error/90" : ""}
          >
            {isOverdue ? "Start Now" : "Start Test"}
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              onClick={() => onReviewTest?.(id)}
              iconName="Eye"
              iconSize={16}
              fullWidth
            >
              Review Answers
            </Button>
            <Button
              variant="ghost"
              onClick={() => {/* Handle retake */}}
              iconName="RotateCcw"
              iconSize={16}
              className="flex-shrink-0"
            >
              Retake
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default TestCard;