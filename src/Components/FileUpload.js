import React, { useState } from 'react';
import axios from 'axios';
import { Upload, FileText, CreditCard, Users, ClipboardList, UploadIcon } from 'lucide-react'


const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
        console.log(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);


    for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
    console.log(file,'file here',formData);

    try {
      const response = await axios.post('http://localhost:4000/ai/generate/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(formData,"file here")
      setJsonData(response.data); // Backend returns extracted JSON data
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    } finally {
      setLoading(false);
    }
  };

  const [message, setMessage] = useState('');

  const handleRunScript = async () => {
    try {
      const response = await axios.get('http://localhost:4000/ai/generate/run');
      setMessage(response.data.message);
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold mb-4">Upload EOBs</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <div className="flex justify-center mb-4">
                    
                    {/* <UploadIcon className="w-12 h-12 text-gray-400" /> */}
                    <label htmlFor="file-upload">
            <UploadIcon className="w-12 h-12 text-gray-400" />
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
                  </div>
                  <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PDF, PNG, JPG or GIF (MAX. 10MB)</p>
                </div>
                <button onClick={handleUpload} disabled={loading} className="w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800">
                {loading ? 'Uploading...' : 'Upload EOBs...'}
                </button>
              </div>
  );
};

export default FileUpload;
