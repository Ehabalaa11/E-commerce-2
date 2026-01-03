import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import * as z from 'zod';
import { toast } from 'react-toastify';
let userSchema = z.object({
  username: z
    .string()
    .min(4, 'value must be 4 characters')
    .max(15, 'value must be less than 15 characters'),
  password: z.string().min(6, 'value must be 6 characters'),
});
const Login = () => {
  let [user, setUser] = useState({ username: '', password: '' });
  let [errors, setErrors] = useState({});
  let navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = userSchema.safeParse(user);
    if (!result.success) {
      let newErrors = {};
      result.error.issues.forEach(
        (err) => (newErrors[err.path[0]] = err.message)
      );
      setErrors(() => newErrors);
      return;
    }
    try {
      setErrors = {};
      let response = await axios.post(
        'https://dummyjson.com/auth/login',
        user,
        { credentials: 'include' }
      );
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      setUser({ username: '', password: '' });
      toast.success('Login Success');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.log(err);

      toast.error('Login Failed');
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "25rem", borderRadius: "12px" }}>
        <h1 className="my-4 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3  ">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label">
              User Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              value={user.username}
              onChange={handleChange}
              name="username"
            />
            {errors && errors.username && (
              <p>
                {' '}
                <small className="text-danger">{errors.username} </small>
              </p>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={user.password}
              onChange={handleChange}
              name="password"
            />
            {errors && errors.password && (
              <p>
                {' '}
                <small className="text-danger">{errors.password} </small>
              </p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
