/* eslint-disable */
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { closeModal } from '../../slices/uiSlice';
import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannel';

const modals = {
  adding: AddChannelModal,
  removing: RemoveChannelModal,
  renaming: RenameChannelModal,
};

const ModalRoot = () => {
  const dispatch = useDispatch();
  const { isOpened, type } = useSelector((state) => state.ui.modal);

  const handleClose = () => dispatch(closeModal());

  const Component = modals[type];

  return (
    <Modal show={isOpened} onHide={handleClose} centered>
      {Component && <Component onHide={handleClose} />}
    </Modal>
  );
};

export default ModalRoot;
