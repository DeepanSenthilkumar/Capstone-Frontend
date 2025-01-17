
import React, { useState } from 'react';
import { css } from '@emotion/react';
import Loader from './loader';
import { useNavigate } from 'react-router-dom';
import { fetchFlights } from '../services/flightService';
import { useAuth0 } from "@auth0/auth0-react";

function BookingContainer() {
  const [selectedTab, setSelectedTab] = useState('economy'); // Default to Economy Class
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [flightsPerPage] = useState(10);
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  // Handle tab click for class selection
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    console.log('Class selected:', tab);
  };

  // Fetch flights from backend
  const fetchFlightData = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Request:', { origin, destination, flightClass: selectedTab, departureDate });

    try {
      const data = await fetchFlights(origin, destination, selectedTab);
      const flightsWithDate = data.map(flight => ({
        ...flight,
        departureDate,
        flightClass: selectedTab, // Set the departure date from the input field
      }));
      setFlights(flightsWithDate);
    } catch (error) {
      console.error('Error fetching flights:', error);
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = flights.slice(indexOfFirstFlight, indexOfLastFlight);

  // Navigate to payment
  // const navigateToPayment = (flight) => {
  //   navigate('/payandbook', { state: { flight: flight } });
  //   console.log(flight)
  // };

  const handleBooking = () => {
    if (isAuthenticated) {
        navigateToPayment = (flight) => {
          navigate('/payandbook', { state: { flight: flight } });
          console.log(flight)
        };  
    } else {
        loginWithRedirect();  
    }
};

  // Pagination function
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <section className="section__container booking__container">
        <div className="booking__nav">
          <span
            className={selectedTab === 'economy' ? 'active-tab' : 'tab'}
            onClick={() => handleTabClick('economy')}
          >
            Economy Class
          </span>
          <span
            className={selectedTab === 'business' ? 'active-tab' : 'tab'}
            onClick={() => handleTabClick('business')}
          >
            Business Class
          </span>
          <span
            className={selectedTab === 'firstClass' ? 'active-tab' : 'tab'}
            onClick={() => handleTabClick('firstClass')}
          >
            First Class
          </span>
        </div>
        <form onSubmit={fetchFlightData}>
          {/* <div className="form__group">
            <span><i className="ri-map-pin-line"></i></span>
            <div className="input__content">
              <div className="input__group">
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                />
                <label>Origin</label>
              </div>
              <p>Where are you boarding?</p>
            </div>
          </div>

          <div className="form__group">
            <span><i className="ri-calendar-line"></i></span>
            <div className="input__content">
              <div className="input__group">
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
                <label>Destination</label>
              </div>
              <p>Where are you going?</p>
            </div>
          </div> */}
             
             <div className="form__group">
    <span><i className="ri-map-pin-line"></i></span>
    <div className="input__content">
        <div className="input__group">
            <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="input__select"
            >
                <option value="" disabled>Select Origin</option>
                {/* <option value="Chennai">Chennai</option> */}
                <option value="Chennai">Chennai</option>
                {/* <option value="Los Angeles">Los Angeles</option>
                <option value="Chicago">Chicago</option>
                <option value="Houston">Houston</option>
                <option value="Miami">Miami</option> */}
            </select>
            {/* <label>Origin</label> */}
        </div>
        <p>Where are you boarding?</p>
    </div>
</div>

<div className="form__group">
    <span><i className="ri-calendar-line"></i></span>
    <div className="input__content">
        <div className="input__group">
            <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="input__select"
            >
                <option value="" disabled>Select Destination</option>
                <option value="Thanjavur">Thanjavur</option>
                <option value="Goa">Goa</option>
                <option value="Mysore">Mysore</option>
                <option value="Hyderabad">Hyderabad</option>
                {/* <option value="Atlanta">Atlanta</option> */}
            </select>
            {/* <label>Destination</label> */}
        </div>
        <p>Where are you going?</p>
    </div>
</div>


          <div className="form__group">
            <span><i className="ri-calendar-line"></i></span>
            <div className="input__content">
              <div className="input__group">
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                />
                <label>Departure</label>
              </div>
              <p>Add date</p>
            </div>
          </div>

          <button className="btn" type="submit">
            <i className="ri-search-line"></i>Search
          </button>
        </form>
      </section>

      <div className="flight-list">
        {loading ? (
          <div className="loading-spinner">
            <Loader />
          </div>
        ) : currentFlights.length === 0 ? (
          <p>No flights found for the selected criteria.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentFlights.map((flight) => (
              <div
                key={flight.id} // Added unique key for each flight card
                className="border rounded-lg shadow p-4 bg-white space-y-2"
              >
                <div className="text-lg font-semibold text-center">
                  {flight.origin} ➡️ {flight.destination}
                </div>
                <div className="text-sm text-gray-500">Depature: {flight.departureDate + " " + flight.departureTime}</div>
                <div className="text-sm text-gray-500">{`Flight Name: ${flight.fname}  Number: ${flight.fnumber}`}</div>
                <div className="text-sm text-gray-500">Duration: {flight.journeyTime}</div>
                <div className="text-sm text-gray-500 hidden">class: {flight.flightClass}</div>
                <div className="text-sm font-medium">
                  Price: {flight.price} {flight.price.currency}
                </div>
                <button
                  // onClick={() => navigateToPayment(flight)}
                  onClick={handleBooking}
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  Book
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center mt-6">
        {Array.from({ length: Math.ceil(flights.length / flightsPerPage) }, (_, index) => (
          <button
            key={index} // Pagination buttons also have unique keys
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 mx-1 rounded-md ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}

const override = css`
  display: block;
  margin: 0 auto;
`;

export default BookingContainer;
