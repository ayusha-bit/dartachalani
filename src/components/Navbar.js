import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa'; 
import logo from '../assets/logoo.png';

function Navbar({ onToggleSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/login');
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark px-3"
      style={{ backgroundColor: 'rgb(17, 45, 75)' }}
    >
      <div className="d-flex align-items-center w-100 justify-content-between">
        {/* LEFT SIDE: Brand + Hamburger */}
        <div className="d-flex align-items-center">
          <Link
            className="navbar-brand d-flex align-items-center m-0"
            to="/"
            style={{ gap: '10px' }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ height: '30px', width: 'auto' }}
            />
            Darta Chalani System
          </Link>
          {/* Hamburger Button right next to Brand */}
          <button
            className="btn btn-link text-white ms-2"
            onClick={onToggleSidebar}
            style={{ fontSize: '1.5rem' }}
            aria-label="Toggle sidebar"
          >
            <FaBars />
          </button>
        </div>

{/* RIGHT SIDE: Dropdown Menu */}
<ul className="navbar-nav ms-auto" ref={dropdownRef}>
  <li className="nav-item dropdown">
    <button
      className="nav-link dropdown-toggle btn btn-link text-white d-flex align-items-center"
      onClick={() => setDropdownOpen(!dropdownOpen)}
      aria-expanded={dropdownOpen}
    >
      <FaUser size={18} className="me-1" />
    </button>
    <ul className={`dropdown-menu dropdown-menu-end${dropdownOpen ? ' show' : ''}`}>
      <li>
        <Link className="dropdown-item" to="/profile" onClick={() => setDropdownOpen(false)}>
          Profile
        </Link>
      </li>
      <li>
        <button className="dropdown-item" onClick={handleLogout}>
          Logout
        </button>
      </li>
    </ul>
  </li>
</ul>
</div>
    </nav>
  );
}

export default Navbar;
