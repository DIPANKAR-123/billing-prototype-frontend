"use client";

import { useState, useEffect } from "react";
import {
  Upload,
  FileText,
  CreditCard,
  Users,
  ClipboardList,
  UploadIcon,
} from "lucide-react";
import FileUpload from "./Components/FileUpload";
import EOBDocuments from "./Components/EOBDocuments";
import DetectedPaymentRecord from "./Components/DetectedPaymentRecord";
import Appointments from "./Components/Appointments";
import WorkBook from "./Components/WorkBook";
import getBaseUrl from "./utils/getBaseUrl";
import GoPayDashboard from "./Components/GoPayDashboard";
import BankDeposit from "./Components/BankDeposit/BankDeposit";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("EOB");
  const [loading, setLoading] = useState("false");
  const [sidebar,setSIdeBar]=useState("Gopay");

  const [claims] = useState([
    {
      date: "2023-05-15",
      clientName: "John Doe",
      status: "Submitted",
      amount: "$500.00",
      payor: "Medicare",
    },
    {
      date: "2023-05-16",
      clientName: "Jane Smith",
      status: "In Process",
      amount: "$750.00",
      payor: "Blue Cross",
    },
    {
      date: "2023-05-17",
      clientName: "Bob Johnson",
      status: "Denied",
      amount: "$1000.00",
      payor: "Aetna",
    },
    {
      date: "2023-05-18",
      clientName: "Alice Brown",
      status: "Paid",
      amount: "$250.00",
      payor: "Cigna",
    },
    {
      date: "2023-05-19",
      clientName: "Charlie Davis",
      status: "Appeal",
      amount: "$1500.00",
      payor: "UnitedHealth",
    },
  ]);

  const getStatusColor = (status) => {
    const statusColors = {
      converted: "bg-green-100 text-green-800",
      "partially converted": "bg-yellow-100 text-yellow-800",
      error: "bg-red-100 text-red-800",
      Scheduled: "bg-blue-100 text-blue-800",
      Confirmed: "bg-green-100 text-green-800",
      Completed: "bg-purple-100 text-purple-800",
      Cancelled: "bg-red-100 text-red-800",
      Rescheduled: "bg-yellow-100 text-yellow-800",
      Submitted: "bg-blue-100 text-blue-800",
      "In Process": "bg-yellow-100 text-yellow-800",
      Denied: "bg-red-100 text-red-800",
      Paid: "bg-green-100 text-green-800",
      Appeal: "bg-purple-100 text-purple-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };
  const [appointments, setAppointments] = useState([]);
  const [paymentRecords, setPaymentRecords] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // 
  const [matchedRecords, setMatchedRecords] = useState([]);
  const BASE_URL = getBaseUrl();

  useEffect(() => {
    const fetchAndMatchData = async () => {
      try {
        setLoading(true);
        const responseAppointments = await fetch(
          `${BASE_URL}/ai/generate/appointment-records`
        );
        const responsePayments = await fetch(
          `${BASE_URL}/ai/generate/payment-records`
        );
         try {
              const response = await fetch(`${BASE_URL}/ai/generate/jobs`);
              if (!response.ok) {
                throw new Error('Failed to fetch jobs');
              }
              const data = await response.json();
              setDocuments(data);
            } catch (error) {
            } finally {
            }
        if (!responseAppointments.ok || !responsePayments.ok) {
          throw new Error("Failed to fetch data");
        }

        const appointmentsData = await responseAppointments.json();
        const paymentRecordsData = await responsePayments.json();

        setAppointments(appointmentsData);
        setPaymentRecords(paymentRecordsData);
        try {
          console.log("here rew", appointmentsData, paymentRecordsData);
          const response = await fetch(
            `${BASE_URL}/ai/generate/match-records`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              // body: JSON.stringify({ appointmentsData, paymentRecordsData }),
            }
          );
          const data = await response.json();
          setMatchedRecords(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching matched records:", error);
        }
        // Match the appointments and payment records
      } catch (error) {
        console.error("Error fetching or matching data:", error);
      }
    };

    fetchAndMatchData();
  }, []);

  console.log("matchedRecords", matchedRecords, typeof matchRecords);

  return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* Sidebar */}
      <div className='w-[20%] bg-white border-r border-gray-200 p-4'>
        <div className='text-xl font-bold mb-8'>OmniPay</div>
        <nav className='space-y-2'>
          <button className='flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg'>
            <FileText className='w-5 h-5' />
            <span>Eligibility Verification</span>
          </button>
          <button className='flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg'>
            <CreditCard className='w-5 h-5' />
            <span>Payment Posting</span>
          </button>
          <button onClick={()=>setSIdeBar("BankDeposit")} className='flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg'>
            <Users className='w-5 h-5' />
            <span>Bank Reconciliation</span>
          </button>
          <button onClick={()=>setSIdeBar("Gopay")} className='flex items-center space-x-2 w-full px-4 py-2 hover:bg-gray-100 text-gray-900 rounded-lg'>
            <ClipboardList className='w-5 h-5' />
            <span>Medpay</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-full">

      { 
        sidebar=="Gopay" && <GoPayDashboard/>
      }
      {
        sidebar=="BankDeposit" && (
          <BankDeposit/>
        )
      }
      </div>
      
    </div>
  );
}