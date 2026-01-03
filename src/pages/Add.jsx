import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import * as z from 'zod';

const schema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  body: z.string().min(5, 'Body must be at least 5 characters'),
  image: z.string(),
  category: z.string().min(2, 'Category is required'),
  price: z.coerce.number().positive('Price must be positive'),
});

const Add = () => {
  let [product, setProduct] = useState({
    id: new Date(),
    name: '',
    price: 0,
    image: '',
    body: '',
    category: '',
  });
  let navigate = useNavigate();
  let [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = schema.safeParse(product);

    if (!result.success) {
      let newErrors = {};
      result.error.issues.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      console.log(product.image);
      
      return;
    }
    try {
      await axios.post('http://localhost:3000/products', result.data);
      toast.success('Added successfully');
      setProduct({ name: '', price: 0, body: '', image: '', category: '' });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.error('Add failed');
    }
  };

  return (
 <>
      <div className="container shadow-sm mt-3"
      style={{ width: '50rem',height:"83vh", borderRadius:"12px", overflow:"hidden", transition:"transform 0.2s",backgroundColor:"white"}}>
        <h1 className="my-4 text-center">Add Product Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label">
              Product Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              value={product.name}
              onChange={handleChange}
              name="name"
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label">
              Product Body
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              value={product.body}
              onChange={handleChange}
              name="body"
            />
            {errors.body && <div className="text-danger">{errors.body}</div>}
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword2"
              className="form-label">
              Product Image
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword2"
              value={product.image}
              onChange={handleChange}
              name="image"
            />
            {errors.image && <div className="text-danger">{errors.image}</div>}
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword4"
              className="form-label">
              Product Category
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword4"
              value={product.category}
              onChange={handleChange}
              name="category"
            />
            {errors.category && (
              <div className="text-danger">{errors.category}</div>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword3"
              className="form-label">
              Product Price
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword3"
              value={product.price}
              onChange={handleChange}
              name="price"
            />
            {errors.price && <div className="text-danger">{errors.price}</div>}
          </div>
          <div className='d-flex justify-content-between'>
            <button
            type="submit"
            className="btn btn-primary">
            Submit
          </button>
          <Link to="/" className="btn btn-secondary">
              Home
            </Link>
          </div>
          
        </form>
      </div>
    </>
  );
};

export default Add;
