'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EventDashboard() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    eventTitle: '',
    eventDescription: '',
    eventDate: '',
    venue: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Retrieve token from localStorage when component mounts
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      setMessage('You need to log in first');
      // Redirect to login page after 2 seconds if not logged in
      setTimeout(() => router.push('/login'), 2000);
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      setMessage('You must be logged in to post events');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:3001/api/notifications/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('Event posted successfully!');
        setFormData({
          eventTitle: '',
          eventDescription: '',
          eventDate: '',
          venue: ''
        });
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage(`Failed to post event: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-black text-white">
      <h1 className="text-2xl font-bold mb-6">Post New Event</h1>
      
      {message && (
        <div className={`p-4 mb-4 rounded ${message.includes('Error') || message.includes('Failed') || message.includes('must be logged in') ? 'bg-red-900 text-red-300' : 'bg-green-900 text-green-300'}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Event Title</label>
          <input
            type="text"
            name="eventTitle"
            value={formData.eventTitle}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-700 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Event Description</label>
          <textarea
            name="eventDescription"
            value={formData.eventDescription}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-2 border border-gray-700 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Event Date</label>
          <input
            type="datetime-local"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-700 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Venue</label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-700 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading || !token}
          className="w-full bg-white hover:bg-gray-300 text-black font-medium py-2 px-4 rounded transition duration-300 disabled:opacity-50"
        >
          {loading ? 'Posting...' : 'Post Event'}
        </button>
      </form>
    </div>
  );
}