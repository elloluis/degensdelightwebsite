import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import axios from 'axios';
import { ArrowLeft, Mail, User } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const SubmissionsViewer = () => {
  const { user, getAuthHeaders } = useAuth();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [distributors, setDistributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchSubmissions();
  }, [user, navigate]);

  const fetchSubmissions = async () => {
    try {
      const [contactRes, distRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/contact`, { headers: getAuthHeaders() }),
        axios.get(`${BACKEND_URL}/api/distributors`, { headers: getAuthHeaders() })
      ]);
      setContacts(contactRes.data);
      setDistributors(distRes.data);
    } catch (error) {
      console.error('Failed to fetch submissions');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button onClick={() => navigate('/admin/dashboard')} variant="ghost" className="mr-4">
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl font-bold">Form Submissions</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Mail className="mr-2 text-red-600" />
            Contact Submissions ({contacts.length})
          </h2>
          <div className="grid gap-4">
            {contacts.map((contact) => (
              <Card key={contact.id} className="p-4">
                <div className="grid md:grid-cols-2 gap-2">
                  <p><strong>Name:</strong> {contact.name}</p>
                  <p><strong>Email:</strong> {contact.email}</p>
                  <p><strong>Phone:</strong> {contact.phone || 'N/A'}</p>
                  <p><strong>Subject:</strong> {contact.subject}</p>
                  <p className="md:col-span-2"><strong>Message:</strong> {contact.message}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(contact.timestamp).toLocaleString()}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <User className="mr-2 text-red-600" />
            Distributor Inquiries ({distributors.length})
          </h2>
          <div className="grid gap-4">
            {distributors.map((dist) => (
              <Card key={dist.id} className="p-4">
                <div className="grid md:grid-cols-2 gap-2">
                  <p><strong>Company:</strong> {dist.companyName}</p>
                  <p><strong>Contact:</strong> {dist.contactName}</p>
                  <p><strong>Email:</strong> {dist.email}</p>
                  <p><strong>Phone:</strong> {dist.phone}</p>
                  <p><strong>Type:</strong> {dist.businessType}</p>
                  <p><strong>Location:</strong> {dist.location}</p>
                  <p className="md:col-span-2"><strong>Brands:</strong> {dist.currentBrands || 'N/A'}</p>
                  <p className="md:col-span-2"><strong>Message:</strong> {dist.message || 'N/A'}</p>
                  <p className="text-sm text-gray-500">{new Date(dist.timestamp).toLocaleString()}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionsViewer;
