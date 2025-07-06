import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities = [] }) => {
  const getActivityIcon = (type) => {
    const iconMap = {
      test_created: 'Plus',
      test_completed: 'CheckCircle',
      test_submitted: 'Send',
      student_enrolled: 'UserPlus',
      grade_updated: 'Edit',
      comment_added: 'MessageCircle'
    };
    return iconMap[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      test_created: 'text-primary',
      test_completed: 'text-success',
      test_submitted: 'text-warning',
      student_enrolled: 'text-accent',
      grade_updated: 'text-secondary',
      comment_added: 'text-text-primary'
    };
    return colorMap[type] || 'text-text-muted';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
        <Icon name="Activity" size={20} className="text-text-muted" />
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Inbox" size={48} className="text-text-muted mx-auto mb-3" />
            <p className="text-text-muted">No recent activity</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary-50 transition-colors">
              <div className={`p-2 rounded-full bg-secondary-50 ${getActivityColor(activity.type)}`}>
                <Icon name={getActivityIcon(activity.type)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary">
                  <span className="font-medium">{activity.user}</span>
                  {' '}
                  <span className="text-text-secondary">{activity.action}</span>
                  {activity.target && (
                    <span className="font-medium text-text-primary"> {activity.target}</span>
                  )}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-text-muted">{formatTimeAgo(activity.timestamp)}</span>
                  {activity.score && (
                    <>
                      <span className="text-xs text-text-muted">•</span>
                      <span className="text-xs font-medium text-primary">{activity.score}%</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {activities.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <button className="text-sm text-primary hover:text-primary-700 font-medium transition-colors">
            View All Activity
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;