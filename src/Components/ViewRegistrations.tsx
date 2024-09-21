import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, updateDoc, doc, writeBatch } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { db } from '@/lib/firebaseConfig'; // Import the initialized Firestore instance

interface Registration {
  id: string;
  name: string;
  phone: string;
  email: string;
  ktuId: string;
  collegeName: string;
  verified: boolean;
}
interface ViewRegistrationsProps {
  eventId: string;
}

const ViewRegistrations: React.FC<ViewRegistrationsProps> = ({ eventId }) => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRegistrations();
  }, [eventId]);

  const fetchRegistrations = async () => {
    try {
      const registrationsCollection = collection(db, `registrations/${eventId}/registrations`);
      const registrationsSnapshot = await getDocs(registrationsCollection);
      const registrationsList = registrationsSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        phone: doc.data().phone,
        email: doc.data().email,
        ktuId: doc.data().ktuId,
        collegeName: doc.data().collegeName,
        verified: doc.data().verified,
      }));
      setRegistrations(registrationsList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching registrations: ', error);
      setError('Failed to fetch registrations. Please try again.');
    }
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
        const registrationDoc = doc(db, `registrations/${eventId}/registrations`, registration.id);
        batch.update(registrationDoc, { verified: registration.verified });
      });
      await batch.commit();
      alert('Registrations updated successfully!');
    } catch (error) {
      console.error('Error updating registrations: ', error);
      setError('Failed to update registrations. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Registrations</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
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
              <td className="py-2 px-4 border-b">
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
      <button
        onClick={handleUpdate}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Update
      </button>
    </div>
  );
};

export default ViewRegistrations;