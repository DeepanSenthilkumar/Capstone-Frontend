import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import logo from "../assets/logo.png"
import axios from 'axios';

const Testimonial = () => {
    const { user, isAuthenticated } = useAuth0();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
          if (isAuthenticated && user?.email) {
            try {
              const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/${user.email}`);
              setUserData(response.data);
            //   console.log(Data)
            } catch (error) {
              console.error('Error fetching user data:', error);
              setUserData(null); // Display default testimonial if no user data is found
            }
          }
        };
        fetchUserData();
      }, [isAuthenticated, user]);

    return (
        // <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#1E1E2F] to-[#3A3A5E] text-white">
        <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8 min-h-screen flex flex-col justify-center items-center">
        {/* Gradient Background */}
        <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
            <div
                className="relative w-full h-full bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            />
        </div>
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="max-w-2xl text-center p-8 bg-opacity-50 rounded-lg"
            >
                <div className="flex items-center justify-center mb-6">
                    <img src={logo} alt="Workcation Logo" className="w-10 h-10 mr-2" />
                    <h1 className="text-2xl font-bold">FLIGHTS.IO</h1>
                </div>
                {userData ? (
          <>
            <p className="text-lg font-bold italic mb-6">Welcome {userData.firstName}!</p>
            <p className="text-lg font-bold italic mb-6">
              Plan your trip to Explore the South India Culture and Historic Temples.
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-8 px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out"
            >
              Go to Home Page
            </button>
          </>
        ) : (
          <>
            <p className="text-lg font-bold italic mb-6">
              Plan your trip to Explore the South India Culture and Historic Temples.
            </p>
            <p className="font-bold text-lg">Deepan</p>
            <p className="text-sm">Capstone project</p>
            <button
              onClick={() => navigate('/userform')}
              className="mt-8 px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out"
            >
              Get Started
            </button>
          </>
        )}
            </motion.div>
        </div>
        
    );
};

export default Testimonial;
