// @/src/pages/register/[id].tsx
"use client"; // Add this line at the top

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFirestore, doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebaseConfig'; // Import the initialized Firestore and Storage instances

const RegisterEvent = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ktuId, setKtuId] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [paymentImage, setPaymentImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchEvent();
    }
  }, [id]);

  const fetchEvent = async () => {
    const eventDoc = doc(db, 'Events', id);
    const eventSnapshot = await getDoc(eventDoc);
    if (eventSnapshot.exists()) {
      setEvent(eventSnapshot.data());
      setLoading(false);
    } else {
      console.error('Event not found');
      router.push('/');
    }
  };

  const handlePaymentImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone || !ktuId || !collegeName || (event.enablePayments && !paymentImage)) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      let paymentImageUrl = '';
      if (event.enablePayments && paymentImage) {
        const paymentImageRef = ref(storage, `payments/${paymentImage.name}`);
        await uploadBytes(paymentImageRef, paymentImage);
        paymentImageUrl = await getDownloadURL(paymentImageRef);
      }

      await addDoc(collection(db, `eventReg/${id}/registrations`), {
        name,
        email,
        phone,
        ktuId,
        collegeName,
        paymentImageUrl,
        verified: false,
      });

      alert('Registration successful!');
      router.push('/');
    } catch (error) {
      console.error('Error adding document: ', error);
      setError('Failed to register. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <nav className="flex items-center justify-between p-4 bg-blue-600 text-white">
        <h1 className="text-xl font-bold">Event Registration</h1>
      </nav>
      <div className="flex items-center justify-center flex-grow">
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded shadow-md">
          <h1 className="text-3xl font-bold mb-6">Register for {event.eventName}</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ktuId">
              KTU ID
            </label>
            <input
              id="ktuId"
              type="text"
              value={ktuId}
              onChange={(e) => setKtuId(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="collegeName">
              College Name
            </label>
            <input
              id="collegeName"
              type="text"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          {event.enablePayments && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Payment Image
                </label>
                <img src={event.paymentImageUrl} alt="Payment" className="w-full h-48 object-cover mb-4" />
                <input
                  id="paymentImage"
                  type="file"
                  accept="image/*"
                  onChange={handlePaymentImageChange}
                  className="w-full px-3 py-2 border rounded"
                  required={event.enablePayments}
                />
              </div>
            </>
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterEvent;