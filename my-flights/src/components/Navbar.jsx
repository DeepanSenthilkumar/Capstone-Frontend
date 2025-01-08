
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"; // Correct Auth0 import

import "../styles/Navbar.css";
import "../index.css";

export default function NavBar() {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0(); // Using Auth0 directly here
    const navigate = useNavigate();

    // Function to scroll to the existing FeaturedTours section
    const scrollToFeaturedTours = () => {
        const section = document.getElementById("tours"); // Changed ID for clarity
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav className="navbar max-w-screen-xl bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link
                    className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white mr-96"
                    to="/"
                >
                    Flights.io
                </Link>
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="navbar-nav flex flex-col md:flex-row md:space-x-8">
                        {/* Auth0 logic applied here correctly */}
                        {!isAuthenticated ? (
                            <>
                                <li>
                                    <button className="nav-link" onClick={() => loginWithRedirect()}>
                                        Register
                                    </button>
                                </li>
                                <li>
                                    <button className="nav-link" onClick={() => loginWithRedirect()}>
                                        Login
                                    </button>
                                </li>
                            </>
                        ) : null}

                        <li>
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>

                        {isAuthenticated && (
                            <li>
                                <Link className="nav-link" to="/Bticket">
                                    Booked Tickets
                                </Link>
                            </li>
                        )}

                        <li>
                            <button className="nav-link" onClick={scrollToFeaturedTours}>
                                Tours
                            </button>
                        </li>

                        {isAuthenticated && (
                            <li>
                                <button
                                    className="nav-link"
                                    onClick={() => logout({ returnTo: window.location.origin })}
                                    style={{ cursor: "pointer" }}
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
