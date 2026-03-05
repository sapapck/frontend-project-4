import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { useAddChannelMutation, useGetChanelsQuery } from '../../slices/api/chatApi';
import { channelSchema } from '../../schemas/getValidationSchema';
import { setCurrentChannelId } from '../../slices/uiSlice';

const AddChannelModal = ({ onHide }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data: channels = [] } = useGetChanelsQuery();
  const [addChannel, { isLoading }] = useAddChannelMutation();

  const existingNames = channels.map(c => c.name);

  const handleFormSubmit = async ({ name }) => {
    try {
      const cleanName = filter.clean(name);
      const response = await addChannel({ name: cleanName }).unwrap();
      dispatch(setCurrentChannelId(response.id));
      toast.success(t('channels.created'));
      onHide();
    } catch (err) {
      if (!err.status || err.status === 'FETCH_ERROR') {
        toast.error(t('errors.network')); //ошибка сети(сервер выключен)
      } else {
        toast.error(t('errors.unknown'));
      }
    }
  };

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: channelSchema(existingNames, t),
    onSubmit: handleFormSubmit,
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="name" className="visually-hidden">
              {t('modals.name')}
            </Form.Label>
            <Form.Control
              name="name"
              id="name"
              required
              className="mb-2"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.touched.name && !!formik.errors.name}
              disabled={isLoading}
              autoFocus
            />
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={onHide}>
                {t('modals.cancel')}
              </Button>
              <Button variant="primary" type="submit" disabled={isLoading}>
                {t('modals.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default AddChannelModal;
