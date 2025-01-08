import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom'; // Import useHistory hook for navigation

const PassDetails = ({ flight, user }) => {
    const { user: auth0User, isAuthenticated } = useAuth0();  // Using the useAuth0 hook to get user data
    const [passengers, setPassengers] = useState([{ fullName: '', gender: '', age: '' }]);
    const [showPayment, setShowPayment] = useState(false);
    const [validPassengerCount, setValidPassengerCount] = useState(0);
    const [ticketNumber, setTicketNumber] = useState('');
    // const history = useHistory(); // Initialize history for navigation
    const navigate = useNavigate();

    // Generate ticket number logic
    useEffect(() => {
        if (isAuthenticated && flight && passengers.length > 0) {
            console.log('Flight Data:', flight);
            console.log('Passengers:', passengers);
            const ticketBase = `${flight.fnumber}-${flight.departureDate.split('T')[0]}-${flight.flightClass}`;
            const newTicketNumber = `${ticketBase}-${validPassengerCount + 1}`;
            setTicketNumber(newTicketNumber);  // Set ticket number dynamically for each passenger
        }
    }, [flight, passengers, validPassengerCount, isAuthenticated]);

    // Add a new passenger field set
    const handleAddPassenger = () => {
        setPassengers([...passengers, { fullName: '', gender: '', age: '' }]);
    };

    // Handle input changes
    const handleInputChange = (index, field, value) => {
        const updatedPassengers = [...passengers];
        updatedPassengers[index][field] = value;
        setPassengers(updatedPassengers);
    };

    // Validate and calculate payment
    const handleDone = () => {
        const filledPassengers = passengers.filter(p => p.fullName.trim() !== '');
        setValidPassengerCount(filledPassengers.length);
        setShowPayment(true);
    };

    const handleCheckout = () => {
        console.log('Booking data:', {
            flight: {
                flightNumber: flight.fnumber,
            },
            passengers,
            email: auth0User?.email,  // Auth0 email (with optional chaining)
            ticketNumber  // Include dynamically generated ticket number
        });

        const bookingData = {
            flight: {
                flightNumber: flight.fnumber,
            },
            passengers,
            email: auth0User.email,  // Auth0 email
            // ticketNumber  // Include dynamically generated ticket number
        };

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`, bookingData)
            .then(response => {
                console.log('Booking confirmed:', response.data);
                // Clear the form and navigate to the home page on success
                // setPassengers([{ fullName: '', gender: '', age: '' }]);
                // setValidPassengerCount(0);
                // setShowPayment(false);
                // history.push('/');  // Navigate to home page
                alert('Ticket Booked successfully!');
                navigate('/');
            })
            .catch(error => {
                console.error('Error creating booking:', error);
            });
    };

    return (
        <div className="p-6 bg-white shadow-lg mt-5 rounded-lg">
            <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col justify-between">
                    <h2 className="text-2xl font-semibold">Passenger Details</h2>
                    <p className="text-gray-500">Enter details carefully for booking confirmation.</p>
                    <button 
                        onClick={handleDone}
                        className="mt-10 bg-blue-600 text-white text-sm font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition w-max"
                    >
                        Done
                    </button>
                </div>

                <div>
                    {passengers.map((passenger, index) => (
                        <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={passenger.fullName}
                                    onChange={(e) => handleInputChange(index, 'fullName', e.target.value)}
                                    placeholder="Enter full name"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                                <select
                                    value={passenger.gender}
                                    onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                                <input
                                    type="number"
                                    value={passenger.age}
                                    onChange={(e) => handleInputChange(index, 'age', e.target.value)}
                                    placeholder="Enter age"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={handleAddPassenger}
                        className="mt-5 bg-gradient-to-b from-blue-700 to-blue-500 text-white text-sm font-semibold py-2 px-4 rounded-full hover:scale-105 transition"
                    >
                        + Add Passenger
                    </button>
                </div>
            </div>

            {showPayment && (
                <div className="mt-10 grid grid-cols-2 gap-8 border-t max-h-screen pt-6">
                    <div>
                        <h3 className="text-2xl font-semibold">Payment Details</h3>
                        <p className="text-gray-500">This is not a real payment gateway integrated with Stripe or PayPal.</p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-semibold">
                            Total Amount: {validPassengerCount * flight.price} {flight.price.currency}
                        </p>
                    </div>
                </div>
            )}

            {showPayment && validPassengerCount === 0 && (
                <p className="text-red-500 font-semibold mt-4 text-center">
                    Please fill in at least one valid passenger to proceed.
                </p>
            )}

            {/* Payment Form Section Styled Based on Image */}
            {showPayment && validPassengerCount > 0 && (
                <div className="mt-10 p-6 border max-w-3xl mx-auto border-gray-300 rounded-lg bg-gray-100 space-y-4">
                    {/* Cardholder Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Card holder full name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full p-3 border border-gray-300 rounded-lg mt-1"
                        />
                    </div>

                    {/* Card Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Card Number</label>
                        <input
                            type="text"
                            placeholder="0000 0000 0000 0000"
                            className="w-full p-3 border border-gray-300 rounded-lg mt-1"
                        />
                    </div>

                    {/* Expiry Date and CVV */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                            <input
                                type="text"
                                placeholder="01/23"
                                className="w-full p-3 border border-gray-300 rounded-lg mt-1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">CVV</label>
                            <input
                                type="text"
                                placeholder="CVV"
                                className="w-full p-3 border border-gray-300 rounded-lg mt-1"
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="w-full mt-6 bg-gradient-to-b from-black to-gray-800 text-white font-semibold py-3 rounded-lg hover:scale-105 transition"
                    >
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default PassDetails;



