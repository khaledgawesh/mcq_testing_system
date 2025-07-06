import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationBanner = ({ notifications = [] }) => {
  const [dismissedNotifications, setDismissedNotifications] = useState(new Set());

  const handleDismiss = (notificationId) => {
    setDismissedNotifications(prev => new Set([...prev, notificationId]));
  };

  const visibleNotifications = notifications.filter(
    notification => !dismissedNotifications.has(notification.id)
  );

  if (visibleNotifications.length === 0) return null;

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'urgent':
        return 'bg-error-50 border-error text-error';
      case 'warning':
        return 'bg-warning-50 border-warning text-warning';
      case 'info':
        return 'bg-primary-50 border-primary text-primary';
      case 'success':
        return 'bg-success-50 border-success text-success';
      default:
        return 'bg-secondary-50 border-secondary text-text-secondary';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'urgent':
        return 'AlertTriangle';
      case 'warning':
        return 'AlertCircle';
      case 'info':
        return 'Info';
      case 'success':
        return 'CheckCircle';
      default:
        return 'Bell';
    }
  };

  return (
    <div className="space-y-3">
      {visibleNotifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-start space-x-3 p-4 rounded-lg border-l-4 ${getNotificationStyle(notification.type)} gentle-animation`}
        >
          <Icon 
            name={getNotificationIcon(notification.type)} 
            size={20} 
            className="flex-shrink-0 mt-0.5"
          />
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-text-primary">{notification.title}</h4>
                <p className="text-sm text-text-secondary mt-1">{notification.message}</p>
                {notification.action && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={notification.action.onClick}
                    className="mt-2 p-0 h-auto text-sm"
                  >
                    {notification.action.label}
                  </Button>
                )}
              </div>
              
              <button
                onClick={() => handleDismiss(notification.id)}
                className="flex-shrink-0 p-1 rounded-md hover:bg-black hover:bg-opacity-10 transition-colors duration-150"
              >
                <Icon name="X" size={16} className="text-text-secondary" />
              </button>
            </div>
            
            {notification.timestamp && (
              <p className="text-xs text-text-muted mt-2">
                {new Date(notification.timestamp).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationBanner;