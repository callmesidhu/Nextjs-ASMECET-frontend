// @/src/components/UpcomingEvents.tsx
"use client"; // Add this line at the top

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig'; // Import the initialized Firestore instance
import Image from 'next/image';

interface Event {
  id: string;
  eventDate: Date;
  eventImageUrl: string;
  eventName: string;
  eventDescription: string;
  eventTime: string;
  eventType: string;
}

const UpcomingEvents = () => {
  const router = useRouter();
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const eventsCollection = collection(db, 'Events');
    const eventsSnapshot = await getDocs(eventsCollection);
    const eventsList = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));

    const now = new Date();
    const upcoming = eventsList.filter(event => new Date(event.eventDate) >= now);

    setUpcomingEvents(upcoming);
    setLoading(false);
  };

  const handleEventClick = (eventId: string) => {
    router.push(`/register/${eventId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-4xl bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {upcomingEvents.map(event => (
          <li
            key={event.id}
            className="border rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
            onClick={() => handleEventClick(event.id)}
          >
            <div className="relative w-full h-48">
              <Image
                src={event.eventImageUrl}
                alt={event.eventName}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{event.eventName}</h3>
              <p className="text-gray-700 mb-4">{event.eventDescription}</p>
              <div className="text-gray-600 text-sm">
                <p>{new Date(event.eventDate).toLocaleDateString()} {event.eventTime}</p>
                <p>{event.eventType === 'online' ? 'Online' : 'Offline'}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingEvents;