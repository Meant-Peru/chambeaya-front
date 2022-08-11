import React, { Fragment, useState, useEffect } from 'react';
import './../sass/pages/_detailPost.scss';

import Header from '../components/shared/header';
import { TagComponent } from '../components/shared/atom/tag';

import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';
import { Txtfield, DropdownMenu, DropdownItem, BtnPrimary, BtnSecondary } from './../components/shared/styled';

import { useNavigate, useParams } from 'react-router-dom';
import { getPosition, createPosition } from '../util/position.service';
import { usePosForm } from '../hooks/usePosition';


const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		borderRadius: '20px',
	}
};

export default function ListPosiciones() {
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const navigate = useNavigate();
	const idCategory = useParams();
	const { formpos, handleFormPos, resetPos } = usePosForm();

	const [positions, setAllPosition] = useState([]);

	useEffect(() => {
		(async () => {
			await listPositions()
		})();
	}, []);

	const listPositions = async () =>{
			const responsePosition = await getPosition(idCategory);
			setAllPosition(responsePosition.data);
			console.log(responsePosition.data);
	}

	formpos.id_category = idCategory.idCategory;

	const submit = async (event: any) => {
		event.preventDefault();
		await createPosition(formpos);
		toast.success('Has registrado una nueva posición!');
		closeModal();
		await listPositions();
		resetPos();

	};

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		//   subtitle.style.color = '#f00';
	}

	function aplicar() {
		// references are now sync'd and can be accessed.
		//   subtitle.style.color = '#f00';
	}

	return (
		<React.Fragment>
			<Header />
			<div className="dflex flex-row mt-4 mb-4 algn-center">
			<h2>Posiciones</h2>
			<BtnPrimary onClick={openModal}> Agregar nueva </BtnPrimary>
			</div>
			<div className="dflex flex-row mt-4 mb-4 algn-center">
			<div className="tablePosicions">
				<article className="headerRow">
					<aside className="headerItem">Nombre</aside>
					<aside className="headerItem">Descripción</aside>
					<aside className="headerItem flex-end">Acciones</aside>
				</article>
				{positions.map((e: any) => (
					<article className="contentRow" key={e._id}>
						<aside className="contentItem">{e.namePosition}</aside>
						<aside className="contentItem">{e.descriptionPosition}</aside>
						<aside className="contentItem flex-end"> <BtnPrimary onClick={openModal}>Editar</BtnPrimary></aside>
					</article>
			))}
			</div>
			</div>
			<Toaster position="top-right" reverseOrder={false} />
			<Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal" overlayClassName="Overlay">
						<h2 className="text-center">Nueva Posición</h2>
						<p className="mt-2 text-center">
							<i>Ingresa nueva posición , relacionalo a una especialidad</i>
						</p>
						<aside className="FormGroup algn-center">
							<form onSubmit={submit}>
								<div className="dflex flex-row mt-4 mb-4 algn-center">
								<Txtfield placeholder="Puesto" onChange={handleFormPos} name="namePosition" value={formpos.namePosition} />
								</div>
								<div className="dflex flex-row mt-4 mb-4 algn-center">
								<Txtfield placeholder="Descripción" onChange={handleFormPos} name="descriptionPosition" value={formpos.descriptionPosition}/>
								</div>
								<BtnSecondary className='mr-2' onClick={closeModal}>CANCELAR</BtnSecondary>
								<BtnPrimary type="submit"> GUARDAR </BtnPrimary>
							</form>
						</aside>
					 </Modal>

		</React.Fragment>
	);
}