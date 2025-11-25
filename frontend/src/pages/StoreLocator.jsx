import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import axios from 'axios';
import { MapPin, Phone, Clock, Search } from 'lucide-react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const mapContainerStyle = {
  width: '100%',
  height: '600px'
};

const defaultCenter = {
  lat: 25.7617, // Miami, FL
  lng: -80.1918
};

const StoreLocator = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedStore, setSelectedStore] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  useEffect(() => {
    fetchStores();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = stores.filter(store =>
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.state.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStores(filtered);
    } else {
      setFilteredStores(stores);
    }
  }, [searchTerm, stores]);

  const fetchStores = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/stores`);
      setStores(response.data);
      setFilteredStores(response.data);
      
      // Center map on first store if available
      if (response.data.length > 0) {
        setMapCenter({
          lat: response.data[0].latitude,
          lng: response.data[0].longitude
        });
      }
    } catch (error) {
      console.error('Failed to fetch stores:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading store locations...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Find Degen's Delight Near You</h1>
          <p className="text-xl">Locate stores carrying our premium cranberry vodka RTD</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search by city, state, or store name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {filteredStores.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="mx-auto mb-4 text-gray-400" size={64} />
            <p className="text-xl text-gray-600">
              {searchTerm ? 'No stores found matching your search' : 'No store locations available yet'}
            </p>
            <p className="text-gray-500 mt-2">Check back soon for updates!</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <p className="text-gray-600">
                Found {filteredStores.length} store{filteredStores.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStores.map((store) => (
                <Card key={store.id} className="p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-red-600">{store.name}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start text-gray-600">
                      <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <p>{store.address}</p>
                        <p>{store.city}, {store.state} {store.zip_code}</p>
                      </div>
                    </div>

                    {store.phone && (
                      <div className="flex items-center text-gray-600">
                        <Phone size={18} className="mr-2" />
                        <a href={`tel:${store.phone}`} className="hover:text-red-600">
                          {store.phone}
                        </a>
                      </div>
                    )}

                    {store.hours && (
                      <div className="flex items-center text-gray-600">
                        <Clock size={18} className="mr-2" />
                        <span>{store.hours}</span>
                      </div>
                    )}
                  </div>

                  <a
                    href={`https://www.google.com/maps?q=${store.latitude},${store.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                  >
                    Get Directions
                  </a>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StoreLocator;
