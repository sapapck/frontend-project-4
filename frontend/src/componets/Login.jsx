/* eslint-disable */
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { login } from '../slices/authSlice';
import formJpg from '../img/form.jpg';
import { useLoginMutation } from '../slices/api/chatApi';
import { loginSchema } from '../schemas/getValidationSchema';

const LoginForm = () => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authFailed, setAuthFailed] = useState(false);
  const [loginUser, { isLoading }] = useLoginMutation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleFormSubmit = async (values) => {
    setAuthFailed(false);
    try {
      const userData = await loginUser(values).unwrap();
      dispatch(login(userData));
      const from = location.state?.from?.pathname || '/';
      navigate(from);
    } catch (err) {
      if (err.status === 401) {
        setAuthFailed(true);
        inputRef.current.select();
      } else {
        console.error(t('errors.network'), err);
      }
    }
  };

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={formJpg} className="rounded-circle" alt={t('login.submit')} />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('login.submit')}</h1>

                <FloatingLabel controlId="username" label={t('login.username')} className="mb-3">
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    placeholder={t('login.username')}
                    ref={inputRef}
                    isInvalid={authFailed}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    required
                  />
                </FloatingLabel>

                <FloatingLabel controlId="password" label={t('login.password')} className="mb-4">
                  <Form.Control
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder={t('login.password')}
                    isInvalid={authFailed}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    required
                  />
                  <Form.Control.Feedback type="invalid" tooltip={false}>
                    {t('login.authFailed')}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <Button
                  type="submit"
                  disabled={isLoading}
                  variant="outline-primary"
                  className="w-100 mb-3"
                >
                  {t('login.submit')}
                </Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('login.noAccount')} </span>
                <Link to="/signup"> {t('login.signup')} </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
