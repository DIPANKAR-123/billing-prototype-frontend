import React, { useState, useEffect } from "react";
import axios from "axios";
import getBaseUrl from "../../../utils/getBaseUrl";

const BankRecordUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const BASE_URL = getBaseUrl();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadStatus("");
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
    setLoading(true);
    setUploadStatus("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Upload bank record file using POST
      const response = await axios.post(
        `${BASE_URL}/ai/generate/upload/bank-record`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Bank record file uploaded:", response.data);
      setUploadStatus("success");
    } catch (error) {
      console.error("Error uploading bank record file:", error);
      setUploadStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 mb-4">
      <h2 className="text-lg font-semibold mb-4">Upload Bank Records</h2>
      <label htmlFor="bank-record-upload">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer">
          <div className="flex justify-center mb-4">
            {/* Optional icon for bank record file upload */}
          </div>
          <p className="text-gray-600 mb-2">
            Select a bank record file to upload or drag and drop
          </p>
          <p className="text-sm text-gray-500">
            Excel, CSV (MAX. 10MB)
          </p>
        </div>
      </label>
      <input
        id="bank-record-upload"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className={`w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800 ${
          !file ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Uploading..." : "Upload Bank Record"}
      </button>
      <div className="mt-4">
        {file && !uploadStatus && (
          <p className="text-sm text-gray-700">
            Selected file: <span className="font-medium">{file.name}</span>
          </p>
        )}
        {uploadStatus === "success" && (
          <p className="text-green-600 text-sm mt-2">
            File <span className="font-medium">{file.name}</span> has been uploaded successfully.
          </p>
        )}
        {uploadStatus === "error" && (
          <p className="text-red-600 text-sm mt-2">
            There was an error uploading the file. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

const BankRecordTable = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = getBaseUrl();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/ai/generate/bank-records`);
        setRecords(res.data);
      } catch (error) {
        console.error("Error fetching bank records:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, [BASE_URL]);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Bank Records</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-200">
              <th className="pb-3">Date</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Insurance Service</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3">{record.date}</td>
                <td className="py-3">$ {record.amount}</td>
                <td className="py-3">{record.insuranceService}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const BankRecordsPage = () => {
  return (
    <div className="container mx-auto p-6">
      <BankRecordUpload />
      <BankRecordTable />
    </div>
  );
};

export default BankRecordsPage;
