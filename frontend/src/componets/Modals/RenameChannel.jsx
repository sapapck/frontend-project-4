import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { Modal, Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useRenameChannelMutation, useGetChanelsQuery } from '../../slices/api/chatApi'
import { channelSchema } from '../../schemas/getValidationSchema'

const RenameChannelModal = ({ onHide }) => {
  const { t } = useTranslation()
  const inputRef = useRef(null)
  const { extraData } = useSelector((state) => state.ui.modal)
  const { data: channels = [] } = useGetChanelsQuery()
  const [renameChannel, { isLoading }] = useRenameChannelMutation()

  const existingNames = channels.map((c) => c.name)

  useEffect(() => {
    inputRef.current?.select()
  }, [])

  const handleFormSubmit = async ({ name }) => {
    try {
      await renameChannel({ id: extraData.id, name }).unwrap()
      toast.success(t('channels.renamed'))
      onHide()
    } catch (err) {
      if (!err.status || err.status === 'FETCH_ERROR') {
        toast.error(t('errors.network'))
      } else {
        toast.error(t('errors.unknown'))
      }
    }
  }

  const formik = useFormik({
    initialValues: { name: extraData.name },
    validationSchema: channelSchema(existingNames, t),
    onSubmit: handleFormSubmit
  })

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="name" className="visually-hidden">
              {t('modals.name')}
            </Form.Label>
            <Form.Control
              ref={inputRef}
              name="name"
              id="name"
              className="mb-2"
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.touched.name && !!formik.errors.name}
              disabled={isLoading}
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
  )
}

export default RenameChannelModal
