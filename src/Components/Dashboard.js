'use client'

import { useState } from 'react'
import { Upload, FileText, CreditCard, Users, ClipboardList, UploadIcon } from 'lucide-react'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('EOB')
  const [documents] = useState([
    { date: '2023-05-15', status: 'converted', pdfLink: '#' },
    { date: '2023-05-14', status: 'partially converted', pdfLink: '#' },
    { date: '2023-05-13', status: 'error', pdfLink: '#' },
  ])

  const [paymentRecords] = useState([
    { payorName: 'Blue Cross', clientName: 'John Doe', amount: '$500.00', claimDate: '2023-05-10', appointmentDate: '2023-05-05' },
    { payorName: 'Aetna', clientName: 'Jane Smith', amount: '$750.00', claimDate: '2023-05-11', appointmentDate: '2023-05-06' },
    { payorName: 'UnitedHealth', clientName: 'Bob Johnson', amount: '$1000.00', claimDate: '2023-05-12', appointmentDate: '2023-05-07' },
    { payorName: 'Cigna', clientName: 'Alice Brown', amount: '$250.00', claimDate: '2023-05-13', appointmentDate: '2023-05-08' },
    { payorName: 'Medicare', clientName: 'Charlie Davis', amount: '$1500.00', claimDate: '2023-05-14', appointmentDate: '2023-05-09' },
  ])

  const [appointments] = useState([
    { date: '2023-05-20', clientName: 'John Doe', insuranceType: 'Medicare', status: 'Scheduled' },
    { date: '2023-05-21', clientName: 'Jane Smith', insuranceType: 'Blue Cross', status: 'Confirmed' },
    { date: '2023-05-22', clientName: 'Bob Johnson', insuranceType: 'Aetna', status: 'Completed' },
    { date: '2023-05-23', clientName: 'Alice Brown', insuranceType: 'Cigna', status: 'Cancelled' },
    { date: '2023-05-24', clientName: 'Charlie Davis', insuranceType: 'UnitedHealth', status: 'Rescheduled' },
  ])

  const [claims] = useState([
    { date: '2023-05-15', clientName: 'John Doe', status: 'Submitted', amount: '$500.00', payor: 'Medicare' },
    { date: '2023-05-16', clientName: 'Jane Smith', status: 'In Process', amount: '$750.00', payor: 'Blue Cross' },
    { date: '2023-05-17', clientName: 'Bob Johnson', status: 'Denied', amount: '$1000.00', payor: 'Aetna' },
    { date: '2023-05-18', clientName: 'Alice Brown', status: 'Paid', amount: '$250.00', payor: 'Cigna' },
    { date: '2023-05-19', clientName: 'Charlie Davis', status: 'Appeal', amount: '$1500.00', payor: 'UnitedHealth' },
  ])

  const getStatusColor = (status) => {
    const statusColors= {
      'converted': 'bg-green-100 text-green-800',
      'partially converted': 'bg-yellow-100 text-yellow-800',
      'error': 'bg-red-100 text-red-800',
      'Scheduled': 'bg-blue-100 text-blue-800',
      'Confirmed': 'bg-green-100 text-green-800',
      'Completed': 'bg-purple-100 text-purple-800',
      'Cancelled': 'bg-red-100 text-red-800',
      'Rescheduled': 'bg-yellow-100 text-yellow-800',
      'Submitted': 'bg-blue-100 text-blue-800',
      'In Process': 'bg-yellow-100 text-yellow-800',
      'Denied': 'bg-red-100 text-red-800',
      'Paid': 'bg-green-100 text-green-800',
      'Appeal': 'bg-purple-100 text-purple-800',
    }
    return statusColors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="text-xl font-bold mb-8">OmniPay</div>
        <nav className="space-y-2">
          <button className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FileText className="w-5 h-5" />
            <span>Eligibility Verification</span>
          </button>
          <button className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <CreditCard className="w-5 h-5" />
            <span>Payment Posting</span>
          </button>
          <button className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <Users className="w-5 h-5" />
            <span>Payment Collection</span>
          </button>
          <button className="flex items-center space-x-2 w-full px-4 py-2 bg-gray-100 text-gray-900 rounded-lg">
            <ClipboardList className="w-5 h-5" />
            <span>Gopay</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Gopay Dashboard</h1>
          <p className="text-gray-600 mb-6">Manage your EOB, Appointments, Claims, and Workbook</p>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {['EOB', 'Appointments', 'Claims', 'Workbook'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 relative ${
                    activeTab === tab
                      ? 'text-gray-900 border-b-2 border-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'EOB' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold mb-4">Upload EOBs</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <div className="flex justify-center mb-4">
                    <UploadIcon className="w-12 h-12 text-gray-400" />
                  </div>
                  <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PDF, PNG, JPG or GIF (MAX. 10MB)</p>
                </div>
                <button className="w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800">
                  Upload EOBs
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold mb-4">EOB Documents</h2>
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-200">
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">PDF Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3">{doc.date}</td>
                        <td className="py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                            {doc.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <a href={doc.pdfLink} className="text-blue-600 hover:underline">View PDF</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold mb-4">Detected Payment Records</h2>
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-200">
                      <th className="pb-3">Payor Name</th>
                      <th className="pb-3">Client Name</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Claim Date</th>
                      <th className="pb-3">Appointment Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentRecords.map((record, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3">{record.payorName}</td>
                        <td className="py-3">{record.clientName}</td>
                        <td className="py-3">{record.amount}</td>
                        <td className="py-3">{record.claimDate}</td>
                        <td className="py-3">{record.appointmentDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800">
                  Manually add converted payment records
                </button>
              </div>
            </div>
          )}

          {activeTab === 'Appointments' && (
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold mb-4">Appointments</h2>
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-200">
                    <th className="pb-3">Appointment Date</th>
                    <th className="pb-3">Client Name</th>
                    <th className="pb-3">Insurance Type</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3">{appointment.date}</td>
                      <td className="py-3">{appointment.clientName}</td>
                      <td className="py-3">{appointment.insuranceType}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'Claims' && (
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold mb-4">Claims</h2>
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-200">
                    <th className="pb-3">Appointment Date</th>
                    <th className="pb-3">Client Name</th>
                    <th className="pb-3">Claim Status</th>
                    <th className="pb-3">Claim Amount</th>
                    <th className="pb-3">Payor</th>
                  </tr>
                </thead>
                <tbody>
                  {claims.map((claim, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3">{claim.date}</td>
                      <td className="py-3">{claim.clientName}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(claim.status)}`}>
                          {claim.status}
                        </span>
                      </td>
                      <td className="py-3">{claim.amount}</td>
                      <td className="py-3">{claim.payor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'Workbook' && (
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold mb-4">Workbook</h2>
              <p className="text-gray-600">Workbook content goes here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}