import React, { Fragment, useEffect, useState } from 'react';
import Footer from '../components/shared/footer';
import Header from '../components/shared/header';

import './../sass/pages/_detailProject.scss';
import { useParams } from 'react-router-dom';
import { URI } from '../enviroment/enviroment';
import { Backdrop, CircularProgress } from '@material-ui/core';
import toast, { Toaster } from 'react-hot-toast';

import { GetUserById } from '../util/user.service';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

export const DetailPostulant = () => {
    const [loadingDetailPostulant, setLoadingDetailPostulant] = useState(false);
    const { idPostulant } = useParams();
    const [detailUser, setDetailUser] = useState()

//@TODO: 
//ESPERANDO QUE EL SERVICIO PASE A POST
// EN USER.SERVICE ESTA EL ENDPOINT CON POST
    const getDataById = async () => {
        setLoadingDetailPostulant(true);
        const r = await GetUserById({idUser:idPostulant})
        console.log('detailproject',r);
		setDetailUser({ ...r.dataUser });
		setLoadingDetailPostulant(false);
    }

    useEffect(() => {
		getDataById();
	}, []);





    return (
        <React.Fragment>
            <Backdrop
				open={loadingDetailPostulant}
				style={{
					background: 'white',
					zIndex: 99,
				}}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Header />
            <Toaster position="top-right" reverseOrder={false} />
            <section className="detailProject">
            <p>Postulante</p>
            <br />
            <h2 className="accent-color">{detailUser?.name} {detailUser?.lastName}</h2>
            <hr />
            <aside className="mt-3">
            <h4 className="mb-2">Datos de contacto</h4>
            <article className="mmlist mb-1">
                <p>
                    <strong>Email: </strong> 
                    {detailUser?.email}
                </p>
                <br />
                <p>
                    <strong>Facebook: </strong> 
                    {detailUser?.facebookURL}
                </p>
                <br />
                <p>
                    <strong>Linkedin: </strong> 
                    {detailUser?.linkedinURL}
                </p>
                <br />
                <p>
                    <strong>Web: </strong> 
                    {detailUser?.webURL}
                </p>
                <br />
                <p>
                    <strong>Youtube: </strong> 
                    {detailUser?.youtubeURL}
                </p>
            </article>
            </aside>
            </section>
        </React.Fragment>
    )
}