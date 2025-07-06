import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceWidget = ({ performanceData = [] }) => {
  const getPerformanceColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getPerformanceIcon = (score) => {
    if (score >= 80) return 'TrendingUp';
    if (score >= 60) return 'Minus';
    return 'TrendingDown';
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Subject Performance</h3>
        <Icon name="BarChart3" size={20} className="text-text-muted" />
      </div>
      
      <div className="space-y-4">
        {performanceData.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="PieChart" size={48} className="text-text-muted mx-auto mb-3" />
            <p className="text-text-muted">No performance data available</p>
          </div>
        ) : (
          performanceData.map((subject) => (
            <div key={subject.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-text-primary">{subject.name}</span>
                  <Icon 
                    name={getPerformanceIcon(subject.averageScore)} 
                    size={14} 
                    className={getPerformanceColor(subject.averageScore)} 
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${getPerformanceColor(subject.averageScore)}`}>
                    {subject.averageScore}%
                  </span>
                  <span className="text-xs text-text-muted">({subject.testCount} tests)</span>
                </div>
              </div>
              
              <div className="w-full h-2 bg-secondary-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    subject.averageScore >= 80 ? 'bg-success' : 
                    subject.averageScore >= 60 ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${subject.averageScore}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span>{subject.studentCount} students</span>
                <span>
                  {subject.trend > 0 ? '+' : ''}{subject.trend}% from last month
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      
      {performanceData.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <button className="text-sm text-primary hover:text-primary-700 font-medium transition-colors">
            View Detailed Analytics
          </button>
        </div>
      )}
    </div>
  );
};

export default PerformanceWidget;