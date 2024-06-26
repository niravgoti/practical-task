import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import AddressBook from './components/AddressBook';
import AddressForm from './components/AddressForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('email') && localStorage.getItem('password');
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/addressbook" element={<PrivateRoute component={AddressBook} />} />
          <Route path="/add-address" element={<PrivateRoute component={AddressForm} />} />
          <Route path="/edit-address/:id" element={<PrivateRoute component={AddressForm} />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;