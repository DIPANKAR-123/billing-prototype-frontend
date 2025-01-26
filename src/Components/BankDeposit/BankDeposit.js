import React, { useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import UploadReconciliation from './NavbarComponents/UploadReconciliation';
import LinkAccount from './NavbarComponents/LinkAccount';
import Spreadsheet from './NavbarComponents/Spreadsheet';
import FinancialSummary from './NavbarComponents/FinancialSummary';



export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('connect-account');
 

  

 

  return (
    <div className="w-full   p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Bank Deposit Reconciliation Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your bank deposits and reconcile payments</p>
        </div>

        <div className="border-b border-gray-200">
          <nav className="flex">
            {['Connect Account','Upload' , 'Spreadsheet View', 'Financial Summary'].map((tab) => (
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
          {activeTab === 'upload' && (
           <UploadReconciliation/>
          )}

          {activeTab === 'connect-account' && (
            <LinkAccount/>
          )}

          {activeTab === 'spreadsheet-view' && (
            <Spreadsheet/>
          )}

          {activeTab === 'financial-summary' && (
            <FinancialSummary/>
          )}
        </div>
      </div>
    </div>
  );
}