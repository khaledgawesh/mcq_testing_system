import React, { useContext, createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';


// Navigation Context
const NavigationContext = createContext();

export const NavigationProvider = ({ children, userRole = 'student', isAuthenticated = false }) => {
  const [currentRole, setCurrentRole] = useState(userRole);
  const [authStatus, setAuthStatus] = useState(isAuthenticated);
  const location = useLocation();

  useEffect(() => {
    // Update role based on route or external state changes
    setCurrentRole(userRole);
    setAuthStatus(isAuthenticated);
  }, [userRole, isAuthenticated]);

  const value = {
    currentRole,
    authStatus,
    setCurrentRole,
    setAuthStatus,
    currentPath: location.pathname,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

// Role-based navigation configuration
const navigationConfig = {
  teacher: {
    primary: [
      {
        label: 'Dashboard',
        path: '/teacher-dashboard',
        icon: 'LayoutDashboard',
        description: 'Overview and analytics',
        tooltip: 'View your teaching dashboard and student progress'
      },
      {
        label: 'Create Test',
        path: '/test-creation',
        icon: 'Plus',
        description: 'Build new assessments',
        tooltip: 'Create and manage your test questions'
      }
    ],
    secondary: [
      {
        label: 'Test Library',
        path: '/test-library',
        icon: 'Library',
        description: 'Manage all tests'
      },
      {
        label: 'Student Reports',
        path: '/reports',
        icon: 'BarChart3',
        description: 'Performance analytics'
      }
    ]
  },
  student: {
    primary: [
      {
        label: 'Dashboard',
        path: '/student-dashboard',
        icon: 'LayoutDashboard',
        description: 'Your learning overview',
        tooltip: 'View your progress and upcoming tests'
      },
      {
        label: 'Available Tests',
        path: '/test-taking-interface',
        icon: 'FileText',
        description: 'Take assessments',
        tooltip: 'Access your assigned tests and practice materials'
      }
    ],
    secondary: [
      {
        label: 'Results',
        path: '/results',
        icon: 'TrendingUp',
        description: 'View your scores'
      },
      {
        label: 'Practice',
        path: '/practice',
        icon: 'Target',
        description: 'Practice questions'
      }
    ]
  },
  guest: {
    primary: [
      {
        label: 'Login',
        path: '/login',
        icon: 'LogIn',
        description: 'Sign in to your account'
      },
      {
        label: 'Register',
        path: '/register',
        icon: 'UserPlus',
        description: 'Create new account'
      }
    ]
  }
};

// Hook for getting role-based navigation items
export const useRoleNavigation = () => {
  const { currentRole, authStatus, currentPath } = useNavigation();
  
  const getNavigationItems = (section = 'primary') => {
    if (!authStatus) {
      return navigationConfig.guest.primary || [];
    }
    
    const roleConfig = navigationConfig[currentRole];
    if (!roleConfig) {
      return [];
    }
    
    return roleConfig[section] || [];
  };

  const isActivePath = (path) => currentPath === path;
  
  const getActiveItem = () => {
    const allItems = [
      ...getNavigationItems('primary'),
      ...getNavigationItems('secondary')
    ];
    return allItems.find(item => isActivePath(item.path));
  };

  return {
    primaryItems: getNavigationItems('primary'),
    secondaryItems: getNavigationItems('secondary'),
    isActivePath,
    activeItem: getActiveItem(),
    currentRole,
    authStatus
  };
};

// Component for rendering role-based navigation
const RoleBasedNavigation = ({ 
  className = '', 
  variant = 'horizontal',
  showSecondary = false,
  onItemClick 
}) => {
  const { primaryItems, secondaryItems, isActivePath } = useRoleNavigation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleItemClick = (item, event) => {
    if (onItemClick) {
      onItemClick(item, event);
    }
  };

  const renderNavigationItem = (item, index) => (
    <div
      key={item.path}
      className="relative"
      onMouseEnter={() => setHoveredItem(item.path)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <button
        onClick={(e) => handleItemClick(item, e)}
        className={`nav-item micro-interaction ${
          isActivePath(item.path) ? 'nav-item-active' : 'nav-item-inactive'
        } ${variant === 'vertical' ? 'w-full justify-start' : ''}`}
        title={item.tooltip}
      >
        {item.icon && (
          <Icon name={item.icon} size={18} className={variant === 'vertical' ? 'mr-3' : 'mr-2'} />
        )}
        <span>{item.label}</span>
        {variant === 'vertical' && item.description && (
          <span className="ml-auto text-xs text-text-muted">{item.description}</span>
        )}
      </button>

      {/* Contextual Tooltip */}
      {hoveredItem === item.path && item.tooltip && variant === 'horizontal' && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-text-primary text-white text-xs rounded whitespace-nowrap z-1010 gentle-animation">
          {item.tooltip}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-text-primary"></div>
        </div>
      )}
    </div>
  );

  return (
    <nav className={`${className}`}>
      <div className={`flex ${variant === 'vertical' ? 'flex-col space-y-1' : 'items-center space-x-1'}`}>
        {primaryItems.map(renderNavigationItem)}
        
        {showSecondary && secondaryItems.length > 0 && (
          <>
            {variant === 'vertical' && (
              <div className="border-t border-border my-2"></div>
            )}
            {secondaryItems.map(renderNavigationItem)}
          </>
        )}
      </div>
    </nav>
  );
};

export default RoleBasedNavigation;