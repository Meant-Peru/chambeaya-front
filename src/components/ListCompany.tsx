import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSales } from '../hooks/useSales';
import { RootState } from '../redux/store/store';
import ButtonComponent from './shared/atom/button';
import { TagComponent } from './shared/atom/tag';
import { BtnPrimary } from './shared/styled';

export default function ListCompany() {
	const navigate = useNavigate();
	const handleRedirect = () => {
		navigate('/bussiness');
	};

	const { startGetCompanies } = useSales();
	const { companies } = useSelector((state: RootState) => state.sales);
	// console.log({ companies });

	React.useEffect(() => {
		// console.log('Listar');
		listCompaniesSales();
	}, []);

	const listCompaniesSales = async () => await startGetCompanies();

	return (
		<React.Fragment>
			<section className="sectionAccount">
				<aside className="mb-5">
					<article className="headSection dfr jc-sb">
						<h2>Cartera de negocios</h2>
						<BtnPrimary onClick={handleRedirect}>CREAR NUEVA CARTERA</BtnPrimary>
					</article>
					<p>Tienes {companies?.length ?? 0} compañias en tu cartera</p>
				</aside>

				<div>
					{companies.map((company) => (
						<aside key={company._id}>
							<article className="rowPost row">
								<aside className="title">
									<p className="mb-2">{company.dataUser.businessName}</p>
									<TagComponent tag={{ nameSkill: 'Activo' }} />
								</aside>
								<aside className="title">
									<p>{company.dataUser.ruc}</p>
								</aside>
								<aside className="actions">
									<ButtonComponent family="secondary" label="Ver detalles" />
								</aside>
							</article>
						</aside>
					))}
				</div>
			</section>
		</React.Fragment>
	);
}
