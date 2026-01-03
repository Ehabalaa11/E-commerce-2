import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const UserProfile = () => {
  let [user, setUser] = useState({});
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        let { data } = await axios.get('https://dummyjson.com/auth/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    getData();
  }, []);

  if (loading) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container">
      <div
        className="card shadow-lg p-0 mx-auto mt-5 text-center"
        style={{
          width: '22rem',
          borderRadius: '16px',
          overflow: 'hidden',
          background: '#f9f9f9',
        }}>
        <img
          src={user.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
          className="card-img-top"
          alt={user.firstName}
          style={{ height: '220px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h4 className="card-title mb-2">{user.firstName} {user.lastName}</h4>
          <p className="text-muted mb-1">{user.email}</p>
          <p className="text-muted mb-3">Username: {user.username}</p>
          
          <div className="d-flex justify-content-center mt-3">
            <Link to="/" className="btn btn-primary">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
