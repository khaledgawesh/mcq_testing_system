import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActions = ({ onAction }) => {
  const quickActions = [
    {
      id: 'practice',
      title: 'Practice Mode',
      description: 'Take practice tests to improve your skills',
      icon: 'Target',
      color: 'bg-accent-50 text-accent',
      action: () => onAction?.('practice')
    },
    {
      id: 'bookmarks',
      title: 'Bookmarked Tests',
      description: 'View your saved tests for later',
      icon: 'Bookmark',
      color: 'bg-primary-50 text-primary',
      action: () => onAction?.('bookmarks')
    },
    {
      id: 'results',
      title: 'All Results',
      description: 'View detailed performance analytics',
      icon: 'BarChart3',
      color: 'bg-success-50 text-success',
      action: () => onAction?.('results')
    },
    {
      id: 'schedule',
      title: 'Study Schedule',
      description: 'Plan your test preparation',
      icon: 'Calendar',
      color: 'bg-warning-50 text-warning',
      action: () => onAction?.('schedule')
    }
  ];

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold text-text-primary mb-4">Quick Actions</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className="flex items-center space-x-4 p-4 rounded-lg border border-border hover:border-primary hover:shadow-elevation-1 transition-all duration-200 text-left micro-interaction"
          >
            <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${action.color}`}>
              <Icon name={action.icon} size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-text-primary">{action.title}</h3>
              <p className="text-sm text-text-secondary">{action.description}</p>
            </div>
            <Icon name="ChevronRight" size={16} className="text-text-secondary" />
          </button>
        ))}
      </div>

      {/* Study Tips */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Lightbulb" size={18} className="text-warning" />
          <h3 className="font-medium text-text-primary">Study Tip</h3>
        </div>
        <p className="text-sm text-text-secondary">
          Take practice tests regularly to identify your weak areas and improve your performance. 
          Review incorrect answers to understand the concepts better.
        </p>
      </div>
    </div>
  );
};

export default QuickActions;