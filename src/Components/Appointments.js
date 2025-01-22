import React,{useState,useEffect} from 'react'
import FileUpload from './FileUpload';

const Appointments = ({appointments}) => {
    console.log(appointments,"here")
    // const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    //   useEffect(() => {
    //     // Replace the URL with your API endpoint
    //     const fetchAppointments = async () => {
    //       try {
    //         const response = await fetch('http://localhost:4000/ai/generate/appointment-records');
    //         if (!response.ok) {
    //           throw new Error('Failed to fetch appointments');
    //         }
    //         const data = await response.json();
    //         setAppointments(data);
    //       } catch (error) {
    //         setError(error.message);
    //       } finally {
    //         setLoading(false);
    //       }
    //     };
    
    //     fetchAppointments();
    //   }, []);

      const parseCustomDateString = (dateString) => {
        // Match the numbers inside the Date(...) string
        const match = dateString.match(/Date\((\d+),(\d+),(\d+),(\d+),(\d+),(\d+)\)/);
        if (match) {
          const [_, year, month, day, hour, minute, second] = match.map(Number); // Convert all to numbers
          return new Date(year, month, day, hour, minute, second); // Create a valid Date object
        }
        return null; // Return null if the input doesn't match the expected format
      };
      
      const formatDate = (dateString) => {
        const date = parseCustomDateString(dateString); // Parse the custom format
        if (!date || isNaN(date)) {
          return 'Invalid Date'; // Handle invalid date
        }
        return (
          date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }) +
          ' ' +
          date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })
        );
      };
      
    
  
    
    
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <FileUpload/>
    <h2 className="text-lg font-semibold mb-4">Appointments</h2>
    <table className="w-full">
      <thead>
        <tr className="text-left border-b border-gray-200">
          <th className="pb-3">Appointment Date</th>
          <th className="pb-3">Client Name</th>
          <th className="pb-3">Clinician</th>
          <th className="pb-3">Billing Code</th>
          {/* <th className="pb-3">Rate per Unit</th> */}
          {/* <th className="pb-3">Units</th> */}
          <th className="pb-3">Total Fee</th>
          {/* <th className="pb-3">Client Payment Status</th>
          <th className="pb-3">Charge</th>
          <th className="pb-3">Uninvoiced</th>
          <th className="pb-3">Paid</th>
          <th className="pb-3">Unpaid</th> */}
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment, index) => (
          <tr key={index} className="border-b border-gray-100">
            <td className="py-3">{(appointment.appointmentDate)}</td>
            <td className="py-3">{appointment.client}</td>
            <td className="py-3">{appointment.clinician}</td>
            <td className="py-3">{appointment.billingCode}</td>
            {/* <td className="py-3">{appointment['Rate per Unit']}</td> */}
            {/* <td className="py-3">{appointment.Units}</td> */}
            <td className="py-3">{appointment.amount}</td>
            {/* <td className="py-3">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                  appointment['Client Payment Status']
                )}`}
              >
                {appointment['Client Payment Status']}
              </span>
            </td>
            <td className="py-3">{appointment.Charge}</td>
            <td className="py-3">{appointment.Uninvoiced}</td>
            <td className="py-3">{appointment.Paid}</td>
            <td className="py-3">{appointment.Unpaid}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};


export default Appointments