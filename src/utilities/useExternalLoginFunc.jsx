import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/ContextAuth';
import { useLocation, useNavigate } from 'react-router-dom';

const useExternalLoginFunc = () => {
    const [externalError, setExternalError] = useState("");
    const { signInGoogle, signInGithub } = useContext(AuthContext);

    // react router redirect
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";


    const handleGoogleLogin = () => {
        setExternalError("");

        signInGoogle()
            .then(result => navigate(from, { replace: true }))
            .catch(error => {
                setExternalError(error)
            })
    }

    const handleGithubLogin = () => {
        setExternalError("");

        signInGithub()
            .then(result => navigate(from, { replace: true }))
            .catch(error => {
                setExternalError(error)
            })
    }


    return { handleGoogleLogin, handleGithubLogin, externalError }

};

export default useExternalLoginFunc;