import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AutoSaveIndicator = ({ lastSaved, isSaving }) => {
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    if (isSaving || lastSaved) {
      setShowIndicator(true);
      const timer = setTimeout(() => {
        setShowIndicator(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isSaving, lastSaved]);

  const formatLastSaved = (timestamp) => {
    if (!timestamp) return '';
    
    const now = new Date();
    const saved = new Date(timestamp);
    const diffInSeconds = Math.floor((now - saved) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else {
      return saved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  if (!showIndicator) return null;

  return (
    <div className="fixed top-20 right-4 z-50">
      <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg shadow-lg border transition-all duration-300 ${
        isSaving 
          ? 'bg-blue-50 border-blue-200 text-blue-700' :'bg-green-50 border-green-200 text-green-700'
      }`}>
        {isSaving ? (
          <>
            <div className="animate-spin">
              <Icon name="Loader2" size={16} />
            </div>
            <span className="text-sm font-medium">Saving...</span>
          </>
        ) : (
          <>
            <Icon name="Check" size={16} />
            <span className="text-sm font-medium">
              Saved {formatLastSaved(lastSaved)}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default AutoSaveIndicator;