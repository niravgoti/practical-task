import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './AddressForm.css';

const AddressForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    id: Date.now(),
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    country: '',
    telephone: '',
  });

  useEffect(() => {
    if (id) {
      const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
      const addressToEdit = addresses.find((addr) => addr.id === parseInt(id));
      if (addressToEdit) {
        setInitialValues(addressToEdit);
      }
    }
  }, [id]);

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    telephone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Telephone must be a 10-digit number')
      .required('Telephone is required'),
  });

  const handleSubmit = (values) => {
    const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    if (id) {
      const updatedAddresses = addresses.map((addr) =>
        addr.id === parseInt(id) ? values : addr
      );
      localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
    } else {
      addresses.push(values);
      localStorage.setItem('addresses', JSON.stringify(addresses));
    }
    navigate('/addressbook');
  };

  return (
    <div className="addressform-container">
      <h2>{id ? 'Edit Address' : 'Add Address'}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {() => (
          <Form className="addressform-form">
            <label>Address ID: {initialValues.id}</label>
            <div className="form-row">
              <div className="form-group">
                <label>First name</label>
                <Field type="text" name="firstName" />
                <ErrorMessage name="firstName" component="div" className="error" />
              </div>
              <div className="form-group">
                <label>Last name</label>
                <Field type="text" name="lastName" />
                <ErrorMessage name="lastName" component="div" className="error" />
              </div>
            </div>
            <label>Address</label>
            <Field type="text" name="address" />
            <ErrorMessage name="address" component="div" className="error" />

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <Field type="text" name="city" />
                <ErrorMessage name="city" component="div" className="error" />
              </div>
              <div className="form-group">
                <label>State</label>
                <Field type="text" name="state" />
                <ErrorMessage name="state" component="div" className="error" />
              </div>
            </div>

            <label>Country</label>
            <Field type="text" name="country" />
            <ErrorMessage name="country" component="div" className="error" />

            <label>Telephone</label>
            <Field type="number" name="telephone" />
            <ErrorMessage name="telephone" component="div" className="error" />

            <button type="submit">{id ? 'Save Address' : 'Add Address'}</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddressForm;