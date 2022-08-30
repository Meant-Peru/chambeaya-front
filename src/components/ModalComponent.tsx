import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { useUi } from '../hooks/useUi';
import { RootState } from '../redux/store/store';
import negative from './../assets/negative.svg';
import './../sass/components/_modal.scss';

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

export const ModalComponent = (props: any) => {
	const { modalIsOpen } = useSelector((state: RootState) => state.ui);
	const { changeStateModal } = useUi();
	// console.log({ props });
	return (
		<Modal isOpen={modalIsOpen} ariaHideApp={false} style={customStyles} overlayClassName="Overlay">
			<div className="containerClose" onClick={() => changeStateModal(false)}>
				<img src={negative} alt="" />
			</div>
			{props.children}
		</Modal>
	);
};
