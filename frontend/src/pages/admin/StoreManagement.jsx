import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { useToast } from '../../hooks/use-toast';
import axios from 'axios';
import { Plus, Edit, Trash2, ArrowLeft, Save, X } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const StoreManagement = () => {
  const { user, getAuthHeaders } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingStore, setEditingStore] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    phone: '',
    hours: '',
    latitude: 0,
    longitude: 0
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchStores();
  }, [user, navigate]);

  const fetchStores = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/admin/stores`,
        { headers: getAuthHeaders() }
      );
      setStores(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load stores",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStore) {
        await axios.put(
          `${BACKEND_URL}/api/admin/stores/${editingStore.id}`,
          formData,
          { headers: getAuthHeaders() }
        );
        toast({ title: "Store updated successfully!" });
      } else {
        await axios.post(
          `${BACKEND_URL}/api/admin/stores`,
          formData,
          { headers: getAuthHeaders() }
        );
        toast({ title: "Store added successfully!" });
      }
      fetchStores();
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save store",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this store?')) return;
    
    try {
      await axios.delete(
        `${BACKEND_URL}/api/admin/stores/${id}`,
        { headers: getAuthHeaders() }
      );
      toast({ title: "Store deleted successfully!" });
      fetchStores();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete store",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (store) => {
    setEditingStore(store);
    setFormData({
      name: store.name,
      address: store.address,
      city: store.city,
      state: store.state,
      zip_code: store.zip_code,
      phone: store.phone || '',
      hours: store.hours || '',
      latitude: store.latitude,
      longitude: store.longitude
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      city: '',
      state: '',
      zip_code: '',
      phone: '',
      hours: '',
      latitude: 0,
      longitude: 0
    });
    setEditingStore(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Button onClick={() => navigate('/admin/dashboard')} variant="ghost" className="mr-4">
                <ArrowLeft size={20} />
              </Button>
              <h1 className="text-2xl font-bold">Store Management</h1>
            </div>
            {!showForm && (
              <Button onClick={() => setShowForm(true)} className="bg-red-600 hover:bg-red-700">
                <Plus className="mr-2" size={16} />
                Add Store
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {showForm && (
          <Card className="p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingStore ? 'Edit Store' : 'Add New Store'}
              </h2>
              <Button onClick={resetForm} variant="ghost">
                <X size={20} />
              </Button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Store Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Address *</Label>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label>City *</Label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label>State *</Label>
                  <Input
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label>ZIP Code *</Label>
                  <Input
                    value={formData.zip_code}
                    onChange={(e) => setFormData({...formData, zip_code: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label>Hours</Label>
                  <Input
                    value={formData.hours}
                    onChange={(e) => setFormData({...formData, hours: e.target.value})}
                    placeholder="Mon-Fri: 9AM-9PM"
                  />
                </div>
                <div>
                  <Label>Latitude *</Label>
                  <Input
                    type="number"
                    step="any"
                    value={formData.latitude}
                    onChange={(e) => setFormData({...formData, latitude: parseFloat(e.target.value)})}
                    required
                  />
                </div>
                <div>
                  <Label>Longitude *</Label>
                  <Input
                    type="number"
                    step="any"
                    value={formData.longitude}
                    onChange={(e) => setFormData({...formData, longitude: parseFloat(e.target.value)})}
                    required
                  />
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  <Save className="mr-2" size={16} />
                  {editingStore ? 'Update Store' : 'Add Store'}
                </Button>
                <Button type="button" onClick={resetForm} variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <Card key={store.id} className="p-4">
              <h3 className="font-bold text-lg mb-2">{store.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{store.address}</p>
              <p className="text-sm text-gray-600 mb-1">
                {store.city}, {store.state} {store.zip_code}
              </p>
              {store.phone && <p className="text-sm text-gray-600 mb-1">📞 {store.phone}</p>}
              {store.hours && <p className="text-sm text-gray-600 mb-3">🕐 {store.hours}</p>}
              <div className="flex gap-2">
                <Button onClick={() => handleEdit(store)} size="sm" variant="outline">
                  <Edit size={14} className="mr-1" />
                  Edit
                </Button>
                <Button onClick={() => handleDelete(store.id)} size="sm" variant="destructive">
                  <Trash2 size={14} className="mr-1" />
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {stores.length === 0 && !showForm && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No stores added yet</p>
            <Button onClick={() => setShowForm(true)} className="bg-red-600 hover:bg-red-700">
              <Plus className="mr-2" size={16} />
              Add Your First Store
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreManagement;
