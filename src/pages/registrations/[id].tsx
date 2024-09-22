// @/src/pages/viewRegistrations/[id].tsx
"use client"; // Add this line at the top

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFirestore, collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db, writeBatch } from '@/lib/firebaseConfig'; // Import the initialized Firestore instance and writeBatch
import jsPDF from 'jspdf'; // Import jsPDF
import autoTable from 'jspdf-autotable'; // Import autoTable function from jspdf-autotable

const ViewRegistrations = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [registrationToDelete, setRegistrationToDelete] = useState<string | null>(null);

  interface Registration {
    id: string;
    name?: string;
    phone?: string;
    email?: string;
    ktuId?: string;
    collegeName?: string;
    verified?: boolean;
    paymentImageUrl?: string;
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

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Registrations for Event ${id}`, 10, 10);
    const tableColumn = ["Name", "Phone", "Email", "KTU ID", "College", "Verified", "Payment Image"];
    const tableRows: any[] = [];

    registrations.forEach(registration => {
      const registrationData = [
        registration.name || '',
        registration.phone || '',
        registration.email || '',
        registration.ktuId || '',
        registration.collegeName || '',
        registration.verified ? 'Yes' : 'No',
        registration.paymentImageUrl ? 'Yes' : 'No'
      ];
      tableRows.push(registrationData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save(`registrations_${id}.pdf`);
  };

  const handleDeleteRegistration = (registrationId: string) => {
    setRegistrationToDelete(registrationId);
    setShowDeletePopup(true);
  };

  const confirmDeleteRegistration = async () => {
    if (registrationToDelete) {
      try {
        const registrationDoc = doc(getFirestore(), `eventReg/${id}/registrations`, registrationToDelete);
        await deleteDoc(registrationDoc);
        setRegistrations(registrations.filter(registration => registration.id !== registrationToDelete));
        setShowDeletePopup(false);
        setRegistrationToDelete(null);
      } catch (error) {
        console.error('Error deleting registration: ', error);
        alert('Failed to delete registration. Please try again.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <nav className="flex items-center justify-between p-4 bg-blue-600 text-white">
        <h1 className="text-xl font-bold cursor-pointer" onClick={() => router.push('/admin')}>ASME CET Admin Portal</h1>
      </nav>
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Registrations for Event {id}</h1>
        <div className="w-full max-w-4xl bg-white p-4 rounded shadow-md overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">KTU ID</th>
                <th className="py-2 px-4 border-b">College</th>
                <th className="py-2 px-4 border-b">Verified</th>
                <th className="py-2 px-4 border-b">Payment Image</th>
                <th className="py-2 px-4 border-b">Actions</th>
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
                  <td className="py-2 px-4 border-b text-center">
                    {registration.paymentImageUrl ? (
                      <a href={registration.paymentImageUrl} target="_blank" rel="noopener noreferrer">
                        View Image
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleDeleteRegistration(registration.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col sm:flex-row justify-end mt-4">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mb-2 sm:mb-0 sm:mr-2"
            >
              Update
            </button>
            <button
              onClick={handleExportPDF}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            >
              Export as PDF
            </button>
          </div>
        </div>
      </div>
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Are you sure you want to delete this registration?</h2>
            <div className="flex justify-end">
              <button
                onClick={() => setShowDeletePopup(false)}
                className="px-4 py-2 mr-2 bg-gray-500 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteRegistration}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewRegistrations;