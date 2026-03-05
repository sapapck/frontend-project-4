/* eslint-disable */
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useRemoveChannelMutation } from '../../slices/api/chatApi';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const RemoveChannelModal = ({ onHide }) => {
  const { extraData } = useSelector((state) => state.ui.modal);
  const [removeChannel, { isLoading }] = useRemoveChannelMutation();
  const { t } = useTranslation();

  const handleRemove = async () => {
    try {
      await removeChannel(extraData.id).unwrap();
      toast.success(t('channels.removed'));
      onHide();
    } catch (err) {
      if (!err.status || err.status === 'FETCH_ERROR') {
        toast.error(t('errors.network'));
      } else {
        toast.error(t('errors.unknown'));
      }
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.confirm')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={onHide} disabled={isLoading}>
            {t('modals.cancel')}
          </Button>
          <Button variant="danger" onClick={handleRemove} disabled={isLoading}>
            {t('modals.delete')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default RemoveChannelModal;
