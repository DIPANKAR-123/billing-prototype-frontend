import React, { useState } from 'react';
import getBaseUrl from '../utils/getBaseUrl';

const DetectedPaymentRecord = ({ paymentRecords }) => {

  const [records, setRecords] = useState(paymentRecords);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newRecord, setNewRecord] = useState({ payor: '', client: '', amount: '', appointmentDate: '' });
  const BASE_URL = getBaseUrl();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isAdding) {
      setNewRecord({ ...newRecord, [name]: value });
    } else {
      setEditingRecord({ ...editingRecord, [name]: value });
    }
  };

  const addRecordToBackend = async (record) => {
    try {
      const response = await fetch(`${BASE_URL}/ai/generate/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      if (!response.ok) throw new Error('Failed to add record');
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const updateRecordInBackend = async (id, record) => {
    try {
      const response = await fetch(`${BASE_URL}/ai/generate/${record._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      if (!response.ok) throw new Error('Failed to update record');
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRecordFromBackend = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/ai/generate/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete record');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveEdit = async (index) => {
    const updatedRecords = [...records];
    const updatedRecord = editingRecord;

    // Assuming `id` is part of the record
    await updateRecordInBackend(updatedRecord._id, updatedRecord);

    updatedRecords[index] = updatedRecord;
    setRecords(updatedRecords);
    setEditingIndex(null);
    setEditingRecord(null);
  };

  const handleAddRecord = async () => {
    const addedRecord = await addRecordToBackend(newRecord);
    setRecords([...records, addedRecord]);
    setNewRecord({ payor: '', client: '', amount: '', appointmentDate: '' });
    setIsAdding(false);
  };

  const handleDeleteRecord = async (index) => {
    const recordToDelete = records[index];

    // Assuming `id` is part of the record
    await deleteRecordFromBackend(recordToDelete._id);

    setRecords(records.filter((_, i) => i !== index));
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingRecord(null);
  };

  const handleCancelAdd = () => {
    setNewRecord({ payor: '', client: '', amount: '', appointmentDate: '' });
    setIsAdding(false);
  };
  console.log(records)

  return (
    <div className='bg-white p-6 rounded-lg border border-gray-200'>
      <h2 className='text-lg font-semibold mb-4'>Detected Payment Records</h2>
      <table className='w-full'>
        <thead>
          <tr className='text-left border-b border-gray-200'>
            <th className='pb-3'>Payor Name</th>
            <th className='pb-3'>Client Name</th>
            <th className='pb-3'>Amount</th>
            <th className='pb-3'>Appointment Date</th>
            <th className='pb-3'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index} className='border-b border-gray-100'>
              {editingIndex === index ? (
                <>
                  <td className='py-3'>
                    <input
                      type='text'
                      name='payor'
                      value={editingRecord.payor}
                      onChange={handleInputChange}
                      className='w-full p-2 border rounded'
                    />
                  </td>
                  <td className='py-3'>
                    <input
                      type='text'
                      name='client'
                      value={editingRecord.client}
                      onChange={handleInputChange}
                      className='w-full p-2 border rounded'
                    />
                  </td>
                  <td className='py-3'>
                    <input
                      type='number'
                      name='amount'
                      value={editingRecord.amount}
                      onChange={handleInputChange}
                      className='w-full p-2 border rounded'
                    />
                  </td>
                  <td className='py-3'>
                    <input
                      type='date'
                      name='appointmentDate'
                      value={editingRecord.appointmentDate}
                      onChange={handleInputChange}
                      className='w-full p-2 border rounded'
                    />
                  </td>
                  <td className='py-3'>
                    <button
                      className='mr-2 bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600'
                      onClick={() => handleSaveEdit(index)}
                    >
                      Save
                    </button>
                    <button
                      className='bg-gray-300 text-gray-700 py-1 px-3 rounded-lg'
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className='py-3'>{record?.payor}</td>
                  <td className='py-3'>{record?.client}</td>
                  <td className='py-3'>{record?.amount}</td>
                  <td className='py-3'>{record?.appointmentDate}</td>
                  <td className='py-3'>
                    <button
                      className='mr-2 text-blue-500 hover:underline'
                      onClick={() => {
                        setEditingIndex(index);
                        setEditingRecord(record);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className='text-red-500 hover:underline'
                      onClick={() => handleDeleteRecord(index)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
          {isAdding && (
            <tr className='border-b border-gray-100'>
              <td className='py-3'>
                <input
                  type='text'
                  name='payor'
                  value={newRecord?.payor}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded'
                />
              </td>
              <td className='py-3'>
                <input
                  type='text'
                  name='client'
                  value={newRecord?.client}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded'
                />
              </td>
              <td className='py-3'>
                <input
                  type='number'
                  name='amount'
                  value={newRecord?.amount}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded'
                />
              </td>
              <td className='py-3'>
                <input
                  type='date'
                  name='appointmentDate'
                  value={newRecord?.appointmentDate}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded'
                />
              </td>
              <td className='py-3'>
                <button
                  className='mr-2 bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600'
                  onClick={handleAddRecord}
                >
                  Add
                </button>
                <button
                  className='bg-gray-300 text-gray-700 py-1 px-3 rounded-lg'
                  onClick={handleCancelAdd}
                >
                  Cancel
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button
        className='w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800'
        onClick={() => setIsAdding(true)}
      >
        Manually add converted payment records
      </button>
    </div>
  );
};

export default DetectedPaymentRecord;
