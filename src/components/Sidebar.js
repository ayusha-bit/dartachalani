import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaEnvelopeOpenText,
  FaPaperPlane,
  FaBoxes,
  FaUsersCog,
  FaChevronDown,
  FaChevronUp,
  FaClipboardList,
  FaClipboardCheck,
  FaBuilding,
  FaRegBuilding,
  FaCodeBranch,
  FaSitemap,
  FaUser,
  FaUserTag,
  FaKey,
  FaFileAlt,
  FaListUl,
  FaCheckCircle,
  FaClock,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';


function Sidebar() {
  const location = useLocation();

  // State to track open/close of each menu
  const [openMenus, setOpenMenus] = useState({
    createOrg: false,
    userManagement: false,
    chalani: false,
    dartas: false,
    dispatch: false,
    distribution: false,
    departmentalDarta: false,
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  // Helper to check if path is active
  const isActive = (path) => location.pathname === path;

  return (
    <div
      className="d-flex flex-column p-3"
      style={{
        width: '300px',
        height: '100vh',
        position: 'fixed',
        top: '10px',
        left: 0,
        background: 'linear-gradient(135deg,rgb(17, 45, 75), #0056b3)',
        color: 'white',
        boxShadow: '2px 0 12px rgba(0,0,0,0.15)',
        marginTop: '55px',
        padding: '1.5rem',
        zIndex: 1000,
        overflowY: 'auto',
      }}
    >
     

      <ul className="nav nav-pills flex-column mb-auto">

        {/* Dashboard */}
        <li className="nav-item mb-2">
          <Link
            to="/"
            className={`nav-link d-flex align-items-center ${
              isActive('/') ? 'active' : 'link-light'
            }`}
            style={{
              borderRadius: '8px',
              padding: '10px 15px',
              fontWeight: '600',
              fontSize: '16px',
              transition: 'background-color 0.3s',
            }}
          >
            <FaTachometerAlt style={{ marginRight: '10px', fontSize: '18px' }} />
            Dashboard
          </Link>
        </li>

       {/* CreateOrg Management */}
<li className="nav-item mb-2">
  <div
    onClick={() => toggleMenu('createOrg')}
    style={{
      cursor: 'pointer',
      borderRadius: '8px',
      padding: '10px 15px',
      fontWeight: '600',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: 'white',
      backgroundColor: openMenus.createOrg ? 'rgba(255,255,255,0.15)' : 'transparent',
      userSelect: 'none',
      transition: 'background-color 0.3s',
    }}
  >
    <span style={{ display: 'flex', alignItems: 'center' }}>
      <FaBuilding style={{ marginRight: '10px' }} />
      Org Management
    </span>
    {openMenus.createOrg ? <FaChevronUp /> : <FaChevronDown />}
  </div>

  {openMenus.createOrg && (
    <ul className="nav flex-column ms-3 mt-2">
      <li className="nav-item mb-1">
        <Link
          to="/organization"
          className={`nav-link link-light ${isActive('/organization') ? 'active' : ''}`}
          style={{
            fontWeight: isActive('/organization') ? '700' : '500',
            padding: '6px 12px',
            borderRadius: '6px',
            backgroundColor: isActive('/organization') ? 'rgba(255,255,255,0.3)' : 'transparent',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <FaRegBuilding />
          Organization
        </Link>
      </li>

      <li className="nav-item mb-1">
        <Link
          to="/branch-office"
          className={`nav-link link-light ${isActive('/branch-office') ? 'active' : ''}`}
          style={{
            fontWeight: isActive('/branch-office') ? '700' : '500',
            padding: '6px 12px',
            borderRadius: '6px',
            backgroundColor: isActive('/branch-office') ? 'rgba(255,255,255,0.3)' : 'transparent',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <FaCodeBranch />
          Branch Office
        </Link>
      </li>

      <li className="nav-item mb-1">
        <Link
          to="/department"
          className={`nav-link link-light ${isActive('/department') ? 'active' : ''}`}
          style={{
            fontWeight: isActive('/department') ? '700' : '500',
            padding: '6px 12px',
            borderRadius: '6px',
            backgroundColor: isActive('/department') ? 'rgba(255,255,255,0.3)' : 'transparent',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <FaSitemap />
          Department
        </Link>
      </li>
    </ul>
  )}
</li>


        {/* User Management */}
<li className="nav-item mb-2">
  <div
    onClick={() => toggleMenu('userManagement')}
    style={{
      cursor: 'pointer',
      borderRadius: '8px',
      padding: '10px 15px',
      fontWeight: '600',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: 'white',
      backgroundColor: openMenus.userManagement ? 'rgba(255,255,255,0.15)' : 'transparent',
      userSelect: 'none',
      transition: 'background-color 0.3s',
    }}
  >
    <span style={{ display: 'flex', alignItems: 'center' }}>
      <FaUsersCog style={{ marginRight: '10px' }} />
      User Management
    </span>
    {openMenus.userManagement ? <FaChevronUp /> : <FaChevronDown />}
  </div>
  {openMenus.userManagement && (
    <ul className="nav flex-column ms-3 mt-2">
      <li className="nav-item mb-1">
        <Link
          to="/users"
          className={`nav-link link-light ${isActive('/users') ? 'active' : ''}`}
          style={{
            fontWeight: isActive('/users') ? '700' : '500',
            padding: '6px 12px',
            borderRadius: '6px',
            backgroundColor: isActive('/users') ? 'rgba(255,255,255,0.3)' : 'transparent',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <FaUser style={{ fontSize: '16px' }} />
          Users
        </Link>
      </li>
      <li className="nav-item mb-1">
        <Link
          to="/roles"
          className={`nav-link link-light ${isActive('/roles') ? 'active' : ''}`}
          style={{
            fontWeight: isActive('/roles') ? '700' : '500',
            padding: '6px 12px',
            borderRadius: '6px',
            backgroundColor: isActive('/roles') ? 'rgba(255,255,255,0.3)' : 'transparent',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <FaUserTag style={{ fontSize: '16px' }} />
          Roles
        </Link>
      </li>
      <li className="nav-item mb-1">
        <Link
          to="/permissions"
          className={`nav-link link-light ${isActive('/permissions') ? 'active' : ''}`}
          style={{
            fontWeight: isActive('/permissions') ? '700' : '500',
            padding: '6px 12px',
            borderRadius: '6px',
            backgroundColor: isActive('/permissions') ? 'rgba(255,255,255,0.3)' : 'transparent',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <FaKey style={{ fontSize: '16px' }} />
          Permissions
        </Link>
      </li>
    </ul>
  )}
</li>


{/* Chalani */}
<li className="nav-item mb-2">
  <div
    onClick={() => toggleMenu('chalani')}
    style={{
      cursor: 'pointer',
      borderRadius: '8px',
      padding: '10px 15px',
      fontWeight: '600',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: 'white',
      backgroundColor: openMenus.chalani ? 'rgba(255,255,255,0.15)' : 'transparent',
      userSelect: 'none',
      transition: 'background-color 0.3s',
    }}
  >
    <span style={{ display: 'flex', alignItems: 'center' }}>
      <FaEnvelopeOpenText style={{ marginRight: '10px' }} />
      Chalani
    </span>
    {openMenus.chalani ? <FaChevronUp /> : <FaChevronDown />}
  </div>
  {openMenus.chalani && (
    <ul className="nav flex-column ms-3 mt-2">
      <li className="nav-item mb-1">
        <Link
          to="/digital-chalani"
          className={`nav-link link-light ${isActive('/digital-chalani') ? 'active' : ''}`}
          style={{
            fontWeight: isActive('/digital-chalani') ? '700' : '500',
            padding: '6px 12px',
            borderRadius: '6px',
            backgroundColor: isActive('/digital-chalani') ? 'rgba(255,255,255,0.3)' : 'transparent',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <FaFileAlt style={{ fontSize: '16px' }} />
          Digital Chalani
        </Link>
      </li>
    </ul>
  )}
</li>


{/* Dartas */}
<li className="nav-item mb-2">
  <div
    onClick={() => toggleMenu('dartas')}
    style={{
      cursor: 'pointer',
      borderRadius: '8px',
      padding: '10px 15px',
      fontWeight: '600',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: 'white',
      backgroundColor: openMenus.dartas ? 'rgba(255,255,255,0.15)' : 'transparent',
      userSelect: 'none',
      transition: 'background-color 0.3s',
    }}
  >
    <span style={{ display: 'flex', alignItems: 'center' }}>
      <FaClipboardList style={{ marginRight: '10px' }} />
      Darta List
    </span>
    {openMenus.dartas ? <FaChevronUp /> : <FaChevronDown />}
  </div>
  {openMenus.dartas && (
    <ul className="nav flex-column ms-3 mt-2">
      <li className="nav-item mb-1">
        <Link
          to="/darta-list"
          className={`nav-link link-light ${isActive('/darta-list') ? 'active' : ''}`}
          style={{
            fontWeight: isActive('/darta-list') ? '700' : '500',
            padding: '6px 12px',
            borderRadius: '6px',
            backgroundColor: isActive('/darta-list') ? 'rgba(255,255,255,0.3)' : 'transparent',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <FaListUl style={{ fontSize: '16px' }} />
          Darta List
        </Link>
      </li>
    </ul>
  )}
</li>


 {/* Dispatch */}
<li className="nav-item mb-2">
  <div
    onClick={() => toggleMenu('dispatch')}
    style={{
      cursor: 'pointer',
      borderRadius: '8px',
      padding: '10px 15px',
      fontWeight: '600',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: 'white',
      backgroundColor: openMenus.dispatch ? 'rgba(255,255,255,0.15)' : 'transparent',
      userSelect: 'none',
      transition: 'background-color 0.3s',
    }}
  >
    <span style={{ display: 'flex', alignItems: 'center' }}>
      <FaPaperPlane style={{ marginRight: '10px' }} />
      Dispatch
    </span>
    {openMenus.dispatch ? <FaChevronUp /> : <FaChevronDown />}
  </div>
  {openMenus.dispatch && (
    <ul className="nav flex-column ms-3 mt-2">
      <li className="nav-item mb-1">
        <Link
          to="/dispatched"
          className={`nav-link link-light ${isActive('/dispatched') ? 'active' : ''}`}
          style={{
            fontWeight: isActive('/dispatched') ? '700' : '500',
            padding: '6px 12px',
            borderRadius: '6px',
            backgroundColor: isActive('/dispatched') ? 'rgba(255,255,255,0.3)' : 'transparent',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <FaCheckCircle style={{ fontSize: '16px' }} />
          Dispatched
        </Link>
      </li>
      <li className="nav-item mb-1">
        <Link
          to="/to-dispatch"
          className={`nav-link link-light ${isActive('/to-dispatch') ? 'active' : ''}`}
          style={{
            fontWeight: isActive('/to-dispatch') ? '700' : '500',
            padding: '6px 12px',
            borderRadius: '6px',
            backgroundColor: isActive('/to-dispatch') ? 'rgba(255,255,255,0.3)' : 'transparent',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <FaClock style={{ fontSize: '16px' }} />
          To Dispatch
        </Link>
      </li>
    </ul>
  )}
</li>


        {/* Distribution */}
<li className="nav-item mb-2">
  <div
    onClick={() => toggleMenu('distribution')}
    style={{
      cursor: 'pointer',
      borderRadius: '8px',
      padding: '10px 15px',
      fontWeight: '600',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: 'white',
      backgroundColor: openMenus.distribution ? 'rgba(255,255,255,0.15)' : 'transparent',
      userSelect: 'none',
      transition: 'background-color 0.3s',
    }}
  >
    <span style={{ display: 'flex', alignItems: 'center' }}>
      <FaBoxes style={{ marginRight: '10px' }} />
      Distribution
    </span>
    {openMenus.distribution ? <FaChevronUp /> : <FaChevronDown />}
  </div>
  {openMenus.distribution && (
    <ul className="nav flex-column ms-3 mt-2">
      <li className="nav-item mb-1">
        <Link
          to="/to-distribute"
          className={`nav-link link-light ${isActive('/to-distribute') ? 'active' : ''}`}
          style={{
            fontWeight: isActive('/to-distribute') ? '700' : '500',
            padding: '6px 12px',
            borderRadius: '6px',
            backgroundColor: isActive('/to-distribute') ? 'rgba(255,255,255,0.3)' : 'transparent',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <FaClock style={{ fontSize: '16px' }} />
          To Distribute
        </Link>
      </li>
      <li className="nav-item mb-1">
        <Link
          to="/distributed"
          className={`nav-link link-light ${isActive('/distributed') ? 'active' : ''}`}
          style={{
            fontWeight: isActive('/distributed') ? '700' : '500',
            padding: '6px 12px',
            borderRadius: '6px',
            backgroundColor: isActive('/distributed') ? 'rgba(255,255,255,0.3)' : 'transparent',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <FaCheckCircle style={{ fontSize: '16px' }} />
          Distributed
        </Link>
      </li>
    </ul>
  )}
</li>

{/* Departmental Darta */}
<li className="nav-item mb-2">
  <div
    onClick={() => toggleMenu('departmentalDarta')}
    style={{
      cursor: 'pointer',
      borderRadius: '8px',
      padding: '10px 15px',
      fontWeight: '600',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: 'white',
      backgroundColor: openMenus.departmentalDarta ? 'rgba(255,255,255,0.15)' : 'transparent',
      userSelect: 'none',
      transition: 'background-color 0.3s',
    }}
  >
    <span style={{ display: 'flex', alignItems: 'center' }}>
      <FaClipboardCheck style={{ marginRight: '10px' }} />
      Departmental Darta
    </span>
    {openMenus.departmentalDarta ? <FaChevronUp /> : <FaChevronDown />}
  </div>
  {openMenus.departmentalDarta && (
    <ul className="nav flex-column ms-3 mt-2">
      <li className="nav-item mb-1">
        <Link
          to="/seen-dartas"
          className={`nav-link link-light ${isActive('/seen-dartas') ? 'active' : ''}`}
          style={{
            fontWeight: isActive('/seen-dartas') ? '700' : '500',
            padding: '6px 12px',
            borderRadius: '6px',
            backgroundColor: isActive('/seen-dartas') ? 'rgba(255,255,255,0.3)' : 'transparent',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <FaEye style={{ fontSize: '16px' }} />
          Seen Dartas
        </Link>
      </li>
      <li className="nav-item mb-1">
        <Link
          to="/unseen-dartas"
          className={`nav-link link-light ${isActive('/unseen-dartas') ? 'active' : ''}`}
          style={{
            fontWeight: isActive('/unseen-dartas') ? '700' : '500',
            padding: '6px 12px',
            borderRadius: '6px',
            backgroundColor: isActive('/unseen-dartas') ? 'rgba(255,255,255,0.3)' : 'transparent',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <FaEyeSlash style={{ fontSize: '16px' }} />
          Unseen Dartas
        </Link>
      </li>
    </ul>
  )}
</li>

      </ul>
    </div>
  );
}

export default Sidebar;
