import React from 'react';
import { Container } from 'react-bootstrap';

const MyBreadcrumb = ({ title }) => {
    return (
        <div className="breadcrumb-area breadcrumb-padding-1 bg-light py-4 d-flex align-items-center">
            <Container className="text-center breadcrumb-text">
                <h2 className="fw-bold">{title}</h2>
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <a href="/" className="text-danger fw-bold">Home</a>
                    </li>
                    <li className="list-inline-item text-muted"> &gt; </li>
                    <li className="list-inline-item text-muted">{title}</li>
                </ul>
            </Container>
            <div className="breadcrumb-img-1 text-center">
                <img src="./src/img/breadcrumb-1.webp" alt="Breadcrumb-1" className="img-fluid" />
            </div>
            <div className="breadcrumb-img-2 text-center">
                <img src="./src/img/breadcrumb-2.webp" alt="Breadcrumb-2" className="img-fluid" />
            </div>
        </div>
    );
};

export default MyBreadcrumb;
