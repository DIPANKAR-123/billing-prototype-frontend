import React, { useState } from "react";
import axios from "axios";
import {
  UploadIcon,
} from "lucide-react";
import getBaseUrl from "../utils/getBaseUrl";

const FileUpload = ({ text,setActiveTab }) => {
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const BASE_URL = getBaseUrl();


  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/ai/generate/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(formData, "file here");
      setJsonData(response.data); // Backend returns extracted JSON data
      // if(text=="Appointments"){

      //   setActiveTab("Appointments")
      // }
      window.location.reload();

    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file");
    } finally {
      setLoading(false);
    }
  };

  const [message, setMessage] = useState("");



  return (
    <div className='bg-white p-6 rounded-lg border border-gray-200'>
      <h2 className='text-lg font-semibold mb-4'>Upload {text}</h2>
          <label htmlFor='file-upload'>
      <div  className='border-2 border-dashed border-gray-300 rounded-lg p-12 text-center'>
        <div className='flex justify-center mb-4'>
          {/* <UploadIcon className="w-12 h-12 text-gray-400" /> */}
            <UploadIcon className='w-12 h-12 text-gray-400' />
          <input
            id='file-upload'
            type='file'
            className='hidden'
            onChange={handleFileChange}
            />
        </div>
        <p className='text-gray-600 mb-2'>Select a file to upload or drag and drop</p>
        <p className='text-sm text-gray-500'>
          PDF, PNG, JPG or GIF (MAX. 10MB)
        </p>
      </div>
            </label>
      <button
        onClick={handleUpload}
        disabled={loading}
        className='w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800'
      >
        {loading ? "Uploading..." : `Click to upload ${text}...`}
      </button>
    </div>
  );
};

export default FileUpload;
