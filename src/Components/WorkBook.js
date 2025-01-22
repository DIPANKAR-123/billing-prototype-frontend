import React, { useState } from "react";

const WorkBook = ({ matchedRecords }) => {
  const [filter, setFilter] = useState("All");
  const filteredRecords =
    filter === "All"
      ? matchedRecords
      : matchedRecords?.filter((record) => record.matchStatus === filter);
  const totalEOB = matchedRecords?.reduce(
    (sum, record) => sum + (Number(record.eobAmount) || 0),
    0
  );
  const pendingEOBAmount = matchedRecords
    ?.filter((record) => record.matchStatus !== "Record Exist")
    .reduce((sum, record) => sum + (Number(record.eobAmount) || 0), 0);
  const matchedCount =
    matchedRecords?.filter((record) => record.matchStatus === "Record Exist")
      .length || 0;
  return (
    <div>
      <div className='bg-white p-6 rounded-lg border border-gray-200 mb-6'>
        <h2 className='text-lg font-semibold mb-4'>Financial Summary</h2>
        <div className='grid grid-cols-4 gap-4'>
          <div className='p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between'>
            <p className='text-gray-500'>Total value of posted EOB payments</p>
            <p className='text-xl font-bold'>${totalEOB || 0}</p>
          </div>
          <div className='p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between'>
            <p className='text-gray-500'>Total amount with Pending EOBs</p>
            <p className='text-xl font-bold'>${pendingEOBAmount || 0}</p>
          </div>
          <div className='p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between'>
            <p className='text-gray-500'>
              Appointments with EOB paid and settled
            </p>
            <p className='text-xl font-bold'>{matchedCount || 0}</p>
          </div>
          <div className='p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between'>
            <p className='text-gray-500'>Appointments with EOB pending</p>
            <p className='text-xl font-bold'>
              {matchedRecords.length - matchedCount || 0}
            </p>
          </div>
        </div>
      </div>

      <div className='bg-white p-6 rounded-lg border border-gray-200'>
        <h2 className='text-lg font-semibold mb-4'>Workbook</h2>
        <div className='mb-4 mr-2'>
          <label className='block text-gray-700 font-medium mb-2'>
            Filter by Match Status:
          </label>
          <select
            className='border border-gray-300 rounded-md p-2 m-1'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value='All'>All</option>
            <option value='Record Exist'>Matched</option>
            <option value='No corresponding record found'>Not Matched</option>
          </select>
        </div>
        <table className='w-full'>
          <thead>
            <tr className='text-left border-b border-gray-200'>
              <th className='pb-3'>Date</th>
              <th className='pb-3'>Payor Name</th>
              <th className='pb-3'>Client Name</th>
              <th className='pb-3 pr-8'>EOB Amount</th>
              <th className='pb-3 mr-4 pr-8'>Appt Amount</th>
              <th className='pb-3'>Match Status</th>
              <th className='pb-3'>Amount Matched Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords?.map((record, index) => (
              <tr key={index} className='border-b border-gray-100'>
                <td className='py-3'>{record?.appointmentDate}</td>
                <td className='py-3'>{record?.payor}</td>
                <td className='py-3'>{record?.client}</td>
                <td className='py-3'>{record?.eobAmount}</td>
                <td className='py-3'>{record?.appointmentAmount}</td>
                <td className='py-3'>{record?.matchStatus}</td>
                <td className='py-3'>{record?.amountMatched}</td>
                {/* Add more fields as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkBook;
