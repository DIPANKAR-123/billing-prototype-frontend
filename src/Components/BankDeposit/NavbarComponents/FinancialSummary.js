import React from 'react'

const FinancialSummary = () => {
  return (
    <div>
    <h2 className="text-xl font-semibold text-gray-800 mb-2">Financial Summary</h2>
    <p className="text-gray-600 mb-4">Overview of your financial data and reconciliation status</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-blue-100 p-4 rounded-md">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Total Deposits</h3>
        <p className="text-2xl font-bold text-blue-900">$12,700.00</p>
      </div>
      <div className="bg-green-100 p-4 rounded-md">
        <h3 className="text-lg font-semibold text-green-800 mb-2">Reconciled</h3>
        <p className="text-2xl font-bold text-green-900">$9,200.00</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded-md">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Pending</h3>
        <p className="text-2xl font-bold text-yellow-900">$3,500.00</p>
      </div>
    </div>
  </div>
  )
}

export default FinancialSummary