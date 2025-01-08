import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Testimonial from './components/Testimonial';
import UserForm from './components/UserForm';
import PayAndBook from './components/PayAndBook';
import BookedTickets from './components/BookedTickets';

function App() {
  return (

      
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/testi" element={<Testimonial />} />
          <Route path="/userform" element={<UserForm />} />
          <Route path="/payandbook" element={<PayAndBook />} />
          <Route path="/Bticket" element={<BookedTickets />} />
        </Routes>
      

  )
}

export default App