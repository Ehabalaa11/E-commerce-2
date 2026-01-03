import React from 'react';

const Card = ({ product, children }) => {
  return (
    <>
      <div
        className="card shadow-sm p-0 d-flex flex-column justify-content-between"
        style={{ width: '18rem', borderRadius:"12px", overflow:"hidden"}}>
          <div>
            <img src={product.image} className="card-img-top" alt={product.name} style={{ height: '250px',objectFit:"cover" }}/>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="card-title mb-0 fw-bold " style={{height:"50px"}}>{product.name}</h5>
            <h6 className="text-success mb-0 " style={{height:"50px"}}>${product.price}</h6>
          </div>
          <p className="card-text text-muted" style={{fontSize:"0.9rem", height:"50px"}}>{product.body}</p>
          </div>
        
          <div className=' mt-auto mb-3'>
          {children}
          </div>

        </div>
      </div>
    </>
  );
};

export default Card;
