import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { useNavigate } from 'react-router';

const Home = () => {
  let navigate = useNavigate();
  let [products, setProducts] = useState([]);
  let [search, setSearch] = useState('');
  let [category, setCategory] = useState('all');
  useEffect(() => {
    async function getData() {
      let { data } = await axios.get('http://localhost:3000/products');
      setProducts(() => data);
    }
    getData();
  }, []);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleChange1 = (e) => {
    setCategory(e.target.value);
  };
  const filtered = products.filter((product) => {
    if (search == "") {
      return category == 'all' ? true : product.category.includes(category);
    } else {
      return product.name.includes(search);
    }
  });
  return (
    <div >
      <div className="container">
        <h1 className="text-center my-5">Products Page</h1>
        <div className="row g-2 justify-content-center mb-3">
          <div className=' col-12 col-md-3'>
            <input
          className=' form-control'
            type="text"
            value={search}
            onChange={handleChange}
            placeholder='Search...'
          />
          </div>
          <div className='col-12 col-md-3'>
            <select
          className="form-select" aria-label="Default select example"
          
            name="category"
            id="category"
            value={category}
            onChange={handleChange1}>
            <option value="all">All</option>
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
            <option value="Footwear">Footwear</option>
            <option value="Accessories">Accessories</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Home & Office">Home & Office</option>
          </select>
          </div>
          <div className='col-12 col-md-3'>
            <button
            onClick={() => navigate('/products/new')}
            className="btn btn-primary px-3 w-100">
            Add Product
          </button>
          </div>
          
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gap-3 justify-content-center ">
          
          {filtered.map((p) => (
            <Card
              key={p.id}
              product={p}>
              <button
                onClick={() => navigate(`/products/${p.id}`)}
                className="btn btn-primary px-4 my-auto d-block mx-auto">
                Show more
              </button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
