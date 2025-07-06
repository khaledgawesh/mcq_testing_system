import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const ProgressOverview = ({ progressData }) => {
  const {
    totalTests,
    completedTests,
    averageScore,
    streak,
    subjectPerformance,
    recentScores,
    achievements
  } = progressData;

  const completionRate = totalTests > 0 ? Math.round((completedTests / totalTests) * 100) : 0;

  const pieData = [
    { name: 'Completed', value: completedTests, color: '#10B981' },
    { name: 'Remaining', value: totalTests - completedTests, color: '#E2E8F0' }
  ];

  const getScoreColor = (score) => {
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
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Progress Overview</h2>
        <div className="flex items-center space-x-2">
          <Icon name="Award" size={20} className="text-primary" />
          <span className="text-sm font-medium text-text-secondary">
            {streak} day streak
          </span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-primary-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Tests</p>
              <p className="text-2xl font-bold text-text-primary">{totalTests}</p>
            </div>
            <Icon name="FileText" size={24} className="text-primary" />
          </div>
        </div>

        <div className="bg-success-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Completed</p>
              <p className="text-2xl font-bold text-text-primary">{completedTests}</p>
            </div>
            <Icon name="CheckCircle" size={24} className="text-success" />
          </div>
        </div>

        <div className="bg-accent-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Average Score</p>
              <p className={`text-2xl font-bold ${getScoreColor(averageScore)}`}>
                {averageScore}%
              </p>
            </div>
            <Icon name="Target" size={24} className="text-accent" />
          </div>
        </div>

        <div className="bg-warning-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Completion</p>
              <p className="text-2xl font-bold text-text-primary">{completionRate}%</p>
            </div>
            <Icon name="PieChart" size={24} className="text-warning" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Subject Performance */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">Subject Performance</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="subject" 
                  tick={{ fontSize: 12, fill: '#64748B' }}
                  axisLine={{ stroke: '#E2E8F0' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#64748B' }}
                  axisLine={{ stroke: '#E2E8F0' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="score" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Completion Progress */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">Test Completion</h3>
          <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Performance */}
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-4">Recent Performance</h3>
        <div className="space-y-3">
          {recentScores.map((test, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={getPerformanceIcon(test.score)} 
                  size={16} 
                  className={getScoreColor(test.score)} 
                />
                <div>
                  <p className="text-sm font-medium text-text-primary">{test.title}</p>
                  <p className="text-xs text-text-secondary">{test.subject}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${getScoreColor(test.score)}`}>
                  {test.score}%
                </p>
                <p className="text-xs text-text-secondary">{test.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      {achievements && achievements.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="text-lg font-medium text-text-primary mb-4">Recent Achievements</h3>
          <div className="flex flex-wrap gap-2">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-2 bg-accent-50 px-3 py-2 rounded-full">
                <Icon name="Award" size={14} className="text-accent" />
                <span className="text-sm font-medium text-text-primary">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressOverview;