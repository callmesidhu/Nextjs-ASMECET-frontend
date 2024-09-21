// @/src/pages/admin.tsx
"use client"; // Add this line at the top

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const Admin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/signIn');
      } else {
        fetchEvents();
      }
    });

    // Sign out user when the browser or tab is closed
    const handleBeforeUnload = () => {
      signOut(auth);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      unsubscribe();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [router]);

  const fetchEvents = async () => {
    const db = getFirestore();
    const eventsCollection = collection(db, 'Events');
    const eventsSnapshot = await getDocs(eventsCollection);
    const eventsList = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const now = new Date();
    const upcoming = eventsList.filter(event => new Date(event.eventDate) >= now);
    const past = eventsList.filter(event => new Date(event.eventDate) < now);

    setUpcomingEvents(upcoming);
    setPastEvents(past);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };

  const handleAddNewEvent = () => {
    router.push('/newEvent');
  };

  const handleEventClick = (eventId) => {
    router.push(`/event/${eventId}`);
  };

  const handleViewRegistrations = (eventId) => {
    router.push(`/registrations/${eventId}`);
  };

  const handleEditEvent = (eventId) => {
    router.push(`/editEvent/${eventId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <nav className="flex items-center justify-between p-4 bg-blue-600 text-white">
        <h1 className="text-xl font-bold" onClick={() => router.push('/')}>ASME CET Admin Portal</h1>
        <div>
          <button
            onClick={handleAddNewEvent}
            className="px-4 py-2 mr-4 bg-green-500 rounded hover:bg-green-700"
          >
            Add New Events
          </button>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <h1 className="text-3xl font-bold mb-6">Welcome to the Admin Page</h1>
        <div className="w-full max-w-4xl bg-white p-4 rounded shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
          <ul>
            {upcomingEvents.map(event => (
              <li
                key={event.id}
                className="p-4 border-b cursor-pointer hover:bg-gray-100"
                onClick={() => handleEventClick(event.id)}
              >
                <h3 className="text-xl font-bold">{event.eventName}</h3>
                <p>{event.eventDescription}</p>
                <p>{new Date(event.eventDate).toLocaleDateString()} {event.eventTime}</p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewRegistrations(event.id);
                    }}
                    className="px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                  >
                    View Registrations
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditEvent(event.id);
                    }}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                  >
                    Edit Details
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full max-w-4xl bg-white p-4 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Past Events</h2>
          <ul>
            {pastEvents.map(event => (
              <li
                key={event.id}
                className="p-4 border-b cursor-pointer hover:bg-gray-100"
                onClick={() => handleEventClick(event.id)}
              >
                <h3 className="text-xl font-bold">{event.eventName}</h3>
                <p>{event.eventDescription}</p>
                <p>{new Date(event.eventDate).toLocaleDateString()} {event.eventTime}</p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewRegistrations(event.id);
                    }}
                    className="px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                  >
                    View Registrations
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditEvent(event.id);
                    }}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                  >
                    Edit Details
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;