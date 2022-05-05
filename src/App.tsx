import Home from "./pages/home";

import { Routes, Route, Link } from "react-router-dom";

import SearchJob from "./pages/postJob";
import PostJob from "./pages/postJob";

import "./sass/main.scss";
import DetailPost from "./pages/detailPost";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="searchjob" element={<SearchJob />} />
        <Route path="postjob" element={<PostJob />} />
        <Route path="detail-post" element={<DetailPost />} />
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
