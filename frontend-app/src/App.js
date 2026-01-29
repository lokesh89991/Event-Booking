import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import EventList from './pages/EventList';
import EventDetails from './pages/EventDetails';
import BookingSuccess from './pages/BookingSuccess';
import CancelBooking from './pages/CancelBooking';

export default function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/booking/success/:id" element={<BookingSuccess />} />
          <Route path="/booking/cancel/:id" element={<CancelBooking />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
