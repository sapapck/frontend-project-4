import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { login } from '../slices/authSlice';
import { useSignupMutation } from '../slices/api/chatApi';
import signupImg from '../img/signupForm.jpg';
import { getSignupSchema } from '../schemas/getValidationSchema';

const SignupForm = () => {
  const { t } = useTranslation();
  const [signup] = useSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleFormSubmit = async (values) => {
    setRegistrationFailed(false);
    try {
      const userData = await signup({
        username: values.username,
        password: values.password,
      }).unwrap();

      dispatch(login(userData));
      navigate('/');
    } catch (err) {
      if (err.status === 409) {
        setRegistrationFailed(true);
        inputRef.current?.select();
      } else {
        console.error(t('errors.network'), err);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: getSignupSchema(t),
    onSubmit: handleFormSubmit,
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={signupImg} className="rounded-circle" alt={t('signup.header')} />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('signup.header')}</h1>

                <FloatingLabel controlId="username" label={t('signup.username')} className="mb-3">
                  <Form.Control
                    ref={inputRef}
                    name="username"
                    placeholder={t('errors.minMax')}
                    autoComplete="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    isInvalid={
                      (formik.touched.username && !!formik.errors.username) || registrationFailed
                    }
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {registrationFailed ? t('signup.userExists') : formik.errors.username}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel controlId="password" label={t('signup.password')} className="mb-3">
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder={t('errors.min')}
                    autoComplete="new-password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    isInvalid={formik.touched.password && !!formik.errors.password}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel
                  controlId="confirmPassword"
                  label={t('signup.confirm')}
                  className="mb-4"
                >
                  <Form.Control
                    name="confirmPassword"
                    type="password"
                    placeholder={t('errors.mustMatch')}
                    autoComplete="new-password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <Button type="submit" variant="outline-primary" className="w-100">
                  {t('signup.submit')}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
