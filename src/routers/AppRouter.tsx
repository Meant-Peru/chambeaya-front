import { useSelector } from 'react-redux';
import { Routes, Route, BrowserRouter as Router, Link } from 'react-router-dom';
import AccountSales from '../pages/accountSales';
import AddJob from '../pages/addJob';
import ApplyJob from '../pages/applyJob';
import { RegisterPostulant } from '../pages/registerPostulant';
import BussinessSignUp from '../pages/bussiness';
import Corporativo from '../pages/corporativo';
import Dashboard from '../pages/dahsboard';
import DetailPost from '../pages/detailPost';
import Home from '../pages/home';
import Login from '../pages/login';
import Politicas from '../pages/politicas-privacidad';
import MyAccount from '../pages/myaccount';
import Register from '../pages/register';
import SearchJob from '../pages/searchJob';
import ListPosiciones from '../pages/listPosiciones';
import { RootState } from '../redux/store/store';
import { DetailPostPostulant } from '../pages/DetailPostPostulant';
import { DetailPostCompanys } from '../pages/DetailPostCompanys';
import { DetailUser } from '../pages/DetailUser';
import { DetailProyecto } from '../pages/DetailProyecto';
import { DetailProyectoPost } from '../pages/DetailProyectoPost';

export const AppRouter = () => {
	const { status } = useSelector((state: RootState) => state.auth);

	 //if (status === 'checking') {
	 //	return <Login />;
	 //}

	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route index element={<Home />} />
				<Route path="register" element={<Register />} />
				<Route path="searchjob/:idCategory" element={<SearchJob />} />
				<Route path="login" element={<Login />} />
				<Route path="politicas-privacidad" element={<Politicas />} />
				<Route path="myaccount/:id" element={<MyAccount />} />
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="account-sales" element={<AccountSales />} />
				<Route path="corporativo" element={<Corporativo />} />
				<Route path="bussiness" element={<BussinessSignUp />} />
				<Route path="addJob" element={<AddJob />} />
				<Route path="apply/:id" element={<ApplyJob />} />
				<Route path="register-step-2" element={<RegisterPostulant />} />
				<Route path="detail-post/:id" element={<DetailPost />} />

				<Route path="detail-project/:idProject" element={<DetailProyecto />} />
				<Route path="detail-project-post/:idProject" element={<DetailProyectoPost />} />

				<Route path="detail-post-company/:id" element={<DetailPostCompanys />} />
				<Route path="list-posiciones/:idCategory" element={<ListPosiciones />} />
				{
					/*DetailPostPostulant - Compañia: perfil del postulante que aplicó a su oferta, muestra su % de similitud */
				}
				<Route path="detail-post-postulant/:idJob/:idP" element={<DetailPostPostulant />} />

				<Route path="detail-user/:idPostulant" element={<DetailUser />} />
				<Route path="*" element={<NoMatch />} />
			</Routes>
		</>
	);
};

const NoMatch = () => {
	return (
		<div>
			<h2>No se encontró esta página, intente volviendo a la página anterior</h2>
			<p>
				<Link to="/">Volver al home</Link>
			</p>
		</div>
	);
};
