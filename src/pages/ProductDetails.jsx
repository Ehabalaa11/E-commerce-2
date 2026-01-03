import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Card from '../components/Card';
import Model from '../components/Model';
import { toast } from 'react-toastify';

const ProductDetails = () => {
  let { id } = useParams();
  let [product, setProduct] = useState({});
  let navigate = useNavigate();
  useEffect(() => {
    async function getData() {
      let { data } = await axios.get('http://localhost:3000/products/' + id);
      setProduct(() => data);
    }
    getData();
  }, [id]);
  const handleDelete = async()=>{
    await axios.delete("http://localhost:3000/products/"+ id)
    toast.success("product delete successfully")
    setTimeout(()=>{
      navigate("/")
    },1000)
  }
  return (
    <>
      <div className="container">
        <h1 className="my-5 text-center">Product Details</h1>
        <div className="d-flex justify-content-center">
          <Card product={product}>
            <button 
              onClick={() => navigate(`/`)}
              className="btn btn-primary px-4 my-3 d-block mx-auto">
              Back to products
            </button>
            <div className='d-flex justify-content-center gap-3 mt-3'>
            <button className='btn btn-warning px-3' data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
            <button onClick={handleDelete} className='btn btn-danger px-3'>Delete</button>
            </div>
          </Card>
        </div>
        <Model/>
      </div>
    </>
  );
};

export default ProductDetails;
