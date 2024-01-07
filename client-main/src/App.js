import React from 'react';
import {Routes, Route} from 'react-router-dom';
import LoginCard from './components/logincard';
import Registration from './components/registration';
import Homepage from './pages/homepage';
import Error from './pages/error';
import Logout from './components/logout';
import Contact from './pages/contact';
import Service from './pages/service';
import Navbar from './components/navbar';
import AdminLayout from './components/Layout/AdminLayout';
import AdminUser from './components/Layout/Admin-user';
import AdminContact from './components/Layout/Admin-contact';
import AdminService from './components/Layout/Admin-Service';
import AdminUpdteUser from './components/Layout/AdminUpdteUser';
import AdminUpdateService from './components/Layout/AdminServiceUpdate';
import AdminCreate from './components/Layout/adminservicecreate';
function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route  exact path="/login" element={<LoginCard />} />
      <Route exact path="/signup" element={<Registration />} />
      <Route exact path="/logout" element={<Logout />} />
      <Route exact path="/contact" element={<Contact />} />
      <Route exact path="/service" element={<Service />} />
      <Route exact path="/admin"element={<AdminLayout/>}>
        <Route exact path="users" element={<AdminUser/>} />
        <Route exact path="contacts" element={<AdminContact/>} />
        <Route exact path="services" element={<AdminService/>} />
        <Route exact path="users/:id/edit" element={<AdminUpdteUser />} />
        <Route exact path ="services/update/:id" element={<AdminUpdateService/>} />
        <Route exact path ="services/create" element={<AdminCreate/>} />
      </Route>
      <Route path='*' element={<Error />} />
    </Routes>
    </>
  );
}
export default App;