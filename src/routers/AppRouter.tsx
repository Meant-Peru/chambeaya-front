import { useSelector } from 'react-redux';
import { Routes, Route, BrowserRouter as Router, Link, Navigate } from 'react-router-dom';
import AddJob from '../pages/addJob';
import ApplyJob from '../pages/applyJob';
import Corporativo from '../pages/corporativo';
import DetailPost from '../pages/detailPost';
import Home from '../pages/home';
import Login from '../pages/login';
import MyAccount from '../pages/myaccount';
import PostJob from '../pages/postJob';
import Register from '../pages/register';
import SearchJob from '../pages/searchJob';
import { RootState } from '../redux/store/store';

export const AppRouter = () => {
	const { status } = useSelector((state: RootState) => state.auth);

	// if (status === 'checking') {
	// 	return <Login />;
	// }

	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route index element={<Home />} />
				<Route path="register" element={<Register />} />
				<Route path="searchjob" element={<SearchJob />} />
				<Route path="login" element={<Login />} />
				<Route path="myaccount" element={<MyAccount />} />
				<Route path="corporativo" element={<Corporativo />} />
				<Route path="postjob" element={<PostJob />} />
				<Route path="addJob" element={<AddJob />} />
				<Route path="apply/:id" element={<ApplyJob />} />
				<Route path="detail-post/:id" element={<DetailPost />} />
				<Route path="*" element={<NoMatch />} />
			</Routes>
		</>
	);
};

const NoMatch = () => {
	return (
		<div>
			<h2>Nothing to see here!</h2>
			<p>
				<Link to="/">Go to the home page</Link>
			</p>
		</div>
	);
};
