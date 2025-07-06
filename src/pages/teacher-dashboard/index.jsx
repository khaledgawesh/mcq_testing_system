import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import MetricsCard from './components/MetricsCard';
import QuickActionCard from './components/QuickActionCard';
import TestTable from './components/TestTable';
import FilterPanel from './components/FilterPanel';
import ActivityFeed from './components/ActivityFeed';
import PerformanceWidget from './components/PerformanceWidget';
import UpcomingDeadlines from './components/UpcomingDeadlines';
import Button from '../../components/ui/Button';


const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [filteredTests, setFilteredTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilters, setCurrentFilters] = useState({});

  // Mock data for teacher dashboard
  const mockMetrics = [
    {
      title: "Total Tests Created",
      value: "24",
      subtitle: "8 active, 16 completed",
      icon: "FileText",
      color: "primary",
      trend: "up",
      trendValue: "+12%"
    },
    {
      title: "Active Assessments",
      value: "8",
      subtitle: "Currently running",
      icon: "Play",
      color: "success",
      trend: "up",
      trendValue: "+3"
    },
    {
      title: "Student Submissions",
      value: "156",
      subtitle: "This month",
      icon: "Users",
      color: "warning",
      trend: "up",
      trendValue: "+28%"
    },
    {
      title: "Average Score",
      value: "78%",
      subtitle: "Across all tests",
      icon: "TrendingUp",
      color: "primary",
      trend: "up",
      trendValue: "+5%"
    }
  ];

  const mockTests = [
    {
      id: 1,
      title: "Introduction to React Fundamentals",
      subject: "Computer Science",
      createdAt: "2024-01-15T10:30:00Z",
      questionCount: 25,
      studentCount: 32,
      averageScore: 85,
      status: "active"
    },
    {
      id: 2,
      title: "JavaScript ES6+ Features",
      subject: "Programming",
      createdAt: "2024-01-12T14:20:00Z",
      questionCount: 20,
      studentCount: 28,
      averageScore: 78,
      status: "active"
    },
    {
      id: 3,
      title: "Database Design Principles",
      subject: "Database",
      createdAt: "2024-01-10T09:15:00Z",
      questionCount: 30,
      studentCount: 24,
      averageScore: 72,
      status: "draft"
    },
    {
      id: 4,
      title: "Web Security Best Practices",
      subject: "Security",
      createdAt: "2024-01-08T16:45:00Z",
      questionCount: 18,
      studentCount: 35,
      averageScore: 88,
      status: "active"
    },
    {
      id: 5,
      title: "API Development with Node.js",
      subject: "Backend",
      createdAt: "2024-01-05T11:30:00Z",
      questionCount: 22,
      studentCount: 19,
      averageScore: 76,
      status: "archived"
    }
  ];

  const mockActivities = [
    {
      id: 1,
      type: "test_completed",
      user: "Sarah Johnson",
      action: "completed",
      target: "React Fundamentals Quiz",
      timestamp: "2024-01-15T14:30:00Z",
      score: 92
    },
    {
      id: 2,
      type: "test_submitted",
      user: "Mike Chen",
      action: "submitted",
      target: "JavaScript ES6+ Test",
      timestamp: "2024-01-15T13:45:00Z",
      score: 78
    },
    {
      id: 3,
      type: "student_enrolled",
      user: "Emma Davis",
      action: "enrolled in",
      target: "Database Design Course",
      timestamp: "2024-01-15T12:20:00Z"
    },
    {
      id: 4,
      type: "test_created",
      user: "You",
      action: "created",
      target: "Web Security Assessment",
      timestamp: "2024-01-15T10:15:00Z"
    }
  ];

  const mockPerformanceData = [
    {
      name: "Computer Science",
      averageScore: 85,
      testCount: 8,
      studentCount: 156,
      trend: 5
    },
    {
      name: "Programming",
      averageScore: 78,
      testCount: 6,
      studentCount: 124,
      trend: -2
    },
    {
      name: "Database",
      averageScore: 72,
      testCount: 4,
      studentCount: 89,
      trend: 8
    },
    {
      name: "Security",
      averageScore: 88,
      testCount: 3,
      studentCount: 67,
      trend: 12
    }
  ];

  const mockDeadlines = [
    {
      id: 1,
      testTitle: "React Fundamentals Final Exam",
      subject: "Computer Science",
      dueDate: "2024-01-16T23:59:00Z",
      studentCount: 32,
      completionRate: 78
    },
    {
      id: 2,
      testTitle: "JavaScript Advanced Concepts",
      subject: "Programming",
      dueDate: "2024-01-18T23:59:00Z",
      studentCount: 28,
      completionRate: 45
    },
    {
      id: 3,
      testTitle: "Database Optimization Quiz",
      subject: "Database",
      dueDate: "2024-01-20T23:59:00Z",
      studentCount: 24,
      completionRate: 12
    }
  ];

  const subjects = [...new Set(mockTests.map(test => test.subject))];

  useEffect(() => {
    let filtered = mockTests;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(test =>
        test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply other filters
    if (currentFilters.subject) {
      filtered = filtered.filter(test => test.subject === currentFilters.subject);
    }

    if (currentFilters.status) {
      filtered = filtered.filter(test => test.status === currentFilters.status);
    }

    if (currentFilters.dateRange) {
      const now = new Date();
      const filterDate = new Date();
      
      switch (currentFilters.dateRange) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          filterDate.setMonth(now.getMonth() - 3);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          filterDate.setFullYear(1970);
      }
      
      filtered = filtered.filter(test => new Date(test.createdAt) >= filterDate);
    }

    setFilteredTests(filtered);
  }, [searchTerm, currentFilters]);

  const handleCreateTest = () => {
    navigate('/test-creation');
  };

  const handleQuestionBank = () => {
    // Navigate to question bank management
    console.log('Navigate to question bank');
  };

  const handleBulkImport = () => {
    // Handle bulk import functionality
    console.log('Handle bulk import');
  };

  const handleTestEdit = (test) => {
    navigate(`/test-creation?edit=${test.id}`);
  };

  const handleTestDuplicate = (test) => {
    console.log('Duplicate test:', test.title);
  };

  const handleTestPreview = (test) => {
    console.log('Preview test:', test.title);
  };

  const handleTestAnalytics = (test) => {
    console.log('View analytics for:', test.title);
  };

  const handleTestDelete = (test) => {
    console.log('Delete test:', test.title);
  };

  const handleFilterChange = (filters) => {
    setCurrentFilters(filters);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        userRole="teacher" 
        userName="Dr. Sarah Wilson" 
        onLogout={handleLogout}
      />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              Welcome back, Dr. Wilson
            </h1>
            <p className="text-text-secondary">
              Here's what's happening with your tests and students today.
            </p>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {mockMetrics.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric.title}
                value={metric.value}
                subtitle={metric.subtitle}
                icon={metric.icon}
                color={metric.color}
                trend={metric.trend}
                trendValue={metric.trendValue}
              />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <QuickActionCard
              title="Create New Test"
              description="Build a new MCQ assessment with our intuitive test builder"
              icon="Plus"
              buttonText="Start Creating"
              onClick={handleCreateTest}
              variant="primary"
            />
            <QuickActionCard
              title="Question Bank"
              description="Manage and organize your reusable question library"
              icon="Database"
              buttonText="Manage Questions"
              onClick={handleQuestionBank}
              variant="success"
            />
            <QuickActionCard
              title="Bulk Import"
              description="Import questions from CSV or Excel files quickly"
              icon="Upload"
              buttonText="Import Questions"
              onClick={handleBulkImport}
              variant="secondary"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Filter Panel */}
              <FilterPanel
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                subjects={subjects}
              />

              {/* Tests Table */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-text-primary">
                    Your Tests ({filteredTests.length})
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Download"
                    iconPosition="left"
                    onClick={() => console.log('Export tests')}
                  >
                    Export
                  </Button>
                </div>
                
                <TestTable
                  tests={filteredTests}
                  onEdit={handleTestEdit}
                  onDuplicate={handleTestDuplicate}
                  onPreview={handleTestPreview}
                  onAnalytics={handleTestAnalytics}
                  onDelete={handleTestDelete}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Activity Feed */}
              <ActivityFeed activities={mockActivities} />
              
              {/* Performance Widget */}
              <PerformanceWidget performanceData={mockPerformanceData} />
              
              {/* Upcoming Deadlines */}
              <UpcomingDeadlines deadlines={mockDeadlines} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;