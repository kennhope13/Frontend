import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import DogsPage from './components/DogsPage/DogsPage';
import Cart from './components/Cart/Cart';
import Navbar from './Navbar/Navbar';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { CartContext } from "./Context/CartContext";
import Login from './components/Login/login';
import Signin from './components/Signin/signin';
import Footter from './Footter/Footter';
import Admin from './components/Admin/Admin';
import Listdogs from './components/Admin/Dogs';
import { Helmet } from 'react-helmet';
import PrivateRoute from './PrivateRoute';
import useCheckAdmin from './components/Admin/CheckAdmin';
import Profile from './components/Users/Profile'
import DetailCard from './components/Users/DetailCard'
function App() {
  const [alldogss, setAllDogss] = useState([]);
  const [alldogs, setAllDogs] = useState([]);
  const [myCart, addToCart] = useState([{}])
  const [allUsers, setAllUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const TITLE = 'PETSAIGON';
  
  useEffect(() => {
    // lấy dữ liệu dogs từ backend
    async function getData() {
      const res = await axios.post("./listdog");
      // console.log(res.data);
      return res;
    }
    getData().then((res) => setAllDogs(res.data.data));
    getData().catch((err) => console.log("err", err));
  }, []);
  useEffect(() => {
    async function getDataUser() {
      const res = await axios.post("./listuser");
      // console.log(res.data.userData);
      return res;
    }
    getDataUser().then((res) => setAllUsers(res.data.userData));
    getDataUser().catch((err) => console.log("Err", err));
  }, [])
  useEffect(() => {
    async function getDataDog() {
      const res = await axios.post("./listdog");
      // console.log(res.data);
      return res;
    }
    getDataDog().then((res) => setAllDogss(res.data.data));
    getDataDog().catch((err) => console.log("Err: ", err));
  }, [])

  // const AppContent = () => {
  //   const isAdmin = useCheckAdmin();
  
  //   return (
  //     <Routes>
  //       {/* <PrivateRoute path="/admin" element={<Admin />} isAdmin={isAdmin} />
  //       <PrivateRoute path="/admin-dogs" element={<Listdogs />} isAdmin={isAdmin} /> */}
  //       <Route path="/admin" element={<PrivateRoute element={<Admin allUsers={allUsers} />} isAdmin={isAdmin}  />} />
  //       <Route path="/admin-dogs" element={<PrivateRoute element={<Listdogs alldogss={alldogss} />}isAdmin={isAdmin}  />} />
  //     </Routes>
  //   );
  // };
  return (
    
    <CartContext.Provider value={{ myCart, addToCart, total, setTotal }}>
      <Helmet>
        <title>{TITLE}</title>
        <link rel="icon" href="https://bizweb.dktcdn.net/100/092/840/themes/885495/assets/favicon.png?1715850200207" sizes="128x128" />
      </Helmet>
      <Router>

        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dogs' element={<DogsPage alldogs={alldogs} />} />
          <Route path='/checkout' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/detail-cart' element={<DetailCard/>}/>
          {/* <PrivateRoute path="/admin" element={<Admin />} isAdmin={isAdmin} />
          <PrivateRoute path="/admin-dogs" element={<Listdogs />} isAdmin={isAdmin} /> */}
          <Route path="/admin" element={<Admin allUsers={allUsers} />} />
          <Route  path="/admin-dogs" element={<Listdogs alldogss={alldogss} />} />
        </Routes>
        {/* <AppContent /> */}
        <Footter></Footter>
      </Router>

    </CartContext.Provider>
  );
}

export default App;
