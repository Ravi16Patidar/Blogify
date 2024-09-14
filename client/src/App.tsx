import React, { useEffect, useState } from "react";
import "./App.css";
import Signup from "./Components/Authentication/Signup/Signup";
import Login from "./Components/Authentication/Login/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// import HomePage from "./Components/HomePage/HomePage";
import HomePage from "./Components/Dashboard/Dashboard";
import Loader from "./Components/utils/Loader/Loader";
import NotFound from "./Components/Not Found/NotFound";
import CreateBlog from "./Components/SideNav/Components/CreateBlog";
import GetBlogs from './Components/SideNav/Components/GetBlogs'
import GetAllBLogs from './Components/AllBlogs/AllBlogs'
import GetSingleBlog from "./Components/GetSingleBlog/GetSingleBlog";
import GetUserSingleBlog from "./Components/GetSingleBlog/GetUserSingleBlog";

function App() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let userToken = localStorage.getItem("token");
    if (userToken) {
      setToken(userToken);
    }
    setLoading(false);
  }, []);
  if (loading) {
    return <Loader />;
  }
  
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to="/homePage" /> : <Navigate to="/login" />
          }
        />
      
        <Route path="*" element={<NotFound />} />
        <Route path="/loader" element={<Loader />} />
          <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/createBlog" element={<CreateBlog />} />
        <Route path="/getBlogs" element={<GetBlogs />} />
        <Route path="/getAllBlogs" element={<GetAllBLogs />} />
        <Route path="/singleBlog/:id" element={<GetSingleBlog />} />
        <Route path="/userSingleBlog/:id" element={<GetUserSingleBlog />} />

      </Routes>
    </Router>
  );
}

export default App;
