import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingDeadlines = ({ deadlines = [] }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
    
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    return { formattedDate, diffInDays };
  };

  const getUrgencyColor = (daysLeft) => {
    if (daysLeft <= 1) return 'text-error';
    if (daysLeft <= 3) return 'text-warning';
    return 'text-text-primary';
  };

  const getUrgencyBg = (daysLeft) => {
    if (daysLeft <= 1) return 'bg-error-50 border-error-100';
    if (daysLeft <= 3) return 'bg-warning-50 border-warning-100';
    return 'bg-surface border-border';
  };

  const sortedDeadlines = deadlines.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <div className="bg-surface rounded-lg border border-border p-4 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Upcoming Deadlines</h3>
        <Icon name="Calendar" size={20} className="text-text-muted" />
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {sortedDeadlines.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CalendarCheck" size={48} className="text-text-muted mx-auto mb-3" />
            <p className="text-text-muted">No upcoming deadlines</p>
          </div>
        ) : (
          sortedDeadlines.map((deadline) => {
            const { formattedDate, diffInDays } = formatDate(deadline.dueDate);
            
            return (
              <div 
                key={deadline.id} 
                className={`p-3 rounded-lg border ${getUrgencyBg(diffInDays)} transition-colors`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-text-primary mb-1">
                      {deadline.testTitle}
                    </h4>
                    <p className="text-xs text-text-secondary mb-2">
                      {deadline.subject} • {deadline.studentCount} students
                    </p>
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={14} className={getUrgencyColor(diffInDays)} />
                      <span className={`text-xs font-medium ${getUrgencyColor(diffInDays)}`}>
                        {diffInDays <= 0 ? 'Due today' : 
                         diffInDays === 1 ? 'Due tomorrow' : 
                         `Due in ${diffInDays} days`}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted mt-1">{formattedDate}</p>
                  </div>
                  
                  <div className="flex items-center space-x-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {/* Handle view test */}}
                      iconName="Eye"
                      iconSize={14}
                      className="text-text-muted hover:text-text-primary"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {/* Handle edit test */}}
                      iconName="Edit"
                      iconSize={14}
                      className="text-text-muted hover:text-text-primary"
                    />
                  </div>
                </div>
                
                {deadline.completionRate !== undefined && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex items-center justify-between text-xs text-text-muted mb-1">
                      <span>Completion Rate</span>
                      <span>{deadline.completionRate}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-secondary-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${deadline.completionRate}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      
      {sortedDeadlines.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <button className="text-sm text-primary hover:text-primary-700 font-medium transition-colors">
            View All Deadlines
          </button>
        </div>
      )}
    </div>
  );
};

export default UpcomingDeadlines;