import React, { useState, useEffect } from 'react';

const EOBDocuments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // You can adjust this number

  // Fetch jobs from the API
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/ai/generate/jobs');
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      setDocuments(data); // Set the fetched documents data in state
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch jobs when the component mounts
  useEffect(() => {
    fetchJobs();
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) + ' ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  // Determine the status color based on the status
  const getStatusColor = (status) => {
    const statusColors = {
      'SUCCESS': 'bg-green-100 text-green-800',
      'partially converted': 'bg-yellow-100 text-yellow-800',
      'error': 'bg-red-100 text-red-800',
      'Scheduled': 'bg-blue-100 text-blue-800',
      'Confirmed': 'bg-green-100 text-green-800',
      'Completed': 'bg-purple-100 text-purple-800',
      'Cancelled': 'bg-red-100 text-red-800',
      'Rescheduled': 'bg-yellow-100 text-yellow-800',
      'Submitted': 'bg-blue-100 text-blue-800',
      'PENDING': 'bg-yellow-100 text-yellow-800',
      'Denied': 'bg-red-100 text-red-800',
      'Paid': 'bg-green-100 text-green-800',
      'Appeal': 'bg-purple-100 text-purple-800',
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  // Get current page's documents
  const indexOfLastDoc = currentPage * itemsPerPage;
  const indexOfFirstDoc = indexOfLastDoc - itemsPerPage;
  const currentDocs = documents.slice(indexOfFirstDoc, indexOfLastDoc);

  // Pagination control functions
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // If loading, show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's an error, display error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Pagination: Calculate total pages
  const totalPages = Math.ceil(documents.length / itemsPerPage);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">EOB Documents</h2>
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-gray-200">
            <th className="pb-3">Date</th>
            <th className="pb-3">Status</th>
            <th className="pb-3">PDF Link</th>
          </tr>
        </thead>
        <tbody>
          {currentDocs?.map((doc, index) => (
            <tr key={index} className="border-b border-gray-100">
              <td className="py-3">{formatDate(doc.created_at)}</td> {/* Assuming created_at is the date */}
              <td className="py-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                  {doc.status}
                </span>
              </td>
              <td className="py-3">
                <a href={doc.pdfLink} className="text-blue-600 hover:underline">View PDF</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l-md"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-700">{currentPage} of {totalPages}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EOBDocuments;
