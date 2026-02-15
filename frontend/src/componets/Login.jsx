
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import { useFormik } from 'formik';
import { login } from './slices/authSlice'
import formJpg from '../img/form.jpg'
import { Header } from './Head'
import { useLoginMutation } from './slices/api/chatApi'
const LoginForm = () => {
  
  
  const inputRef = useRef()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [authFailed, setAuthFailed] = useState(false)
  const [loginUser, {isLoading}] = useLoginMutation()
  
  useEffect(() => {
    inputRef.current.focus()
  }, [])


    const formik = useFormik({
    initialValues: { username: '', password: '' },

    onSubmit: async (values) => {
      setAuthFailed(false)
      try {
        const userData = await loginUser(values).unwrap();

        localStorage.setItem('userId', JSON.stringify(userData));
        dispatch(login(userData));
        
        const from = location.state?.from?.pathname || '/';
        navigate(from);

      } catch (err) {
        if (err.status === 401) {
          setAuthFailed(true);
        } else {
          console.error('Ошибка сети:', err);
        }
      }
    },
  })
    
    return (
      <Header>
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
       <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
         <div className="card-body row p-5">
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
            <img src={formJpg} className="rounded-circle" alt="Войти"/>
         </div>
       <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <fieldset>
        <h1 className="text-center mb-4">Войти</h1>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            name="username"
            autoComplete="username"
            required
            placeholder="Ваш ник"
            id="username"
            ref={inputRef}
            isInvalid={authFailed}
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <Form.Label htmlFor="username">Ваш ник</Form.Label>
        </Form.Group>
        <Form.Group className="form-floating mb-4">
          <Form.Control
            name="password"
            autoComplete="current-password"
            required
            placeholder="Пароль"
            type="password"
            id="password"
            isInvalid={authFailed}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <Form.Label htmlFor="password">Пароль</Form.Label>
          <Form.Control.Feedback type="invalid">Ошибка</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" disabled={isLoading} variant="outline-primary" className="w-100 mb-3"> Войти </Button>
      </fieldset>
    </Form>
         </div>
          <div className="card-footer p-4"><div className="text-center">
           <span>Нет аккаунта?</span> 
           <a href="/signup">Регистрация</a></div>
           </div>

          </div>
            </div>
              </div>
                </div>
                </Header>
    );
  };

  export default LoginForm