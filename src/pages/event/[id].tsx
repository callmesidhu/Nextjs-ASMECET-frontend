// @/src/pages/event/[id].tsx
"use client"; // Add this line at the top

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const EventDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  interface EventData {
    eventName: string;
    eventDescription: string;
    eventImageUrl: string;
    enablePayments: boolean;
    paymentImageUrl?: string;
    eventDate: string;
    eventTime: string;
    eventType: string;
    eventLocation?: string;
  }

  const [event, setEvent] = useState<EventData | null>(null);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [enablePayments, setEnablePayments] = useState(false);
  const [paymentImage, setPaymentImage] = useState<File | null>(null);
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventType, setEventType] = useState('offline');
  const [eventLocation, setEventLocation] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/signIn');
      } else {
        fetchEvent();
      }
    });

    return () => unsubscribe();
  }, [router, id]);

  const fetchEvent = async () => {
    if (!id) return;
    const db = getFirestore();
    const eventDoc = doc(db, 'Events', id as string);
    const eventSnapshot = await getDoc(eventDoc);
    if (eventSnapshot.exists()) {
      const eventData = eventSnapshot.data();
      setEvent(eventData as EventData);
      setEventName(eventData.eventName);
      setEventDescription(eventData.eventDescription);
      setEnablePayments(eventData.enablePayments);
      setEventDate(eventData.eventDate);
      setEventTime(eventData.eventTime);
      setEventType(eventData.eventType);
      setEventLocation(eventData.eventLocation);
      setLoading(false);
    } else {
      console.error('Event not found');
      router.push('/admin');
    }
  };

  const handleEventImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEventImage(e.target.files[0]);
    }
  };

  const handlePaymentImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const db = getFirestore();
    const storage = getStorage();
    const eventDoc = doc(db, 'Events', id as string);

    if (!eventName || !eventDescription || !eventDate || !eventTime || !eventType || (eventType === 'offline' && !eventLocation) || !eventImage || (enablePayments && !paymentImage)) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      // Upload event image if changed
      let eventImageUrl = event?.eventImageUrl || '';
      if (eventImage) {
        const eventImageRef = ref(storage, `events/${eventImage.name}`);
        await uploadBytes(eventImageRef, eventImage);
        eventImageUrl = await getDownloadURL(eventImageRef);
      }

      // Upload payment image if payments are enabled and changed
      let paymentImageUrl = event?.paymentImageUrl;
      if (enablePayments && paymentImage) {
        const paymentImageRef = ref(storage, `payments/${paymentImage.name}`);
        await uploadBytes(paymentImageRef, paymentImage);
        paymentImageUrl = await getDownloadURL(paymentImageRef);
      }

      // Update event details in Firestore
      await updateDoc(eventDoc, {
        eventName,
        eventDescription,
        eventImageUrl,
        enablePayments,
        paymentImageUrl,
        eventDate,
        eventTime,
        eventType,
        eventLocation,
      });

      // Display success message and redirect to admin page
      alert('Event updated successfully!');
      router.push('/admin');
    } catch (error) {
      console.error('Error updating document: ', error);
      setError('Failed to update event. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <nav className="flex items-center justify-between p-4 bg-blue-600 text-white">
        <h1 className="text-xl font-bold" onClick={()=> router.push('/admin')}>ASME CET Admin Portal</h1>
        <button
          onClick={() => {
            signOut(auth);
            router.push('/');
          }}
          className="px-4 py-2 bg-red-500 rounded hover:bg-red-700"
        >
          Sign Out
        </button>
      </nav>
      <div className="flex items-center justify-center flex-grow">
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded shadow-md">
          <h1 className="text-3xl font-bold mb-6">Edit Event</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventName">
              Event Name
            </label>
            <input
              id="eventName"
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
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
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventImage">
              Event Image
            </label>
            <input
              id="eventImage"
              type="file"
              accept="image/*"
              onChange={handleEventImageChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDate">
              Event Date
            </label>
            <input
              id="eventDate"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
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
              type="time"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventType">
              Event Type
            </label>
            <select
              id="eventType"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="offline">Offline</option>
              <option value="online">Online</option>
            </select>
          </div>
          {eventType === 'offline' && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventLocation">
                Event Location
              </label>
              <input
                id="eventLocation"
                type="text"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              <input
                type="checkbox"
                checked={enablePayments}
                onChange={(e) => setEnablePayments(e.target.checked)}
                className="mr-2"
              />
              Enable Payments
            </label>
          </div>
          {enablePayments && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentImage">
                Payment Image
              </label>
              <input
                id="paymentImage"
                type="file"
                accept="image/*"
                onChange={handlePaymentImageChange}
                className="w-full px-3 py-2 border rounded"
                required={enablePayments}
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Save details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventDetails;