import React, { useContext, useState } from 'react';
import './Register.css';
import { AuthContext } from '../../context/ContextAuth';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useExternalLoginFunc from '../../utilities/useExternalLoginFunc';

const Register = () => {
    const [error, setError] = useState("");

    // using context value
    const { signUp } = useContext(AuthContext);

    const { handleGoogleLogin, handleGithubLogin, externalError } = useExternalLoginFunc();


    const handleRegister = (e) => {
        e.preventDefault();
        setError("");

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signUp(email, password)
            .then(result => {
                form.reset();
            })
            .catch(error => setError(error))
    }

    // setting external error in the error state
    if (!error && externalError) {
        setError(externalError);
    }


    return (
        <div className='form-container'>
            <form className='form-control form-styles register p-4' onSubmit={handleRegister}>
                <h2 className="fw-bolder text-warning text-center mb-4">Register</h2>

                <div className="my-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required />
                </div>
                <div className="my-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="exampleFormControlInput2" placeholder="type your password" required />
                </div>

                {error && (
                    <div>
                        <p className="fw-bold text-danger ps-2 m-0">
                            {error.code}
                        </p>
                    </div>
                )}

                <button type='submit' className='btn btn-warning w-100 mt-3 fw-bold rounded-4 shadow'>
                    Sign Up
                </button>

                <div className='m-0 d-flex justify-content-between align-items-center mx-2'>
                    <span>New User? <Link to="/login">Sign In</Link></span>
                </div>

                <hr className='divider' />

                <div className='mt-4 d-flex justify-content-center align-items-center'>
                    <div className='border rounded-3 d-inline-block p-3 extra-login-icon me-4' onClick={handleGoogleLogin}>
                        <FaGoogle size="1.5em"></FaGoogle>
                    </div>

                    <div className='border rounded-3 d-inline-block p-3 extra-login-icon me-4' onClick={handleGithubLogin}>
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

export default Register;