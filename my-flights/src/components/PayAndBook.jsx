// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import Navbar from './Navbar';
// import Bheader from './Bheader';

// const PayAndBook = () => {
//   const location = useLocation();
//   const { flight } = location.state || {};

//   return (
//     <div>
//       <Navbar />
//       <Bheader flightDetails={flight} />
//     </div>
//   );
// };

// export default PayAndBook;



import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Bheader from './Bheader';
import PassDetails from './PassDetails';

const PayAndBook = () => {
    const location = useLocation();
    const { flight } = location.state || {}; // Receiving props from BookingContainer

    return (
        <div>
            <Navbar />
            <Bheader flight={flight} />
            <PassDetails flight={flight} />
        </div>
    );
}

export default PayAndBook;
