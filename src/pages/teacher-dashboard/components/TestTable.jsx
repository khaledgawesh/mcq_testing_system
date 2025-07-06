import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestTable = ({ tests, onEdit, onDuplicate, onPreview, onAnalytics, onDelete }) => {
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedTests = [...tests].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (sortField === 'createdAt') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'text-success', bg: 'bg-success-50', text: 'Active' },
      draft: { color: 'text-warning', bg: 'bg-warning-50', text: 'Draft' },
      archived: { color: 'text-text-muted', bg: 'bg-secondary-50', text: 'Archived' }
    };
    
    const config = statusConfig[status] || statusConfig.draft;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-elevation-1 overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50 border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('title')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-colors"
                >
                  <span>Test Title</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('subject')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-colors"
                >
                  <span>Subject</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('createdAt')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-colors"
                >
                  <span>Created</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-text-primary">Students</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-text-primary">Avg Score</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-text-primary">Status</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-text-primary">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedTests.map((test) => (
              <tr key={test.id} className="hover:bg-secondary-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{test.title}</p>
                    <p className="text-xs text-text-muted">{test.questionCount} questions</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary">
                    {test.subject}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">
                  {formatDate(test.createdAt)}
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">
                  {test.studentCount}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-text-primary">{test.averageScore}%</span>
                    <div className="w-16 h-2 bg-secondary-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${test.averageScore}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(test.status)}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onPreview(test)}
                      iconName="Eye"
                      iconSize={16}
                      className="text-text-muted hover:text-text-primary"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onAnalytics(test)}
                      iconName="BarChart3"
                      iconSize={16}
                      className="text-text-muted hover:text-text-primary"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(test)}
                      iconName="Edit"
                      iconSize={16}
                      className="text-text-muted hover:text-text-primary"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDuplicate(test)}
                      iconName="Copy"
                      iconSize={16}
                      className="text-text-muted hover:text-text-primary"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-border">
        {sortedTests.map((test) => (
          <div key={test.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-text-primary mb-1">{test.title}</h3>
                <div className="flex items-center space-x-2 text-xs text-text-muted">
                  <span>{test.subject}</span>
                  <span>•</span>
                  <span>{test.questionCount} questions</span>
                </div>
              </div>
              {getStatusBadge(test.status)}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
              <div>
                <p className="text-text-muted">Created</p>
                <p className="text-text-primary">{formatDate(test.createdAt)}</p>
              </div>
              <div>
                <p className="text-text-muted">Students</p>
                <p className="text-text-primary">{test.studentCount}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-text-primary">{test.averageScore}%</span>
                <div className="w-16 h-2 bg-secondary-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${test.averageScore}%` }}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onPreview(test)}
                  iconName="Eye"
                  iconSize={16}
                  className="text-text-muted hover:text-text-primary"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAnalytics(test)}
                  iconName="BarChart3"
                  iconSize={16}
                  className="text-text-muted hover:text-text-primary"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(test)}
                  iconName="Edit"
                  iconSize={16}
                  className="text-text-muted hover:text-text-primary"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestTable;