import Home from "./pages/home";

import { Routes, Route, Link } from "react-router-dom";

import SearchJob from "./pages/postJob";
import PostJob from "./pages/postJob";

import "./sass/main.scss";
import DetailPost from "./pages/detailPost";
import ApplyJob from "./pages/applyJob";
import Login from "./pages/login";
import Register from "./pages/register";
import MyAccount from "./pages/myaccount";
import AddJob from "./pages/addJob";
import Corporativo from "./pages/corporativo";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="searchjob" element={<SearchJob />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="myaccount" element={<MyAccount />} />
        <Route path="corporativo" element={<Corporativo />} />
        <Route path="postjob" element={<PostJob />} />
        <Route path="addJob" element={<AddJob />} />
        <Route path="apply" element={<ApplyJob />} />
        <Route path="detail-post/:id" element={<DetailPost />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
