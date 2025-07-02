import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Organization from './pages/orgmanagement/Organization';
import BranchOffice from './pages/orgmanagement/BranchOffice'; 
import Department from './pages/orgmanagement/Department';
import Users from './pages/usermanagement/Users';
import Roles from './pages/usermanagement/Roles';
import Permissions from './pages/usermanagement/Permissions';
import DigitalChalani from './pages/chalani/DigitalChalani';
import DartaList from './pages/darta/DartaList';
import Dispatched from './pages/dispatch/Dispatched';
import ToDispatch from './pages/dispatch/ToDispatch';
import ToDistribute from './pages/distribution/ToDistribute';
import Distributed from './pages/distribution/Distributed';
import Delivered from './pages/distribution/Delivered';
import SeenDartas from './pages/departmentaldarta/SeenDartas';
import UnseenDartas from './pages/departmentaldarta/UnseenDartas';
import Profile from './components/Profile';

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/sidebar' element={<Sidebar />} />
          <Route path='/organization' element={<Organization />} />
          <Route path="/branch-office" element={<BranchOffice />} />
          <Route path="/department" element={<Department />} />
          <Route path="/users" element={<Users />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/digital-chalani" element={<DigitalChalani />} />
          <Route path="/darta-list" element={<DartaList />} />
          <Route path="/dispatched" element={<Dispatched />} />
          <Route path="/to-dispatch" element={<ToDispatch />} />
          <Route path="/to-distribute" element={<ToDistribute />} />
          <Route path="/distributed" element={<Distributed />} />
          <Route path="/delivered" element={<Delivered />} />
          <Route path="/seen-dartas" element={<SeenDartas />} />
          <Route path="/unseen-dartas" element={<UnseenDartas />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
