import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import axios from 'axios';
import { 
  BarChart3, Users, Mail, Store, LogOut, 
  Eye, TrendingUp, MapPin, MessageSquare 
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const { user, logout, getAuthHeaders } = useAuth();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchAnalytics();
  }, [user, navigate]);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/admin/analytics/summary`,
        { headers: getAuthHeaders() }
      );
      setAnalytics(response.data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.email}</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2" size={16} />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Page Views</p>
                <p className="text-3xl font-bold">{analytics?.total_views || 0}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Eye className="text-blue-600" size={24} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Unique Visitors</p>
                <p className="text-3xl font-bold">{analytics?.unique_visitors || 0}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="text-green-600" size={24} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Contact Submissions</p>
                <p className="text-3xl font-bold">{analytics?.total_contacts || 0}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Mail className="text-purple-600" size={24} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Distributor Inquiries</p>
                <p className="text-3xl font-bold">{analytics?.total_distributors || 0}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <MessageSquare className="text-orange-600" size={24} />
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="text-red-600 mr-2" size={20} />
              <h2 className="text-xl font-bold">Recent Activity</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Views (Last 7 Days)</span>
                <span className="font-semibold">{analytics?.recent_views || 0}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <BarChart3 className="text-red-600 mr-2" size={20} />
              <h2 className="text-xl font-bold">Top Pages</h2>
            </div>
            <div className="space-y-2">
              {analytics?.top_pages?.slice(0, 5).map((page, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{page.page}</span>
                  <span className="font-semibold">{page.views}</span>
                </div>
              )) || <p className="text-gray-500">No data yet</p>}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/admin/stores">
              <Button className="w-full bg-red-600 hover:bg-red-700">
                <Store className="mr-2" size={16} />
                Manage Stores
              </Button>
            </Link>
            <Link to="/admin/submissions">
              <Button className="w-full" variant="outline">
                <Mail className="mr-2" size={16} />
                View Submissions
              </Button>
            </Link>
            <Link to="/store-locator">
              <Button className="w-full" variant="outline">
                <MapPin className="mr-2" size={16} />
                View Store Locator
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
