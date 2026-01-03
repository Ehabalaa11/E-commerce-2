import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

const Model = () => {
  let [product, setProduct] = useState({
    name: '',
    price: 0,
    image: '',
    body: '',
    category: '',
  });
  let navigate = useNavigate();
  let { id } = useParams();
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    async function getData() {
      let { data } = await axios.get('http://localhost:3000/products/' + id);
      setProduct(() => data);
    }
    getData();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put('http://localhost:3000/products/' + id, product);

    toast.success('product edit successfully');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
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
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal">
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success"
                    data-bs-dismiss="modal">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
