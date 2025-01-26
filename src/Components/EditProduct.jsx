import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateProduct, fetchProducts } from '../redux/productsSlice';

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select the product by id from the store
  const product = useSelector((state) =>
    Array.isArray(state.products.products)
      ? state.products.products.find((item) => item.id === parseInt(id))
      : null
  );

  // Fetch products if not loaded
  useEffect(() => {
    if (!Array.isArray(state.products.products) || state.products.products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  if (!product) {
    return <div>Product not found</div>;
  }

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Logging before dispatching
    console.log('Updating product:', { id: product.id, name, price });

    // Dispatch update action
    dispatch(updateProduct({ id: product.id, name, price }));

    // Navigate back to products page
    navigate('/products');
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow w-50 mx-auto">
      <h2 className="text-center mb-4">Edit Product</h2>
      <div className="mb-3">
        <label className="form-label">Product Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Product Price</label>
        <input
          type="number"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Update Product
      </button>
    </form>
  );
};

export default EditProduct;
