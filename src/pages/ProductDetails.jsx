import React, { useEffect, useState } from 'react';
import { FaHeart, FaCartPlus, FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../api/productapi';

export function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        getProductById(id)
            .then((response) => setProduct(response.data))
            .catch((error) => console.log(error));
    }, []);

    return (

        <div class="py-5">
          <div className='bg-danger-subtle p-5 container my-5 py-5 rounded text-dark shadow-lg'>
            <div className="row">
                <div className="col-md-6 d-flex align-items-center justify-content-center">
                    <img 
                        src="../src/img/products/2.webp" 
                        alt="Product" 
                        className="img-fluid border border-3 border-danger rounded"
                        style={{ maxHeight: '350px' }}
                    />
                </div>
                <div className="col-md-6">
                    <h1 className='text-danger fw-bold mb-3'>Product Details</h1>
                    <p className='lead fs-5'><strong>Name:</strong> {product?.name}</p>
                    <p className='lead fs-5'><strong>Price:</strong> ${product?.price}</p>
                    <p className='lead fs-5'><strong>Quantity:</strong> {product?.quantity} items</p>
                    
                    <div className="d-flex mb-3">
                        <FaHeart className='text-danger fs-2 mx-2' />
                        <FaHeart className='text-danger fs-2 mx-2' />
                        <FaHeart className='text-danger fs-2 mx-2' />
                        <FaHeart className='text-danger fs-2 mx-2' />
                        <FaHeart className='text-secondary fs-2 mx-2' />
                    </div>

                    <div className="mt-4">
                        <Link to="/products" className='btn btn-outline-dark me-3'>
                            <FaArrowLeft className="me-2" /> Back To Products
                        </Link>
                        <button className='btn btn-outline-dark'>
                            <FaCartPlus className="me-2" /> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
      
    );
}
