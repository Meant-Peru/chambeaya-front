import { useDispatch } from 'react-redux';
import { changeModal } from '../redux/slices/uiSlice';

export const useUi = () => {
	const dispatch = useDispatch();
	const changeStateModal = async (modalIsOpen: boolean) => {
		dispatch(changeModal({ modalIsOpen }));
	};

	return {
		changeStateModal,
	};
};
