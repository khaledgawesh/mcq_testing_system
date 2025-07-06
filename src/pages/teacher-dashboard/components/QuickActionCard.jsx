import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = ({ title, description, icon, buttonText, onClick, variant = 'primary', disabled = false }) => {
  return (
    <div className="bg-surface rounded-lg border border-border p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200 micro-interaction">
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-lg ${variant === 'primary' ? 'bg-primary-50' : variant === 'success' ? 'bg-success-50' : 'bg-secondary-50'}`}>
          <Icon 
            name={icon} 
            size={24} 
            className={variant === 'primary' ? 'text-primary' : variant === 'success' ? 'text-success' : 'text-secondary'} 
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
          <p className="text-text-secondary mb-4">{description}</p>
          <Button
            variant={variant}
            onClick={onClick}
            disabled={disabled}
            iconName="ArrowRight"
            iconPosition="right"
            className="w-full sm:w-auto"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionCard;