import React, { useEffect, useState } from 'react';
import { Table, Spinner, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { FaPencilAlt, FaEye, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { deleteProduct, getAllProducts } from '../api/productapi';

export function Products() {
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                let response = await getAllProducts();
                setProducts(response.data);
            } catch (error) {
                setErrors(error);
            }
            setIsLoading(false);
        };

        fetchProducts();
    }, []);

    const deleteHandler = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(productId);
                setProducts(products.filter(product => product.id !== productId));
            } catch (error) {
                console.log(error);
            }
        }
    };

    // Filter products based on search term
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container my-5 py-5">
            <h2 className="text-center text-danger fw-bold">Our Products</h2>

            {/* Top Bar - Search & Add Product */}
            <div className="mt-4 d-flex justify-content-between align-items-center">
                <Link to="0/edit" className="btn btn-outline-danger">
                    <FaPlus className="me-2" /> Add New Product
                </Link>
                <input
                    type="text"
                    className="form-control w-25 border-danger"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Error Handling */}
            {errors && <div className="mt-4 alert alert-danger">{errors.message}</div>}

            {/* Loading Spinner */}
            {isLoading && (
                <div className="text-center mt-5">
                    <Spinner animation="border" variant="danger" />
                </div>
            )}

            {/* Products Table */}
            {!isLoading && !errors && filteredProducts.length > 0 ? (
                <Table responsive bordered hover className="mt-4 shadow-lg">
                    <thead className="bg-danger text-white">
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.quantity}</td>
                                <td className="text-center">
                                    {/* Edit */}
                                    <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                                        <Link to={`${product.id}/edit`} className="text-danger mx-2 fs-4">
                                            <FaPencilAlt />
                                        </Link>
                                    </OverlayTrigger>

                                    {/* View */}
                                    <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
                                        <Link to={`${product.id}`} className="text-dark mx-2 fs-4">
                                            <FaEye />
                                        </Link>
                                    </OverlayTrigger>

                                    {/* Delete */}
                                    <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                                        <Button variant="link" className="text-danger mx-2 fs-4 p-0" onClick={() => deleteHandler(product.id)}>
                                            <FaTrashAlt />
                                        </Button>
                                    </OverlayTrigger>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                !isLoading && !errors && (
                    <p className="text-center mt-4 text-muted">No products found.</p>
                )
            )}
        </div>
    );
}
