// @/src/pages/viewRegistrations/[id].tsx
"use client"; // Add this line at the top

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFirestore, collection, getDocs, updateDoc, doc} from 'firebase/firestore';
import { db, writeBatch } from '@/lib/firebaseConfig'; // Import the initialized Firestore instance and writeBatch

const ViewRegistrations = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  interface Registration {
    id: string;
    name?: string;
    phone?: string;
    email?: string;
    ktuId?: string;
    collegeName?: string;
    verified?: boolean;
  }
  
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  useEffect(() => {
    if (id) {
      fetchRegistrations();
    }
  }, [id]);

  const fetchRegistrations = async () => {
    const registrationsCollection = collection(db, `eventReg/${id}/registrations`);
    const registrationsSnapshot = await getDocs(registrationsCollection);
    const registrationsList = registrationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setRegistrations(registrationsList);
    setLoading(false);
  };

  const handleCheckboxChange = (index: number) => {
    const updatedRegistrations = [...registrations];
    updatedRegistrations[index].verified = !updatedRegistrations[index].verified;
    setRegistrations(updatedRegistrations);
  };

  const handleUpdate = async () => {
    try {
      const batch = writeBatch(db);
      registrations.forEach((registration) => {
        const registrationDoc = doc(db, `eventReg/${id}/registrations`, registration.id);
        batch.update(registrationDoc, { verified: registration.verified });
      });
      await batch.commit();
      alert('Updated successfully!');
    } catch (error) {
      console.error('Error updating documents: ', error);
      alert('Failed to update. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <nav className="flex items-center justify-between p-4 bg-blue-600 text-white">
        <h1 className="text-xl font-bold" onClick={() => router.push('/admin')}>ASME CET Admin Portal</h1>
      </nav>
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <h1 className="text-3xl font-bold mb-6">Registrations for Event {id}</h1>
        <div className="w-full max-w-4xl bg-white p-4 rounded shadow-md">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">KTU ID</th>
                <th className="py-2 px-4 border-b">College</th>
                <th className="py-2 px-4 border-b">Verified</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((registration, index) => (
                <tr key={registration.id}>
                  <td className="py-2 px-4 border-b">{registration.name}</td>
                  <td className="py-2 px-4 border-b">{registration.phone}</td>
                  <td className="py-2 px-4 border-b">{registration.email}</td>
                  <td className="py-2 px-4 border-b">{registration.ktuId}</td>
                  <td className="py-2 px-4 border-b">{registration.collegeName}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <input
                      type="checkbox"
                      checked={registration.verified}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRegistrations;