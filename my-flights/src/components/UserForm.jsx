import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const UserForm = () => {
    const navigate = useNavigate();
    const { user } = useAuth0();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        // company: '',
        email: '',
        mobileNumber: '',
        // message: '',
    });
    // const URL = import.meta.env.VITE_BACKEND_URL

    const [agreed, setAgreed] = useState(false);  
    
    useEffect(() => {
        if (user?.email) {
          setFormData((prev) => ({ ...prev, email: user.email })); // Pre-fill email field from Auth0
        }
      }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!agreed) {
            alert('You must agree to the terms to submit the form.');
            return;
        }
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users`, formData);
            alert('User details submitted successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit. Please try again.');
        }
    };

    return (
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

            {/* Form Content */}
            <form
                onSubmit={handleSubmit}
                className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg"
            >
                <h2 className="text-4xl font-semibold text-gray-900 text-center mb-6">User Form</h2>

                {/* Form Fields */}
                <div className="grid grid-cols-1 gap-4">
                    <input
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="p-3 border rounded-md"
                    />
                    <input
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="p-3 border rounded-md"
                    />
                    {/* <input
                        name="company"
                        type="text"
                        placeholder="Company"
                        value={formData.company}
                        onChange={handleChange}
                        className="p-3 border rounded-md"
                    /> */}
                    <input
                        name="email"
                        type="email"
                        // placeholder="Email"
                        value={formData.email}
                        // onChange={handleChange}
                        readOnly
                        // required
                        className="p-3 border rounded-md"
                    />
                    <input
                        name="mobileNumber"
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        className="p-3 border rounded-md"
                    />
                    {/* <textarea
                        name="message"
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleChange}
                        className="p-3 border rounded-md"
                    /> */}
                    <div className="mt-6 flex items-center gap-x-4">
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={() => setAgreed(!agreed)}
                            className="h-5 w-5 text-indigo-600"
                        />
                        <span className="text-sm text-gray-600">
                            I agree to the terms and privacy policy.
                        </span>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="mt-6 w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UserForm;
