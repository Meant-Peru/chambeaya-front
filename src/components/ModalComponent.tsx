import React, { useState } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';

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

interface Props {
	AfterOpen: () => void;
	closeModal: () => void;
}

export const ModalComponent = (props) => {
	const { modalIsOpen } = useSelector((state: RootState) => state.ui);
	return (
		<Modal isOpen={modalIsOpen} ariaHideApp={false} style={customStyles} contentLabel="Example Modal" overlayClassName="Overlay">
			{props.children}
		</Modal>
	);
};
