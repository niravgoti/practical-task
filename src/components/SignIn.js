import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './SignIn.css';

const SignIn = () => {
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Please enter a valid email address.')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters long.')
            .required('Password is required'),
    });

    const handleSubmit = (values) => {
        localStorage.setItem('email', values.email);
        localStorage.setItem('password', values.password);
        navigate('/addressbook');
    };

    const handleEmailChange = (e, setFieldValue) => {
        const { value } = e.target;
        setFieldValue('email', value);
    };

    const handlePasswordChange = (e, setFieldValue) => {
        const { value } = e.target;
        setFieldValue('password', value);
    };

    return (
        <div className="signin-container">
            <h2>Customer Login Page</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                    <Form className="signin-form">
                        <label>Email</label>
                        <Field
                            type="email"
                            name="email"
                            onChange={(e) => handleEmailChange(e, setFieldValue)}
                        />
                        <ErrorMessage name="email" component="p" className="error" />

                        <label>Password</label>
                        <Field
                            type="password"
                            name="password"
                            onChange={(e) => handlePasswordChange(e, setFieldValue)}
                        />
                        <ErrorMessage name="password" component="p" className="error" />

                        <button type="submit">Sign In</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SignIn;