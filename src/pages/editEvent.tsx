// @/src/pages/editEvent.tsx
"use client"; // Add this line at the top

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebaseConfig'; // Import the initialized Firestore and Storage instances

type EventData = {
  eventName: string;
  eventDescription: string;
  eventDate: string;
  eventTime: string;
  enablePayments: boolean;
  paymentImageUrl?: string;
};

const EditEvent = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<EventData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      const eventDoc = doc(db, 'Events', eventId as string);
      const eventSnapshot = await getDoc(eventDoc);
      if (eventSnapshot.exists()) {
        setEvent(eventSnapshot.data() as EventData);
        setLoading(false);
      } else {
        setError('Event not found');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching event details: ', error);
      setError('Failed to fetch event details');
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => prevEvent ? { ...prevEvent, [name]: value } : null);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setEvent((prevEvent) => prevEvent ? { ...prevEvent, [name]: checked } : null);
  };

  const handlePaymentImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setEvent((prevEvent) => prevEvent ? { ...prevEvent, paymentImageUrl: URL.createObjectURL(file) } : null);
    }
  };

  const handleUpdateEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!event) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      let paymentImageUrl = event.paymentImageUrl || '';
      if (event.enablePayments && paymentImageUrl.startsWith('blob:')) {
        const paymentImageRef = ref(storage, `payments/${new Date().getTime()}`);
        const response = await fetch(paymentImageUrl);
        const blob = await response.blob();
        await uploadBytes(paymentImageRef, blob);
        paymentImageUrl = await getDownloadURL(paymentImageRef);
      }

      const eventDoc = doc(db, 'Events', eventId as string);
      await updateDoc(eventDoc, {
        eventName: event.eventName,
        eventDescription: event.eventDescription,
        eventDate: event.eventDate,
        eventTime: event.eventTime,
        enablePayments: event.enablePayments,
        paymentImageUrl,
      });

      alert('Event updated successfully!');
      router.push('/admin');
    } catch (error) {
      console.error('Error updating event: ', error);
      setError('Failed to update event. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <nav className="flex items-center justify-between p-4 bg-blue-600 text-white">
        <h1 className="text-xl font-bold" onClick={() => router.push('/admin')}>ASME CET Admin Portal</h1>
      </nav>
      <div className="flex items-center justify-center flex-grow">
        <form onSubmit={handleUpdateEvent} className="w-full max-w-lg bg-white p-8 rounded shadow-md">
          <h1 className="text-3xl font-bold mb-6">Edit Event</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventName">
              Event Name
            </label>
            <input
              id="eventName"
              name="eventName"
              type="text"
              value={event?.eventName || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDescription">
              Event Description
            </label>
            <textarea
              id="eventDescription"
              name="eventDescription"
              value={event?.eventDescription || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDate">
              Event Date
            </label>
            <input
              id="eventDate"
              name="eventDate"
              type="date"
              value={event?.eventDate || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventTime">
              Event Time
            </label>
            <input
              id="eventTime"
              name="eventTime"
              type="time"
              value={event?.eventTime || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="enablePayments">
              Enable Payments
            </label>
            <input
              id="enablePayments"
              name="enablePayments"
              type="checkbox"
              checked={event?.enablePayments || false}
              onChange={handleCheckboxChange}
              className="mr-2 leading-tight"
            />
          </div>
          {event?.enablePayments && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Payment Image
              </label>
              {event.paymentImageUrl && (
                <img src={event.paymentImageUrl} alt="Payment" className="w-full h-48 object-cover mb-4" />
              )}
              <input
                id="paymentImage"
                type="file"
                accept="image/*"
                onChange={handlePaymentImageChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Update Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;