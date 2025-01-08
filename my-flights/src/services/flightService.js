const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/flights`;

export const fetchFlights = async (origin, destination, flightClass) => {
  const response = await fetch(
    `${BASE_URL}/search?origin=${origin}&destination=${destination}&flightClass=${flightClass}`
  );
  return response.json();
};



// import React, { useState } from 'react';
// import { fetchFlights } from '../services/flightService';
// import { useNavigate } from 'react-router-dom';

// function BookingContainer() {
//   const [selectedTab, setSelectedTab] = useState('economy');
//   const [origin, setOrigin] = useState('');
//   const [destination, setDestination] = useState('');
//   const [flights, setFlights] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleTabClick = (tab) => {
//     setSelectedTab(tab);
//     console.log('Class selected:', tab);
//   };

//   const fetchFlightData = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     console.log('Request:', { origin, destination, flightClass: selectedTab });

//     try {
//       const data = await fetchFlights(origin, destination, selectedTab);
//       setFlights(data);
//     } catch (error) {
//       console.error('Error fetching flights:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div>
//         {/* Tabs for class selection */}
//         <button onClick={() => handleTabClick('economy')}>Economy</button>
//         <button onClick={() => handleTabClick('business')}>Business</button>
//         <button onClick={() => handleTabClick('firstClass')}>First Class</button>
//       </div>

//       {/* Flight search form */}
//       <form onSubmit={fetchFlightData}>
//         <input
//           type="text"
//           placeholder="Origin"
//           value={origin}
//           onChange={(e) => setOrigin(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Destination"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//         />
//         <button type="submit">Search Flights</button>
//       </form>

//       {/* Flight results */}
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         flights.map((flight) => (
//           <div key={flight.id}>
//             <p>{flight.origin} to {flight.destination}</p>
//             <p>Price: {flight.price}</p>
//           </div>
//         ))
//       )}
//     </>
//   );
// }

// export default BookingContainer;
