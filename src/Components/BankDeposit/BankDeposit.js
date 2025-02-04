import React, { useState , useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import UploadReconciliation from './NavbarComponents/UploadReconciliation';
import LinkAccount from './NavbarComponents/LinkAccount';
import Spreadsheet from './NavbarComponents/Spreadsheet';
import FinancialSummary from './NavbarComponents/FinancialSummary';
import Payments from '../Payments';



export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('connect-account');

  useEffect(() => {
    console.log(activeTab);
  }, [activeTab]);




  return (
    <div className="w-full   p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Bank Deposit Reconciliation Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your bank deposits and reconcile payments</p>
        </div>

        <div className="border-b border-gray-200">
          <nav className="flex">
            {['Connect Account','Bank Records' , 'Payment Records', 'Financial Summary' , 'Workbook'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
                className={`flex-1 py-4 px-1 text-center text-sm font-medium ${
                  activeTab === tab.toLowerCase().replace(' ', '-')
                    ? 'border-b-2 border-gray-800 text-gray-800'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        

        <div className="p-6">
          {activeTab === 'bank-records' && (
           <UploadReconciliation/>
          )}

          {activeTab === 'connect-account' && (
            <LinkAccount/>
          )}

          {activeTab === 'payment-records' && (
            <Payments/>
          )}

          {activeTab === 'financial-summary' && (
            <FinancialSummary/>
          )}

          {activeTab === 'workbook' && (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}