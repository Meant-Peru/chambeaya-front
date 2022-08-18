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

export const ModalComponent = (props: any) => {
	const { modalIsOpen } = useSelector((state: RootState) => state.ui);
	// console.log({ props });
	return (
		<Modal isOpen={modalIsOpen} ariaHideApp={false} style={customStyles} overlayClassName="Overlay">
			{props.children}
		</Modal>
	);
};
