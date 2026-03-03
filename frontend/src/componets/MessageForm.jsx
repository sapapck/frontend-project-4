import { useFormik } from 'formik';
import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';
import { useAddMessageMutation } from '../slices/api/chatApi';

const MessageForm = ({ userName }) => {
  const [addMessage, { isLoading }] = useAddMessageMutation();
  const inputRef = useRef(null);

  const currentChannelId = useSelector((state) => state.ui.currentChannelId);

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async (values) => {
      const trimmedMessage = values.body.trim();
      if (!trimmedMessage) return;
      const cleanBody = filter.clean(trimmedMessage);
      try {
        await addMessage({
          body: cleanBody,
          channelId: currentChannelId,
          username: userName,
        }).unwrap();
        formik.resetForm();
        inputRef.current.focus();
      } catch (err) {
        console.error('Ошибка отправки:', err);
      }
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
        <div className="input-group has-validation">
          <input
            ref={inputRef}
            name="body"
            id="body"
            onChange={formik.handleChange}
            value={formik.values.body}
            placeholder="Введите сообщение..."
            className="border-0 p-0 ps-2 form-control"
          />
          <button
            type="submit"
            disabled={isLoading || !formik.values.body.trim()}
            className="btn btn-group-vertical"
          >
            <svg
              xmlns="http://www.w3.org"
              viewBox="0 0 16 16"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
