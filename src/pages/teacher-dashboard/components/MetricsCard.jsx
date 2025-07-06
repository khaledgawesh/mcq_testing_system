import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, subtitle, icon, trend, trendValue, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary border-primary-100',
    success: 'bg-success-50 text-success border-success-100',
    warning: 'bg-warning-50 text-warning border-warning-100',
    error: 'bg-error-50 text-error border-error-100'
  };

  const iconColorClasses = {
    primary: 'text-primary',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error'
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
          <p className="text-2xl font-semibold text-text-primary mb-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-text-muted">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon name={icon} size={24} className={iconColorClasses[color]} />
        </div>
      </div>
      
      {trend && (
        <div className="flex items-center mt-4 pt-4 border-t border-border">
          <Icon 
            name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} 
            size={16} 
            className={trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-text-muted'} 
          />
          <span className={`text-sm ml-1 ${trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-text-muted'}`}>
            {trendValue}
          </span>
          <span className="text-sm text-text-muted ml-1">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default MetricsCard;