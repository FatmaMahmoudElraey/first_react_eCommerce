import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Card } from 'react-bootstrap';
import { addNewProduct, editProduct, getProductById } from '../api/productapi';
import { useNavigate, useParams } from 'react-router-dom';

export function ProductForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({ name: "", price: "", quantity: "" });

    useEffect(() => {
        if (id !== "0") {
            getProductById(id)
                .then((response) => setFormData(response.data))
                .catch((error) => console.log(error));
        }
    }, [id]);

    const inputHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const productHandler = async (e) => {
        e.preventDefault();
        if (id === "0") {
            await addNewProduct(formData);
        } else {
            await editProduct(id, formData);
        }
        navigate('/products');
    };

    return (
        <Container className="my-5 py-5 d-flex justify-content-center">
            <Card className="mt-5 shadow-lg p-4 w-50 border-danger py-5">
                <h2 className="mb-4 text-danger text-center fw-bold">
                    {id === "0" ? "Add New Product" : "Edit Product"}
                </h2>
                <Form onSubmit={productHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Product Name</Form.Label>
                        <Form.Control
                            name="name"
                            value={formData.name}
                            onChange={inputHandler}
                            type="text"
                            placeholder="Enter Product Name"
                            className="border-danger"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Price ($)</Form.Label>
                        <Form.Control
                            name="price"
                            value={formData.price}
                            onChange={inputHandler}
                            type="number"
                            placeholder="Enter Product Price"
                            className="border-danger"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Quantity</Form.Label>
                        <Form.Control
                            name="quantity"
                            value={formData.quantity}
                            onChange={inputHandler}
                            type="number"
                            placeholder="Enter Product Quantity"
                            className="border-danger"
                            required
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                        <Button variant="outline-secondary" onClick={() => navigate('/products')}>Cancel</Button>
                        <Button variant="danger" type="submit">
                            {id === "0" ? "Add Product" : "Save Changes"}
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
}
