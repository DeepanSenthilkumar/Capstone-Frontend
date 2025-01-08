
// import React, { useState, useEffect } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
// import axios from 'axios';

// const BookedTickets = () => {
//     const { user: auth0User, isAuthenticated } = useAuth0();
//     const [bookings, setBookings] = useState([]);

//     useEffect(() => {
//         if (isAuthenticated && auth0User?.email) {
//             axios.get(`http://localhost:5000/api/bookings/${auth0User.email}`)
//                 .then(response => {
//                     console.log('Fetched bookings:', response.data);
//                     setBookings(response.data); 
//                 })
//                 .catch(error => {
//                     console.error('Error fetching bookings:', error);
//                 });
//         }
//     }, [auth0User?.email, isAuthenticated]);

//     return (
//         <div className="p-6 bg-white shadow-lg mt-5 rounded-lg">
//             <h2 className="text-2xl font-semibold mb-4">Booked Tickets</h2>

//             {bookings.length === 0 ? (
//                 <p className="text-gray-500">No bookings found.</p>
//             ) : (
//                 <div>
//                     {bookings.forEach((booking, index) => {
//                         console.log(`Booking #${index + 1}:`);
//                         booking.passengers.forEach((passenger, i) => {
//                             console.log(`Passenger ${i + 1}: ${passenger.fullName}, Ticket Number: ${passenger.ticketNumber}`);
//                         });
//                     })}
//                     {/* Render the passenger list */}
//                     {bookings.map((booking, index) => (
//                         <div key={booking._id} className="border-b py-4">
//                             <p className="font-semibold">Flight Number: {booking.flight.flightNumber}</p>
//                             <ul className="list-disc ml-6 mt-2">
//                                 {booking.passengers.map((passenger, i) => (
//                                     <li key={passenger._id} className="text-gray-700">
//                                         <p>Name: {passenger.fullName}</p>
//                                         <p>Ticket Number: {passenger.ticketNumber}</p>
//                                         <p>Age: {passenger.age}</p>
//                                         <p>Gender: {passenger.gender}</p>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BookedTickets;



import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Navbar from './Navbar';

const BookedTickets = () => {
    const { user: auth0User, isAuthenticated } = useAuth0();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (isAuthenticated && auth0User?.email) {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/bookings/${auth0User.email}`)
                .then(response => {
                    console.log('Fetched bookings:', response.data);
                    setBookings(response.data);
                })
                .catch(error => {
                    console.error('Error fetching bookings:', error);
                });
        }
    }, [auth0User?.email, isAuthenticated]);

    return (
        <div>
            <Navbar />
        <div className="p-6 bg-white shadow-lg mt-5 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Booked Tickets</h2>

            {bookings.length === 0 ? (
                <p className="text-gray-500 text-center">No bookings found.</p>
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">Flight Number</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Ticket Number</th>
                            <th className="border border-gray-300 px-4 py-2">Age</th>
                            <th className="border border-gray-300 px-4 py-2">Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) =>
                            booking.passengers.map((passenger) => (
                                <tr key={passenger._id} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {booking.flight.flightNumber}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {passenger.fullName}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {passenger.ticketNumber}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {passenger.age}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {passenger.gender}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
        </div>
    );
};

export default BookedTickets;
