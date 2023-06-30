import React, { useContext, useState } from 'react';
import './Login.css';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../context/ContextAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const [error, setError] = useState("");

    // using context value
    const { signIn, signInGoogle } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                console.log(result.user)
                form.reset();
                navigate(from, { replace: true });
            })
            .catch(error => setError(error))

    }

    const handleGoogleLogin = () => {
        signInGoogle()
            .then(result => navigate(from, { replace: true }))
            .catch(error => setError(error))
    }




    return (
        <div className='form-container'>
            <form className='form-control form-styles p-4' onSubmit={handleLogin}>
                <h2 className="fw-bolder text-primary text-center mb-4">Login Now</h2>

                <div className="my-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                </div>
                <div className="my-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="exampleFormControlInput2" placeholder="type your password" />
                </div>

                {error && (
                    <div>
                        <p className="fw-bold text-danger ps-2 m-0">
                            {error.code}
                        </p>
                    </div>
                )}

                <button type='submit' className='btn btn-primary w-100 mt-3 fw-bold rounded-4 shadow'>
                    Sign In
                </button>

                <div className='m-0 d-flex justify-content-between align-items-center mx-2'>
                    <span>New User? <Link to="/register">Sign Up</Link></span>
                    <span><Link to="/login">Forgot Password?</Link></span>
                </div>

                <hr className='divider' />

                <div className='mt-4 d-flex justify-content-center align-items-center'>
                    <div className='border rounded-3 d-inline-block p-3 extra-login-icon me-4' onClick={handleGoogleLogin}>
                        <FaGoogle size="1.5em"></FaGoogle>
                    </div>

                    <div className='border rounded-3 d-inline-block p-3 extra-login-icon me-4'>
                        <FaGithub size="1.5em"></FaGithub>
                    </div>
                </div>

                <div>
                    <Link to="/" className='d-block mt-2 ms-1 fs-6'>Go Back to Home</Link>
                </div>

            </form>
        </div>
    );
};

export default Login;