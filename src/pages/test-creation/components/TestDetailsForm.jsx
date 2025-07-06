import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TestDetailsForm = ({ testDetails, onUpdate, onNext }) => {
  const [formData, setFormData] = useState({
    title: testDetails.title || '',
    description: testDetails.description || '',
    subject: testDetails.subject || '',
    timeLimit: testDetails.timeLimit || 60,
    instructions: testDetails.instructions || '',
    difficulty: testDetails.difficulty || 'medium',
    category: testDetails.category || '',
    passingScore: testDetails.passingScore || 70,
    ...testDetails
  });

  const [errors, setErrors] = useState({});

  const subjects = [
    "Mathematics", "Science", "English", "History", "Geography", 
    "Physics", "Chemistry", "Biology", "Computer Science", "Economics"
  ];

  const difficulties = [
    { value: 'easy', label: 'Easy', color: 'text-success' },
    { value: 'medium', label: 'Medium', color: 'text-warning' },
    { value: 'hard', label: 'Hard', color: 'text-error' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    onUpdate({ ...formData, [field]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Test title is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.timeLimit < 5) newErrors.timeLimit = 'Time limit must be at least 5 minutes';
    if (formData.passingScore < 0 || formData.passingScore > 100) {
      newErrors.passingScore = 'Passing score must be between 0-100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
          <Icon name="FileText" size={16} color="white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Test Details</h2>
          <p className="text-sm text-text-secondary">Configure basic test information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Test Title *
            </label>
            <Input
              type="text"
              placeholder="Enter test title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={errors.title ? 'border-error' : ''}
            />
            {errors.title && (
              <p className="text-sm text-error mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Subject *
            </label>
            <select
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary ${
                errors.subject ? 'border-error' : 'border-border'
              }`}
            >
              <option value="">Select a subject</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
            {errors.subject && (
              <p className="text-sm text-error mt-1">{errors.subject}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Category
            </label>
            <Input
              type="text"
              placeholder="e.g., Midterm, Final, Quiz"
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Time Limit (minutes) *
              </label>
              <Input
                type="number"
                min="5"
                max="300"
                value={formData.timeLimit}
                onChange={(e) => handleInputChange('timeLimit', parseInt(e.target.value) || 0)}
                className={errors.timeLimit ? 'border-error' : ''}
              />
              {errors.timeLimit && (
                <p className="text-sm text-error mt-1">{errors.timeLimit}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Passing Score (%)
              </label>
              <Input
                type="number"
                min="0"
                max="100"
                value={formData.passingScore}
                onChange={(e) => handleInputChange('passingScore', parseInt(e.target.value) || 0)}
                className={errors.passingScore ? 'border-error' : ''}
              />
              {errors.passingScore && (
                <p className="text-sm text-error mt-1">{errors.passingScore}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Difficulty Level
            </label>
            <div className="flex space-x-3">
              {difficulties.map(diff => (
                <button
                  key={diff.value}
                  onClick={() => handleInputChange('difficulty', diff.value)}
                  className={`px-4 py-2 rounded-md border transition-colors duration-150 ${
                    formData.difficulty === diff.value
                      ? 'bg-primary text-white border-primary' :'bg-background text-text-secondary border-border hover:border-primary'
                  }`}
                >
                  <span className={formData.difficulty === diff.value ? 'text-white' : diff.color}>
                    {diff.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Description *
            </label>
            <textarea
              rows={4}
              placeholder="Describe what this test covers..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary resize-none ${
                errors.description ? 'border-error' : 'border-border'
              }`}
            />
            {errors.description && (
              <p className="text-sm text-error mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Instructions for Students
            </label>
            <textarea
              rows={6}
              placeholder="Enter instructions for students taking this test..."
              value={formData.instructions}
              onChange={(e) => handleInputChange('instructions', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary resize-none"
            />
            <p className="text-xs text-text-secondary mt-1">
              These instructions will be shown to students before they start the test
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Info" size={16} />
          <span>All fields marked with * are required</span>
        </div>
        
        <Button
          variant="primary"
          onClick={handleNext}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Questions
        </Button>
      </div>
    </div>
  );
};

export default TestDetailsForm;