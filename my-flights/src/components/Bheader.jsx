import React from 'react';

const Bheader = ({ flight }) => {
    console.log("Bheader received props:", flight); // Debugging console log

    if (!flight) {
        return <p>No flight details available</p>;
    }

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl text-orange-500 text-center font-semibold mb-4">Flight Details</h2>
            
            {/* Additional row for origin and destination */}
            <div className="grid grid-cols-2 gap-4 text-center mt-6">
                <div>
                    <p className="font-bold">Flight Number</p>
                    <p>{flight.fnumber}</p>
                </div>
                <div>
                    <p className="font-bold">Departure</p>
                    <p>{flight.departureDate + " " + flight.departureTime}</p>
                </div>
                <div>
                    <p className="font-bold">Origin</p>
                    <p>{flight.origin}</p>
                </div>
                <div>
                    <p className="font-bold">Destination</p>
                    <p>{flight.destination}</p>
                </div>

                <div>
                    <p className="font-bold">Class</p>
                    <p>{flight.flightClass}</p>
                </div>
                
                <div>
                    <p className="font-bold">Price Per Ticket</p>
                    <p>{flight.price} {flight.price.amount}</p>
                </div>
            </div>

            {/* <div className="grid grid-cols-1 gap-4 text-center">
                <div>
                    <p className="font-bold">Price Per Ticket</p>
                    <p>{flight.price} {flight.price.amount}</p>
                </div>
            </div> */}

        </div>
    );
}

export default Bheader;
