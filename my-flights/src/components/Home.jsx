import React from 'react'
import Header from './Header'
import Plan from './Plan'
import Memories from './Memories'
import FeaturedTours from './FeaturedTours'
import Footer from './Footer'
import SearchFlights from './BookingContainer'
import NavBar from './Navbar'

function Home() {
  return (
    <>
      {/* No need to pass logoutUser as a prop anymore */}
      <NavBar />
      <Header />
      <SearchFlights />
      <Plan />
      <Memories />
      <FeaturedTours />
      <Footer />
    </>
  )
}

export default Home
