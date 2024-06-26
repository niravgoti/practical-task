import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './AddressBook.css';

const AddressBook = () => {
  const [addresses, setAddresses] = useState(JSON.parse(localStorage.getItem('addresses')) || []);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedAddresses = JSON.parse(localStorage.getItem('addresses')) || [];
    setAddresses(storedAddresses);
  }, []);

  const handleDelete = (id) => {
    const updatedAddresses = addresses.filter((address) => address.id !== id);
    setAddresses(updatedAddresses);
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
  };

  const filteredAddresses = addresses.filter((address) =>
    `${address.firstName} ${address.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="addressbook-container">
      <h2>Address Book</h2>
      <input
        type="text"
        placeholder="Search address here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="address-cards">
        {filteredAddresses.map((address) => (
          <div key={address.id} className="address-card">
            <div className="card-header">
              <p><strong>Address ID:</strong> {address.id}</p>
              <Link to={`/edit-address/${address.id}`} className="edit-btn"><FaEdit /></Link>
            </div>
            <p><strong>First name:</strong> {address.firstName}</p>
            <p><strong>Last name:</strong> {address.lastName}</p>
            <p><strong>Address:</strong> {address.address}</p>
            <p><strong>City:</strong> {address.city}</p>
            <p><strong>State:</strong> {address.state}</p>
            <p><strong>Country:</strong> {address.country}</p>
            <div className="card-footer">
              <p><strong>Telephone:</strong> {address.telephone}</p>
              <button onClick={() => handleDelete(address.id)} className="delete-btn"><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
      <Link to="/add-address" className="add-address-btn">Add new Address</Link>
    </div>
  );
};

export default AddressBook;