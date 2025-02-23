import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Breadcrumb from '../components/MyBreadcrumb'; // Import the Breadcrumb Component
import { useDispatch, useSelector } from 'react-redux';
import { getUsersAction } from '../store/userSlice';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsersAction());
    }, []);
    // unsafe but idc
    const users = useSelector((state) => state.userSlice.users);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('All fields are required');
            return;
        }
        const user = users.find((user) => user.email === email && user.password === password)
        if(user) {
            localStorage.setItem("user", JSON.stringify(user));
            if(user.role == "admin") {
                navigate('/manage');
                setTimeout(() => window.location.reload(), 500);
            }else{
                navigate('/');
                setTimeout(() => window.location.reload(), 500);
            }
        } else {
            setError('Invalid email or password');
        }

        // Dummy authentication (Replace with actual API call)
        // if (email === 'fatma@example.com' && password === 'password123') {
        //     navigate('/');
        // } else {
        //     setError('Invalid email or password');
        // }

    };

    return (
        <div>
            {/* Breadcrumb Section */}
            <Breadcrumb title="Login" />

            {/* Login Card */}
            <Container className="d-flex justify-content-center align-items-center my-5">
                <Card style={{ width: '70vw', border: 'none' }} className="shadow-lg p-4 rounded-4">
                    <Card.Body>
                        <h3 className="text-center text-danger fw-bold mb-4">Welcome Back</h3>
                        <p className="text-muted text-center">Please login to continue</p>

                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form onSubmit={handleSubmit}>
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

                            <Button variant="danger" type="submit" className="w-100 fw-bold py-2">
                                Login
                            </Button>
                        </Form>

                        <div className="text-center mt-3">
                            <small className="text-muted">
                                Don't have an account? <a href="/register" className="text-danger fw-bold">Sign up</a>
                            </small>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}
