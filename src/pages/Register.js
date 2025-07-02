import React from 'react';
import { Link } from 'react-router-dom';
import registerImage from '../assets/logoo.png'; // adjust relative path as needed

function Register() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', background: '#f8f9fa' }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: '800px',
          width: '100%',
          borderRadius: '1rem',
          display: 'flex',
          flexDirection: 'row',
          gap: '0',
        }}
      >
        {/* Image Section */}
        <div
          className="d-none d-md-flex align-items-center justify-content-center"
          style={{
            background: '#fff',
            borderTopLeftRadius: '1rem',
            borderBottomLeftRadius: '1rem',
            overflow: 'hidden',
            width: '50%',
          }}
        >
          <img
            src={registerImage}
            alt="Bank Logo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Form Section */}
        <div
          className="p-4"
          style={{
            flex: '1',
            background: '#fff',
            borderTopRightRadius: '1rem',
            borderBottomRightRadius: '1rem',
          }}
        >
          <h3 className="text-center mb-4">Register</h3>
          <form>
            <div className="form-group mb-3">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                placeholder="Enter full name"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm password"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
          <p className="mt-3 text-center">
            Already have an account?{' '}
            <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
