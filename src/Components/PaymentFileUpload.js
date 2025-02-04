import React, { useState } from "react";
import axios from "axios";
import getBaseUrl from "../utils/getBaseUrl";

const PaymentFileUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(""); // "success" or "error"
  const BASE_URL = getBaseUrl();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // Reset upload status when a new file is selected
      setUploadStatus("");
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      return alert("Please select a file");
    }
    setLoading(true);
    setUploadStatus("");
    const formData = new FormData();
    formData.append("file", file);
    // Indicate that this is a payment file upload
    formData.append("category", "payment");

    let url = `${BASE_URL}/ai/generate/upload`;
    if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
      url = `${BASE_URL}/ai/generate/upload/excel`;
      formData.append("fileType", "excel");
    } else {
      formData.append("fileType", "general");
    }
    // Append additional dynamic field (timestamp)
    formData.append("uploadTimestamp", new Date().toISOString());

    try {
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Payment file uploaded successfully:", response.data);
      setUploadStatus("success");
      // Optionally, clear the selected file after a successful upload:
      // setFile(null);
    } catch (error) {
      console.error("Error uploading payment file:", error);
      setUploadStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Upload Payment File</h2>
      <label htmlFor="payment-file-upload">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer">
          <div className="flex justify-center mb-4">
            {/* Optional icon for payment file upload */}
          </div>
          <p className="text-gray-600 mb-2">
            Select a payment file to upload or drag and drop
          </p>
          <p className="text-sm text-gray-500">
            PDF, PNG, JPG, GIF, Excel (MAX. 10MB)
          </p>
        </div>
      </label>
      <input
        id="payment-file-upload"
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
        {loading ? "Uploading..." : "Upload Payment File"}
      </button>
      <div className="mt-4">
        {file && !uploadStatus && (
          <p className="text-sm text-gray-700">
            Selected file: <span className="font-medium">{file.name}</span>
          </p>
        )}
        {uploadStatus === "success" && (
          <p className="text-green-600 text-sm mt-2">
            File <span className="font-medium">{file.name}</span> has been
            uploaded successfully.
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

export default PaymentFileUpload; 