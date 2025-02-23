import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import Breadcrumb from '../components/MyBreadcrumb'; // Import the Breadcrumb Component
import { useDispatch, useSelector } from 'react-redux';
import { addUserAction } from '../store/userSlice';

export function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const users = useSelector((state) => state.userSlice.users);
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            setError('All fields are required');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (users.some((user) => user.email === email)) {
            setError('Email already exists');
            return;
        }

        dispatch(addUserAction({ name, email, password, role: 'user', deleted: false }));
        localStorage.setItem('user', JSON.stringify({ name, email, password, role: 'user', deleted: false }));
        navigate('/'); // Redirect after successful registration
        setTimeout(() => window.location.reload(), 500);
    };

    return (
        <div>
            {/* Breadcrumb Section */}
            <Breadcrumb title="Register" />

            {/* Register Card */}
            <Container className="d-flex justify-content-center align-items-center my-5">
                <Card style={{ width: '70vw', border: 'none' }} className="shadow-lg p-4 rounded-4">
                    <Card.Body>
                        <h3 className="text-center text-danger fw-bold mb-4">Create an Account</h3>
                        <p className="text-muted text-center">Please register to get started</p>

                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            {/* Name Field */}
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">Full Name</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text bg-danger text-white">
                                        <FaUser />
                                    </span>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="border-danger"
                                    />
                                </div>
                            </Form.Group>

                            {/* Email Field */}
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">Email Address</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text bg-danger text-white">
                                        <FaEnvelope />
                                    </span>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="border-danger"
                                    />
                                </div>
                            </Form.Group>

                            {/* Password Field */}
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">Password</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text bg-danger text-white">
                                        <FaLock />
                                    </span>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="border-danger"
                                    />
                                </div>
                            </Form.Group>

                            {/* Confirm Password Field */}
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">Confirm Password</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text bg-danger text-white">
                                        <FaLock />
                                    </span>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="border-danger"
                                    />
                                </div>
                            </Form.Group>

                            {/* Register Button */}
                            <Button variant="danger" type="submit" className="w-100 fw-bold py-2">
                                Register
                            </Button>
                        </Form>

                        <div className="text-center mt-3">
                            <small className="text-muted">
                                Already have an account? <a href="/login" className="text-danger fw-bold">Login</a>
                            </small>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}
