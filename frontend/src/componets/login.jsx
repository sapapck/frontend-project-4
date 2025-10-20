import {useFormik} from 'formik';
import formJpg from '../img/form.jpg';

const SignupForm = () => {
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
      initialValues: {
        username: '',
      password: '',
      },
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
      },
    });
    return (
      
    <div class="container-fluid h-100">
        <div class="row justify-content-center align-content-center h-100">
            <div class="col-12 col-md-8 col-xxl-6">
                <div class="card shadow-sm">
                <div class="card-body row p-5">
                  <div class="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img src={formJpg} class="rounded-circle" alt="Войти"/>
                  </div>
                <form class="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
                    <h1 class = "text-center bm 4">Войти</h1>

                    <div class="form-floating mb-4">
                      <input name="username" autocomplete="username" required="" placeholder="Ваш ник" id="username" class="form-control" 
                      onChange={formik.handleChange} value={formik.values.username}/>
                      <label for="username">Ваш ник</label>
                    
                      </div>
                      <div class="form-floating mb-4">
                        <imput name="password" autocomplete="current-password" required placeholder="Пароль" type="password" id="password" class="form-control"
                        onChange={formik.handleChange} value={formik.values.username}/>

                      </div>
                          <button type="submit">Submit</button>
                         </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    );
  };

  export default SignupForm