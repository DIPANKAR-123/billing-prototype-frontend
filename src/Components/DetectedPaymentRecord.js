import React, { useState, useEffect } from 'react';

const DetectedPaymentRecord = ({paymentRecords}) => {
  // const [paymentRecords, setPaymentRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   // Fetch data from the backend
  //   const fetchPaymentRecords = async () => {
  //     try {
  //       const response = await fetch('http://localhost:4000/ai/generate/payment-records');  // Replace with your actual API endpoint
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch payment records');
  //       }
  //       const data = await response.json();
  //       setPaymentRecords(data);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPaymentRecords();
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div className='bg-white p-6 rounded-lg border border-gray-200'>
      <h2 className='text-lg font-semibold mb-4'>
        Detected Payment Records
      </h2>
      <table className='w-full'>
        <thead>
          <tr className='text-left border-b border-gray-200'>
            <th className='pb-3'>Payor Name</th>
            <th className='pb-3'>Client Name</th>
            <th className='pb-3'>Amount</th>
            <th className='pb-3'>Claim Date</th>
            <th className='pb-3'>Appointment Date</th>
          </tr>
        </thead>
        <tbody>
          {paymentRecords.map((record, index) => (
            <tr key={index} className='border-b border-gray-100'>
              <td className='py-3'>{record.payorName}</td>
              <td className='py-3'>{record.clientName}</td>
              <td className='py-3'>{record.amount}</td>
              <td className='py-3'>{record.claimDate}</td>
              <td className='py-3'>{record.appointmentDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800'>
        Manually add converted payment records
      </button>
    </div>
  );
};

export default DetectedPaymentRecord;
