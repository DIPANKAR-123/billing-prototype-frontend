import React, { useState, useEffect } from 'react'
import PaymentFileUpload from './PaymentFileUpload';
import getBaseUrl from '../utils/getBaseUrl';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const BASE_URL = getBaseUrl();

  const getStatusColor = (status) => {
    return status && status.toLowerCase() === 'received'
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const parseCustomDateString = (dateString) => {
    // Match numbers from a string formatted like "Date(2022,11,25,14,30,15)"
    const match = dateString.match(/Date\((\d+),(\d+),(\d+),(\d+),(\d+),(\d+)\)/);
    if (match) {
      const [_, year, month, day, hour, minute, second] = match.map(Number);
      return new Date(year, month, day, hour, minute, second);
    }
    return null;
  };

  const formatDate = (dateString) => {
    const date = parseCustomDateString(dateString);
    if (!date || isNaN(date)) {
      return dateString; // Fallback to original if parsing fails
    }
    return (
      date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }) +
      ' ' +
      date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    );
  };

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BASE_URL}/ai/generate/payment-summary`);
        if (!response.ok) {
          throw new Error('Failed to fetch payment records');
        }
        const data = await response.json();
        setPayments(data);
      } catch (err) {
        setError(err.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <PaymentFileUpload />
      <h2 className="text-lg font-semibold my-8 border-b-slate-100 border-b-2 py-4">
        Payment Records
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : payments.length === 0 ? (
        <p className="text-gray-600">No payment records available.</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-200">
              <th className="pb-3">Date</th>
              <th className="pb-3">Name</th>
              <th className="pb-3">Payment Amount</th>
              <th className="pb-3">Ref Number</th>
              <th className="pb-3">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3">{formatDate(payment.date)}</td>
                <td className="py-3">{payment.name}</td>
                <td className="py-3">$ {payment.paymentReceived}</td>
                <td className="py-3">{payment.refNumber}</td>
                <td className="py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.paymentStatus)}`}>
                    {payment.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Payments;