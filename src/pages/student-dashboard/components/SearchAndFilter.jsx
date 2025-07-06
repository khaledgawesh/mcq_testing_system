import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchAndFilter = ({ 
  onSearch, 
  onFilter, 
  subjects = [], 
  difficulties = ['Easy', 'Medium', 'Hard'],
  activeFilters = {}
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(activeFilters.subject || '');
  const [selectedDifficulty, setSelectedDifficulty] = useState(activeFilters.difficulty || '');
  const [selectedDateRange, setSelectedDateRange] = useState(activeFilters.dateRange || '');

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleFilterApply = () => {
    const filters = {
      subject: selectedSubject,
      difficulty: selectedDifficulty,
      dateRange: selectedDateRange
    };
    onFilter?.(filters);
    setShowFilters(false);
  };

  const handleFilterClear = () => {
    setSelectedSubject('');
    setSelectedDifficulty('');
    setSelectedDateRange('');
    onFilter?.({});
  };

  const getActiveFilterCount = () => {
    return [selectedSubject, selectedDifficulty, selectedDateRange].filter(Boolean).length;
  };

  const dateRangeOptions = [
    { value: 'today', label: 'Due Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'overdue', label: 'Overdue' }
  ];

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon name="Search" size={16} className="text-text-secondary" />
        </div>
        <Input
          type="search"
          placeholder="Search tests by title or subject..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-4"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          iconName="Filter"
          iconSize={16}
          className="relative"
        >
          Filters
          {getActiveFilterCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {getActiveFilterCount()}
            </span>
          )}
        </Button>

        {getActiveFilterCount() > 0 && (
          <Button
            variant="ghost"
            onClick={handleFilterClear}
            iconName="X"
            iconSize={14}
            className="text-text-secondary hover:text-text-primary"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="card p-4 space-y-4 gentle-animation">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Subject Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">All Levels</option>
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Due Date
              </label>
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">All Dates</option>
                {dateRangeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={() => setShowFilters(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleFilterApply}
              iconName="Check"
              iconSize={16}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {getActiveFilterCount() > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSubject && (
            <div className="flex items-center space-x-1 bg-primary-50 text-primary px-3 py-1 rounded-full text-sm">
              <span>Subject: {selectedSubject}</span>
              <button
                onClick={() => setSelectedSubject('')}
                className="hover:bg-primary-100 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          {selectedDifficulty && (
            <div className="flex items-center space-x-1 bg-accent-50 text-accent px-3 py-1 rounded-full text-sm">
              <span>Difficulty: {selectedDifficulty}</span>
              <button
                onClick={() => setSelectedDifficulty('')}
                className="hover:bg-accent-100 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          {selectedDateRange && (
            <div className="flex items-center space-x-1 bg-warning-50 text-warning px-3 py-1 rounded-full text-sm">
              <span>Due: {dateRangeOptions.find(opt => opt.value === selectedDateRange)?.label}</span>
              <button
                onClick={() => setSelectedDateRange('')}
                className="hover:bg-warning-100 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;