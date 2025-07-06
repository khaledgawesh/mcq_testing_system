import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import TestCard from './components/TestCard';
import ProgressOverview from './components/ProgressOverview';
import SearchAndFilter from './components/SearchAndFilter';
import QuickActions from './components/QuickActions';
import NotificationBanner from './components/NotificationBanner';
import Icon from '../../components/AppIcon';


const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('available');
  const [filteredTests, setFilteredTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [bookmarkedTests, setBookmarkedTests] = useState(new Set(['test-1', 'test-3']));

  // Mock data for available tests
  const availableTests = [
    {
      id: 'test-1',
      title: 'Mathematics Fundamentals',
      subject: 'Mathematics',
      questionCount: 25,
      timeLimit: 60,
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      difficulty: 'Medium',
      estimatedTime: 45,
      isNew: true,
      isUrgent: false,
      isBookmarked: true
    },
    {
      id: 'test-2',
      title: 'Physics - Motion and Forces',
      subject: 'Physics',
      questionCount: 30,
      timeLimit: 90,
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      difficulty: 'Hard',
      estimatedTime: 75,
      isNew: false,
      isUrgent: true,
      isBookmarked: false
    },
    {
      id: 'test-3',
      title: 'English Grammar Basics',
      subject: 'English',
      questionCount: 20,
      timeLimit: 45,
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      difficulty: 'Easy',
      estimatedTime: 30,
      isNew: false,
      isUrgent: false,
      isBookmarked: true
    },
    {
      id: 'test-4',
      title: 'Chemistry - Periodic Table',
      subject: 'Chemistry',
      questionCount: 35,
      timeLimit: 75,
      dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
      difficulty: 'Medium',
      estimatedTime: 60,
      isNew: false,
      isUrgent: false,
      isBookmarked: false
    }
  ];

  // Mock data for completed tests
  const completedTests = [
    {
      id: 'completed-1',
      title: 'Biology - Cell Structure',
      subject: 'Biology',
      questionCount: 25,
      timeLimit: 60,
      score: 85,
      completedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      difficulty: 'Medium'
    },
    {
      id: 'completed-2',
      title: 'History - World War II',
      subject: 'History',
      questionCount: 30,
      timeLimit: 90,
      score: 72,
      completedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      difficulty: 'Hard'
    },
    {
      id: 'completed-3',
      title: 'Geography - Climate Zones',
      subject: 'Geography',
      questionCount: 20,
      timeLimit: 45,
      score: 91,
      completedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      difficulty: 'Easy'
    }
  ];

  // Mock progress data
  const progressData = {
    totalTests: 15,
    completedTests: 8,
    averageScore: 78,
    streak: 5,
    subjectPerformance: [
      { subject: 'Math', score: 85 },
      { subject: 'Physics', score: 72 },
      { subject: 'Chemistry', score: 79 },
      { subject: 'Biology', score: 88 },
      { subject: 'English', score: 82 }
    ],
    recentScores: [
      { title: 'Biology - Cell Structure', subject: 'Biology', score: 85, date: '3 days ago' },
      { title: 'History - World War II', subject: 'History', score: 72, date: '1 week ago' },
      { title: 'Geography - Climate Zones', subject: 'Geography', score: 91, date: '1 week ago' }
    ],
    achievements: ['Perfect Score', 'Week Streak', 'Subject Master']
  };

  // Mock notifications
  const notifications = [
    {
      id: 'notif-1',
      type: 'urgent',
      title: 'Test Due Soon',
      message: 'Physics - Motion and Forces is due tomorrow. Don\'t forget to complete it!',
      timestamp: new Date(),
      action: {
        label: 'Start Test',
        onClick: () => navigate('/test-taking-interface')
      }
    },
    {
      id: 'notif-2',
      type: 'info',
      title: 'New Test Available',
      message: 'Mathematics Fundamentals has been assigned to you.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
  ];

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography'];

  useEffect(() => {
    filterTests();
  }, [activeTab, searchTerm, activeFilters]);

  const filterTests = () => {
    const testsToFilter = activeTab === 'available' ? availableTests : completedTests;
    
    let filtered = testsToFilter.filter(test => {
      const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           test.subject.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSubject = !activeFilters.subject || test.subject === activeFilters.subject;
      const matchesDifficulty = !activeFilters.difficulty || test.difficulty === activeFilters.difficulty;
      
      let matchesDateRange = true;
      if (activeFilters.dateRange && activeTab === 'available') {
        const now = new Date();
        const testDate = new Date(test.dueDate);
        
        switch (activeFilters.dateRange) {
          case 'today':
            matchesDateRange = testDate.toDateString() === now.toDateString();
            break;
          case 'week':
            const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            matchesDateRange = testDate <= weekFromNow;
            break;
          case 'month':
            const monthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
            matchesDateRange = testDate <= monthFromNow;
            break;
          case 'overdue':
            matchesDateRange = testDate < now;
            break;
        }
      }
      
      return matchesSearch && matchesSubject && matchesDifficulty && matchesDateRange;
    });

    // Add bookmark status to available tests
    if (activeTab === 'available') {
      filtered = filtered.map(test => ({
        ...test,
        isBookmarked: bookmarkedTests.has(test.id)
      }));
    }

    setFilteredTests(filtered);
  };

  const handleStartTest = (testId) => {
    navigate('/test-taking-interface', { state: { testId } });
  };

  const handleReviewTest = (testId) => {
    navigate('/test-taking-interface', { state: { testId, mode: 'review' } });
  };

  const handleBookmarkTest = (testId) => {
    setBookmarkedTests(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(testId)) {
        newBookmarks.delete(testId);
      } else {
        newBookmarks.add(testId);
      }
      return newBookmarks;
    });
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'practice': navigate('/test-taking-interface', { state: { mode: 'practice' } });
        break;
      case 'bookmarks':
        setActiveFilters({ bookmarked: true });
        break;
      case 'results':
        // Navigate to detailed results page
        break;
      case 'schedule':
        // Navigate to study schedule
        break;
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const getTabCount = (tab) => {
    return tab === 'available' ? availableTests.length : completedTests.length;
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        userRole="student" 
        userName="John Smith" 
        onLogout={handleLogout}
      />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary">Welcome back, John!</h1>
                <p className="text-text-secondary mt-1">
                  You have {availableTests.length} tests available and {completedTests.length} completed.
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-text-secondary">Current Streak</p>
                  <div className="flex items-center space-x-1">
                    <Icon name="Flame" size={16} className="text-warning" />
                    <span className="text-lg font-semibold text-text-primary">
                      {progressData.streak} days
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="mb-8">
            <NotificationBanner notifications={notifications} />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Tests */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search and Filter */}
              <SearchAndFilter
                onSearch={setSearchTerm}
                onFilter={setActiveFilters}
                subjects={subjects}
                activeFilters={activeFilters}
              />

              {/* Tab Navigation */}
              <div className="flex space-x-1 bg-secondary-50 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('available')}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                    activeTab === 'available' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name="FileText" size={16} />
                  <span>Available Tests</span>
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                    {getTabCount('available')}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                    activeTab === 'completed'
                      ? 'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name="CheckCircle" size={16} />
                  <span>Completed Tests</span>
                  <span className="bg-success text-success-foreground text-xs px-2 py-0.5 rounded-full">
                    {getTabCount('completed')}
                  </span>
                </button>
              </div>

              {/* Test Cards */}
              <div className="space-y-4">
                {filteredTests.length > 0 ? (
                  filteredTests.map((test) => (
                    <TestCard
                      key={test.id}
                      test={test}
                      type={activeTab}
                      onStartTest={handleStartTest}
                      onReviewTest={handleReviewTest}
                      onBookmarkTest={handleBookmarkTest}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Icon name="FileX" size={48} className="text-text-secondary mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-text-primary mb-2">
                      No tests found
                    </h3>
                    <p className="text-text-secondary">
                      {searchTerm || Object.keys(activeFilters).length > 0
                        ? 'Try adjusting your search or filters'
                        : `No ${activeTab} tests available at the moment`}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Progress & Actions */}
            <div className="space-y-6">
              <ProgressOverview progressData={progressData} />
              <QuickActions onAction={handleQuickAction} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;